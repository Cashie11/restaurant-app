from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api import deps
from app.crud import admin as crud_admin
from app.schemas.user import UserResponse, UserUpdate
from app.schemas.order import OrderResponse, OrderStatusUpdate
from app.models.user import User
from app.models.order import OrderStatus

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get dashboard statistics (admin only)"""
    stats = crud_admin.get_dashboard_stats(db)
    return stats


@router.get("/users", response_model=dict)
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
    
    return {
        "users": users,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/users/recent", response_model=List[UserResponse])
async def get_recent_users(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Get recently registered users (admin only)"""
    users = crud_admin.get_recent_users(db, limit=limit)
    return users


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
    
    success = crud_admin.delete_user_by_admin(db, user_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return {"message": "User deleted successfully"}


@router.get("/orders", response_model=dict)
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
    
    return {
        "orders": orders,
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


@router.put("/orders/{order_id}/status", response_model=OrderResponse)
async def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Update order status (admin only)"""
    order = crud_admin.update_order_status(db, order_id, status_update.status)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return order
