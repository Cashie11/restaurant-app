from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any
from app.core.database import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.cart import Cart
from app.models.order import Order, OrderItem, OrderStatus, PaymentStatus
from app.schemas.order import OrderCreateFromCart, OrderItemResponse
from app.utils.email import email_service
import json
import httpx
import logging
from app.core.config import settings
from app.models.order import PaymentMethod

router = APIRouter()

async def verify_paystack_payment(reference: str) -> bool:
    """Verify payment with Paystack API"""
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if data.get("status") is True and data.get("data", {}).get("status") == "success":
                    return True
            logging.getLogger(__name__).warning(
                "Paystack verification failed: HTTP %s", response.status_code
            )
            return False
        except Exception as e:
            logging.getLogger(__name__).error("Paystack verification error: %s", e)
            return False

def calculate_delivery_fee(address_data: dict, subtotal: float) -> float:
    """
    Calculate delivery fee based on rules:
    - Free for orders >= 50,000 (can be adjusted)
    - Lagos: 1,500
    - Others: 3,500
    """
    # Free delivery threshold
    FREE_DELIVERY_THRESHOLD = 50000
    
    if subtotal >= FREE_DELIVERY_THRESHOLD:
        return 0.0
        
    state = address_data.get("state", "").lower()
    
    # Check for Lagos
    if "lagos" in state:
        return 1500.0
        
    # Default for other states
    return 3500.0


@router.post("/place-order", status_code=status.HTTP_201_CREATED)
async def place_order(
    order_in: OrderCreateFromCart,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Place an order from the current user's cart
    """
    # 1. Get user's cart
    cart = db.query(Cart).filter(Cart.user_id == current_user.id).first()
    if not cart or not cart.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )
    
    # 2. Calculate subtotal
    subtotal = sum(item.price_at_addition * item.quantity for item in cart.items)
    
    # 3. Calculate Delivery Fee
    delivery_address_dict = order_in.delivery_address.model_dump()
    delivery_fee = calculate_delivery_fee(delivery_address_dict, subtotal)
    
    # 4. Total Amount
    total_amount = subtotal + delivery_fee
    
    # 2.5 Verify Payment if Card
    payment_status = PaymentStatus.PENDING
    if order_in.payment_method == PaymentMethod.CARD:
        if not order_in.payment_reference:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment reference required for card payments"
            )
        
        is_valid = await verify_paystack_payment(order_in.payment_reference)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment verification failed"
            )
        payment_status = PaymentStatus.PAID
    elif order_in.payment_method == PaymentMethod.CASH:
        payment_status = PaymentStatus.PENDING
    elif order_in.payment_method == PaymentMethod.BANK_TRANSFER:
        payment_status = PaymentStatus.PENDING

    # 3. Create Order
    # SQLAlchemy requires dict for JSON columns sometimes, but Pydantic model dump works too
    
    order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        delivery_fee=delivery_fee,
        status=OrderStatus.PENDING,
        payment_method=order_in.payment_method,
        payment_status=payment_status,
        delivery_address=delivery_address_dict, # Assigning dict to JSON column
        notes=order_in.notes
    )
    db.add(order)
    db.flush() # Flush to get order ID
    
    # 4. Create Order Items
    order_items_data = []
    for cart_item in cart.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=str(cart_item.product_id),
            product_name=cart_item.product.name,
            product_image=cart_item.product.image_url,
            price=cart_item.price_at_addition,
            quantity=cart_item.quantity
        )
        db.add(order_item)
        
        # Decrement product stock quantity
        product = cart_item.product
        if product.stock_quantity >= cart_item.quantity:
            product.stock_quantity -= cart_item.quantity
        else:
            # Optional: Handle insufficient stock (though this should be validated earlier)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for {product.name}"
            )
        
        # Prepare data for email
        order_items_data.append({
            "name": cart_item.product.name,
            "quantity": cart_item.quantity,
            "price": cart_item.price_at_addition
        })
    
    # 5. Clear cart items (keep the cart itself for future use)
    from app.models.cart import CartItem
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()

    db.commit()
    db.refresh(order)
    
    # 6. Send Email (best-effort — a failure here must not fail the order)
    email_data = {
        "id": order.id,
        "customer_name": f"{current_user.first_name} {current_user.last_name}",
        "total": total_amount,
        "subtotal": subtotal,
        "delivery_fee": delivery_fee,
        "status": "Confirmed",
        "items": order_items_data
    }

    try:
        email_service.send_order_confirmation(current_user.email, email_data)
    except Exception:
        # Never let an email failure roll back a successfully placed order.
        pass

    return {"message": "Order placed successfully", "order_id": order.id}
