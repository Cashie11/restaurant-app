from sqlalchemy import Column, Integer, String, Float, Boolean, Text, Enum as SQLEnum, DateTime
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class ProductCategory(str, enum.Enum):
    APPETIZERS = "appetizers"
    MAIN = "main"
    PASTA = "pasta"
    SEAFOOD = "seafood"
    DESSERTS = "desserts"
    BEVERAGES = "beverages"
    # Keeping others for compatibility if needed elsewhere
    POPULAR = "popular"
    VEGETABLES = "vegetables"
    FRUITS = "fruits"
    DAIRY = "dairy"
    BAKERY = "bakery"
    MEAT = "meat"
    GROCERY = "grocery"
    SAUCES = "sauces"
    OILS = "oils"
    SNACKS = "snacks"


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(50), unique=True, nullable=False, index=True)  # Unique product code
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=True)
    category = Column(SQLEnum(ProductCategory), nullable=False, index=True)
    
    # Homepage sections
    is_popular = Column(Boolean, default=False, index=True)
    is_special = Column(Boolean, default=False, index=True)
    is_offer = Column(Boolean, default=False, index=True)
    
    # Offer details
    discount_percentage = Column(Float, default=0.0)
    
    # Inventory
    stock_quantity = Column(Integer, default=0)
    is_active = Column(Boolean, default=True, index=True)
    
    # E-commerce fields
    rating = Column(Float, default=0.0)  # Average rating
    review_count = Column(Integer, default=0)  # Number of reviews
    weight = Column(Float, nullable=True)  # Weight in kg for shipping
    tags = Column(String(500), nullable=True)  # Comma-separated tags for search
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Product {self.name}>"
