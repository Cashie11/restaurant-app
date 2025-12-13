from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.product import Product, ProductCategory
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product: ProductCreate) -> Product:
    """Create a new product"""
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: int) -> Optional[Product]:
    """Get product by ID"""
    return db.query(Product).filter(Product.id == product_id).first()


def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: Optional[ProductCategory] = None,
    is_active: bool = True
) -> List[Product]:
    """Get all products with optional filtering"""
    query = db.query(Product)
    
    if is_active is not None:
        query = query.filter(Product.is_active == is_active)
    
    if category:
        query = query.filter(Product.category == category)
    
    return query.offset(skip).limit(limit).all()


def get_popular_products(db: Session, limit: int = 10) -> List[Product]:
    """Get products marked as popular"""
    return db.query(Product).filter(
        Product.is_popular == True,
        Product.is_active == True
    ).limit(limit).all()


def get_special_products(db: Session, limit: int = 10) -> List[Product]:
    """Get products marked as special"""
    return db.query(Product).filter(
        Product.is_special == True,
        Product.is_active == True
    ).limit(limit).all()


def get_offer_products(db: Session, limit: int = 10) -> List[Product]:
    """Get products marked as offers"""
    return db.query(Product).filter(
        Product.is_offer == True,
        Product.is_active == True
    ).limit(limit).all()


def update_product(
    db: Session,
    product_id: int,
    product_update: ProductUpdate
) -> Optional[Product]:
    """Update a product"""
    db_product = get_product(db, product_id)
    if not db_product:
        return None
    
    update_data = product_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int) -> bool:
    """Delete a product"""
    db_product = get_product(db, product_id)
    if not db_product:
        return False
    
    db.delete(db_product)
    db.commit()
    return True


def get_product_count(
    db: Session,
    category: Optional[ProductCategory] = None
) -> int:
    """Get total product count"""
    query = db.query(Product).filter(Product.is_active == True)
    
    if category:
        query = query.filter(Product.category == category)
    
    return query.count()
