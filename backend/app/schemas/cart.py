from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from app.schemas.product import ProductResponse


class CartItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)

class CartItemResponse(BaseModel):
    id: int
    cart_id: int
    product_id: int
    quantity: int
    price_at_addition: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    # Include product details
    product: Optional[ProductResponse] = None
    
    class Config:
        from_attributes = True


class CartResponse(BaseModel):
    id: int
    user_id: int
    items: List[CartItemResponse] = []
    total_items: int = 0
    subtotal: float = 0.0
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
