from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api import deps
from app.crud import product as crud_product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.models.product import ProductCategory
from app.models.user import User

router = APIRouter()


# Public endpoints
@router.get("/", response_model=List[ProductResponse])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    category: Optional[ProductCategory] = None,
    db: Session = Depends(deps.get_db)
):
    """Get all active products"""
    products = crud_product.get_products(db, skip=skip, limit=limit, category=category)
    return products


@router.get("/popular", response_model=List[ProductResponse])
async def get_popular_products(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(deps.get_db)
):
    """Get popular products for homepage"""
    products = crud_product.get_popular_products(db, limit=limit)
    return products


@router.get("/special", response_model=List[ProductResponse])
async def get_special_products(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(deps.get_db)
):
    """Get special products for homepage"""
    products = crud_product.get_special_products(db, limit=limit)
    return products


@router.get("/offers", response_model=List[ProductResponse])
async def get_offer_products(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(deps.get_db)
):
    """Get offer products for homepage"""
    products = crud_product.get_offer_products(db, limit=limit)
    return products


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: int,
    db: Session = Depends(deps.get_db)
):
    """Get product by ID"""
    product = crud_product.get_product(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product


# Admin endpoints
@router.post("/", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Create a new product (admin only)"""
    return crud_product.create_product(db, product)


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Update a product (admin only)"""
    product = crud_product.update_product(db, product_id, product_update)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product


@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """Delete a product (admin only)"""
    success = crud_product.delete_product(db, product_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return {"message": "Product deleted successfully"}
