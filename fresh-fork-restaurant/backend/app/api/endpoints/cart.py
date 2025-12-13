from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.crud import cart as crud_cart
from app.schemas.cart import CartItemCreate, CartItemUpdate, CartResponse, CartItemResponse
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=CartResponse)
async def get_cart(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Get current user's cart"""
    cart = crud_cart.get_or_create_cart(db, current_user.id)
    totals = crud_cart.get_cart_total(db, current_user.id)
    
    
    
    return {
        **cart.__dict__,
        "total_items": totals["total_items"],
        "subtotal": totals["subtotal"]
    }


@router.post("/items", response_model=CartItemResponse)
async def add_to_cart(
    item: CartItemCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Add item to cart"""
    try:
        cart_item = crud_cart.add_item_to_cart(
            db,
            current_user.id,
            item.product_id,
            item.quantity
        )
        
        
        
        return cart_item
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.put("/items/{item_id}", response_model=CartItemResponse)
async def update_cart_item(
    item_id: int,
    item_update: CartItemUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Update cart item quantity"""
    cart_item = crud_cart.update_cart_item(
        db,
        current_user.id,
        item_id,
        item_update.quantity
    )
    
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )
    
    
    
    return cart_item


@router.delete("/items/{item_id}")
async def remove_from_cart(
    item_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Remove item from cart"""
    success = crud_cart.remove_cart_item(db, current_user.id, item_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )
    
    return {"message": "Item removed from cart"}


@router.delete("/")
async def clear_cart(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
):
    """Clear all items from cart"""
    crud_cart.clear_cart(db, current_user.id)
    return {"message": "Cart cleared"}
