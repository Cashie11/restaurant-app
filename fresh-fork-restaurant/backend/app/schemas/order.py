from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.models.order import OrderStatus, PaymentMethod, PaymentStatus


# Order Item Schemas
class OrderItemBase(BaseModel):
    product_id: str
    product_name: str
    product_image: Optional[str] = None
    price: float
    quantity: int


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemResponse(OrderItemBase):
    id: int
    
    class Config:
        from_attributes = True


# Order Schemas
class DeliveryAddress(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    payment_method: PaymentMethod
    delivery_address: DeliveryAddress
    notes: Optional[str] = None


class OrderCreateFromCart(BaseModel):
    payment_method: PaymentMethod
    delivery_address: DeliveryAddress
    notes: Optional[str] = None


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: OrderStatus
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    delivery_address: dict
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []
    
    class Config:
        from_attributes = True
