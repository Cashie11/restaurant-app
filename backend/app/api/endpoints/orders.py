from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api import deps
from app.models.user import User
from app.models.order import Order, OrderStatus, PaymentStatus
from app.schemas.order import OrderResponse

router = APIRouter()

@router.get("/")
async def get_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Get all orders for current user
    """
    orders = db.query(Order).filter(
        Order.user_id == current_user.id,
        Order.is_user_deleted == False
    ).order_by(Order.created_at.desc()).all()
    serialized_orders = []
    for order in orders:
        items = []
        for item in order.items:
            items.append({
                "id": item.id,
                "product_id": item.product_id,
                "product_name": item.product_name,
                "product_image": item.product_image,
                "price": item.price,
                "quantity": item.quantity
            })
            
        serialized_orders.append({
            "id": order.id,
            "user_id": order.user_id,
            "total_amount": order.total_amount,
            "status": order.status,
            "payment_method": order.payment_method,
            "payment_status": order.payment_status,
            "delivery_address": order.delivery_address,
            "notes": order.notes,
            "cancellation_reason": order.cancellation_reason,
            "created_at": order.created_at,
            "updated_at": order.updated_at,
            "items": items
        })
    return serialized_orders

@router.get("/{order_id}")
async def get_my_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Get specific order details
    """
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    items = []
    for item in order.items:
        items.append({
            "id": item.id,
            "product_id": item.product_id,
            "product_name": item.product_name,
            "product_image": item.product_image,
            "price": item.price,
            "quantity": item.quantity
        })
        
    return {
        "id": order.id,
        "user_id": order.user_id,
        "total_amount": order.total_amount,
        "status": order.status,
        "payment_method": order.payment_method,
        "payment_status": order.payment_status,
        "delivery_address": order.delivery_address,
        "notes": order.notes,
        "cancellation_reason": order.cancellation_reason,
        "created_at": order.created_at,
        "updated_at": order.updated_at,
        "items": items
    }

@router.post("/{order_id}/mark-paid")
async def mark_order_as_paid(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Mark an order as paid (User action for Bank Transfer)
    """
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.payment_status != PaymentStatus.PENDING:
        raise HTTPException(status_code=400, detail="Order payment status cannot be updated")
        
    order.payment_status = PaymentStatus.AWAITING_VERIFICATION
    db.commit()
    db.refresh(order)
    return {"message": "Order marked as paid. Awaiting verification.", "status": order.payment_status}

@router.delete("/clear-history")
async def clear_order_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Clear order history for current user (Soft Delete)
    """
    db.query(Order).filter(
        Order.user_id == current_user.id
    ).update({Order.is_user_deleted: True}, synchronize_session=False)
    
    db.commit()
    return {"message": "Order history cleared"}
