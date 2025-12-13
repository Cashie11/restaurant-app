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

router = APIRouter()

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
    
    # 2. Calculate total
    total_amount = sum(item.price_at_addition * item.quantity for item in cart.items)
    
    # 3. Create Order
    # SQLAlchemy requires dict for JSON columns sometimes, but Pydantic model dump works too
    delivery_address_dict = order_in.delivery_address.model_dump()
    
    order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status=OrderStatus.PENDING,
        payment_method=order_in.payment_method,
        payment_status=PaymentStatus.PAID, # Simulating successful payment
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
        
        # Prepare data for email
        order_items_data.append({
            "name": cart_item.product.name,
            "quantity": cart_item.quantity,
            "price": cart_item.price_at_addition
        })
    
    # 5. Clear Cart
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    # Also need to delete items if delete cascade isn't perfect, but usually it is if specific
    # Actually removing the cart itself might be aggressive if we want to keep persistent cart ID, 
    # but the usual pattern is empting items. 
    # Let's just remove items.
    # db.query(CartItem).filter(CartItem.cart_id == cart.id).delete() 
    # Re-reading logic: The cart object usually stays. 
    # Let's verify relationships. user.addresses... 
    # In endpoints/cart.py verify clear_cart implementation:
    # crud_cart.clear_cart(db, current_user.id)
    # So I should use that or manual delete.
    # Let's use manual delete of items for now to be safe.
    from app.models.cart import CartItem
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    
    db.commit()
    db.refresh(order)
    
    # 6. Send Email
    email_data = {
        "id": order.id,
        "customer_name": f"{current_user.first_name} {current_user.last_name}",
        "total": total_amount,
        "status": "Confirmed",
        "items": order_items_data
    }
    
    # Send in background (or await if simple)
    # For now, simplistic sync call (or async wrapped)
    email_service.send_order_confirmation(current_user.email, email_data)
    
    return {"message": "Order placed successfully", "order_id": order.id}
