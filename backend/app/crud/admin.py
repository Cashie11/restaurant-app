from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional
from datetime import datetime, timedelta
from app.models.user import User
from app.models.order import Order, OrderStatus


def get_all_users(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None
) -> List[User]:
    """Get all verified users with optional search"""
    query = db.query(User).filter(User.is_email_verified == True)
    
    if search:
        query = query.filter(
            (User.email.ilike(f"%{search}%")) |
            (User.first_name.ilike(f"%{search}%")) |
            (User.last_name.ilike(f"%{search}%"))
        )
    
    return query.offset(skip).limit(limit).all()


def get_user_count(db: Session, search: Optional[str] = None) -> int:
    """Get total verified user count"""
    query = db.query(func.count(User.id)).filter(User.is_email_verified == True)
    
    if search:
        query = query.filter(
            (User.email.ilike(f"%{search}%")) |
            (User.first_name.ilike(f"%{search}%")) |
            (User.last_name.ilike(f"%{search}%"))
        )
    
    return query.scalar()


def update_user_by_admin(
    db: Session,
    user_id: int,
    **kwargs
) -> Optional[User]:
    """Update user details by admin"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    
    for key, value in kwargs.items():
        if hasattr(user, key) and value is not None:
            setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user


def delete_user_by_admin(db: Session, user_id: int) -> bool:
    """Delete user by admin"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return False
    
    try:
        # Check if user has orders that might prevent deletion
        from app.models.order import Order
        from app.models.cart import Cart, CartItem
        
        # Check for existing orders
        orders_count = db.query(Order).filter(Order.user_id == user_id).count()
        
        if orders_count > 0:
            raise ValueError(f"Cannot delete user with {orders_count} existing orders")
        
        # Delete cart items first
        cart = db.query(Cart).filter(Cart.user_id == user_id).first()
        if cart:
            # Delete cart items
            db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
            # Delete cart
            db.delete(cart)
        
        # Delete addresses (if they exist)
        if hasattr(user, 'addresses'):
            for address in user.addresses:
                db.delete(address)
        
        # Then delete the user
        db.delete(user)
        db.commit()
        return True
        
    except Exception as e:
        db.rollback()
        raise e


def get_all_orders(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    status: Optional[OrderStatus] = None
) -> List[Order]:
    """Get all orders with optional status filter"""
    query = db.query(Order).order_by(desc(Order.created_at))
    
    if status:
        query = query.filter(Order.status == status)
    
    return query.offset(skip).limit(limit).all()


def get_order_count(db: Session, status: Optional[OrderStatus] = None) -> int:
    """Get total order count"""
    query = db.query(func.count(Order.id))
    
    if status:
        query = query.filter(Order.status == status)
    
    return query.scalar()

def get_order(db: Session, order_id: int) -> Optional[Order]:
    """Get single order by ID"""
    return db.query(Order).filter(Order.id == order_id).first()

def update_order_status(
    db: Session,
    order_id: int,
    status: OrderStatus,
    cancellation_reason: Optional[str] = None
) -> Optional[Order]:
    """Update order status"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        return None
    
    order.status = status
    if cancellation_reason:
        order.cancellation_reason = cancellation_reason
        
    db.commit()
    db.refresh(order)
    return order


def get_dashboard_stats(db: Session) -> dict:
    """Get dashboard statistics"""
    # Total users (verified only)
    total_users = db.query(func.count(User.id)).filter(User.is_email_verified == True).scalar()
    
    # Total orders
    total_orders = db.query(func.count(Order.id)).scalar()
    
    # Orders by status
    pending_orders = db.query(func.count(Order.id)).filter(
        Order.status == OrderStatus.PENDING
    ).scalar()
    
    completed_orders = db.query(func.count(Order.id)).filter(
        Order.status == OrderStatus.DELIVERED
    ).scalar()
    
    # Total revenue (sum of all delivered orders)
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.status == OrderStatus.DELIVERED
    ).scalar() or 0
    
    # New users this week
    week_ago = datetime.utcnow() - timedelta(days=7)
    new_users_week = db.query(func.count(User.id)).filter(
        User.created_at >= week_ago
    ).scalar()
    
    # New orders this week
    new_orders_week = db.query(func.count(Order.id)).filter(
        Order.created_at >= week_ago
    ).scalar()
    
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "completed_orders": completed_orders,
        "total_revenue": float(total_revenue),
        "new_users_week": new_users_week,
        "new_orders_week": new_orders_week
    }


def get_recent_users(db: Session, limit: int = 5) -> List[User]:
    """Get recently registered verified users"""
    return db.query(User).filter(User.is_email_verified == True).order_by(desc(User.created_at)).limit(limit).all()


def get_recent_orders(db: Session, limit: int = 10) -> List[Order]:
    """Get recent orders"""
    return db.query(Order).order_by(desc(Order.created_at)).limit(limit).all()
