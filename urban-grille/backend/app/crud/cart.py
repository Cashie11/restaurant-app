from sqlalchemy.orm import Session
from typing import Optional
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User


def get_or_create_cart(db: Session, user_id: int) -> Cart:
    """Get user's cart or create if doesn't exist"""
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart


def get_cart(db: Session, user_id: int) -> Optional[Cart]:
    """Get user's cart"""
    return db.query(Cart).filter(Cart.user_id == user_id).first()


def add_item_to_cart(
    db: Session,
    user_id: int,
    product_id: int,
    quantity: int
) -> CartItem:
    """Add item to cart or update quantity if already exists"""
    # Get or create cart
    cart = get_or_create_cart(db, user_id)
    
    # Get product
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    # Check stock availability
    if product.stock_quantity <= 0:
        raise ValueError("Product is out of stock")
    
    # Check if item already in cart
    cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == product_id
    ).first()
    
    if cart_item:
        # Check if new quantity exceeds stock
        new_quantity = cart_item.quantity + quantity
        if new_quantity > product.stock_quantity:
            raise ValueError(f"Only {product.stock_quantity} items available in stock")
        # Update quantity
        cart_item.quantity = new_quantity
    else:
        # Check if requested quantity exceeds stock
        if quantity > product.stock_quantity:
            raise ValueError(f"Only {product.stock_quantity} items available in stock")
        # Create new cart item
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=product_id,
            quantity=quantity,
            price_at_addition=product.price
        )
        db.add(cart_item)
    
    db.commit()
    db.refresh(cart_item)
    return cart_item


def update_cart_item(
    db: Session,
    user_id: int,
    cart_item_id: int,
    quantity: int
) -> Optional[CartItem]:
    """Update cart item quantity"""
    cart = get_cart(db, user_id)
    if not cart:
        return None
    
    cart_item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.cart_id == cart.id
    ).first()
    
    if not cart_item:
        return None
    
    # Get product for stock validation
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        return None
    
    # Check if new quantity exceeds stock
    if quantity > product.stock_quantity:
        raise ValueError(f"Only {product.stock_quantity} items available in stock")
    
    cart_item.quantity = quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item


def remove_cart_item(
    db: Session,
    user_id: int,
    cart_item_id: int
) -> bool:
    """Remove item from cart"""
    cart = get_cart(db, user_id)
    if not cart:
        return False
    
    cart_item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.cart_id == cart.id
    ).first()
    
    if not cart_item:
        return False
    
    db.delete(cart_item)
    db.commit()
    return True


def clear_cart(db: Session, user_id: int) -> bool:
    """Clear all items from cart"""
    cart = get_cart(db, user_id)
    if not cart:
        return False
    
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    db.commit()
    return True


def get_cart_total(db: Session, user_id: int) -> dict:
    """Calculate cart totals"""
    cart = get_cart(db, user_id)
    if not cart:
        return {"total_items": 0, "subtotal": 0.0}
    
    total_items = 0
    subtotal = 0.0
    
    for item in cart.items:
        total_items += item.quantity
        subtotal += item.price_at_addition * item.quantity
    
    return {
        "total_items": total_items,
        "subtotal": subtotal
    }
