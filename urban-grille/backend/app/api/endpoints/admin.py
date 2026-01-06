from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api import deps
from app.crud import admin as crud_admin
from app.schemas.user import UserResponse, UserUpdate
from app.schemas.order import OrderResponse, OrderStatusUpdate, OrderListResponse
from app.models.user import User
from app.models.order import OrderStatus, Order, PaymentStatus

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get dashboard statistics (admin only)"""
    stats = crud_admin.get_dashboard_stats(db)
    return stats


@router.get("/users")
async def get_all_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    search: Optional[str] = None,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get all users with pagination (admin only)"""
    users = crud_admin.get_all_users(db, skip=skip, limit=limit, search=search)
    total = crud_admin.get_user_count(db, search=search)
    
    # Manual serialization for users
    serialized_users = []
    for user in users:
        serialized_users.append({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "role": user.role,
            "is_active": user.is_active,
            "is_email_verified": user.is_email_verified,
            "created_at": user.created_at
        })

    return {
        "users": serialized_users,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/users/recent")
async def get_recent_users(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get recently registered users (admin only)"""
    # Manual serialization
    serialized_users = []
    for user in users:
        serialized_users.append({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "role": user.role,
            "is_active": user.is_active,
            "is_email_verified": user.is_email_verified,
            "created_at": user.created_at
        })
    return serialized_users


@router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Update user details (admin only)"""
    # Prevent admin from demoting themselves
    if user_id == current_user.id and user_update.role and user_update.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot change your own admin role"
        )
    
    user = crud_admin.update_user_by_admin(
        db,
        user_id,
        **user_update.dict(exclude_unset=True)
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Delete user (admin only)"""
    # Prevent admin from deleting themselves
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    try:
        success = crud_admin.delete_user_by_admin(db, user_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {"message": "User deleted successfully"}
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete user: {str(e)}"
        )


@router.get("/orders")
async def get_all_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[OrderStatus] = None,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get all orders with pagination (admin only)"""
    orders = crud_admin.get_all_orders(db, skip=skip, limit=limit, status=status)
    total = crud_admin.get_order_count(db, status=status)
    
    # Manual serialization to ensure no Pydantic errors
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
            "items": items,
            "user": {
                "id": order.user.id,
                "first_name": order.user.first_name,
                "last_name": order.user.last_name,
                "email": order.user.email,
                "phone": order.user.phone
            } if order.user else None
        })
    
    return {
        "orders": serialized_orders,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/orders/recent", response_model=List[OrderResponse])
async def get_recent_orders(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get recent orders (admin only)"""
    orders = crud_admin.get_recent_orders(db, limit=limit)
    return orders


@router.get("/orders/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get order details (admin only)"""
    order = crud_admin.get_order(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return order


@router.put("/orders/{order_id}/status", response_model=OrderResponse)
async def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Update order status (admin only)"""
    order = crud_admin.update_order_status(
        db, 
        order_id, 
        status_update.status,
        status_update.cancellation_reason
    )
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return order


@router.post("/orders/{order_id}/confirm-payment", response_model=OrderResponse)
async def confirm_payment(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """
    Confirm payment for an order (manual bank transfer)
    """
    order = crud_admin.get_order(db, order_id) # Relying on crud exists or will error if not
    if not order:
        # Fallback query if crud not updated
        order = db.query(Order).filter(Order.id == order_id).first()

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    order.payment_status = PaymentStatus.PAID
    order.status = OrderStatus.CONFIRMED 
    db.commit()
    db.refresh(order)
    
    return order
