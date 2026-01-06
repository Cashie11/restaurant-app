from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.product import ProductCategory


class ProductBase(BaseModel):
    sku: str = Field(..., min_length=1, max_length=50)
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    image_url: Optional[str] = None
    category: ProductCategory
    is_popular: bool = False
    is_special: bool = False
    is_offer: bool = False
    discount_percentage: float = Field(default=0.0, ge=0, le=100)
    stock_quantity: int = Field(default=0, ge=0)
    is_active: bool = True
    rating: float = Field(default=0.0, ge=0, le=5)
    review_count: int = Field(default=0, ge=0)
    weight: Optional[float] = Field(None, gt=0)
    tags: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    sku: Optional[str] = Field(None, min_length=1, max_length=50)
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    image_url: Optional[str] = None
    category: Optional[ProductCategory] = None
    is_popular: Optional[bool] = None
    is_special: Optional[bool] = None
    is_offer: Optional[bool] = None
    discount_percentage: Optional[float] = Field(None, ge=0, le=100)
    stock_quantity: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    review_count: Optional[int] = Field(None, ge=0)
    weight: Optional[float] = Field(None, gt=0)
    tags: Optional[str] = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
