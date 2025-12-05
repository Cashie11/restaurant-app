from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.user import UserResponse, UserUpdate, AddressCreate, AddressResponse
from app.schemas.order import OrderResponse
from app.crud import user as crud_user
from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_profile(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user profile"""
    return current_user


@router.put("/me", response_model=UserResponse)
async def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update user profile"""
    updated_user = crud_user.update_user(db, current_user.id, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user


@router.get("/addresses", response_model=List[AddressResponse])
async def get_addresses(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all user addresses"""
    return crud_user.get_user_addresses(db, current_user.id)


@router.post("/addresses", response_model=AddressResponse, status_code=status.HTTP_201_CREATED)
async def create_address(
    address: AddressCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new address"""
    return crud_user.create_address(db, current_user.id, address)


@router.delete("/addresses/{address_id}")
async def delete_address(
    address_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete an address"""
    success = crud_user.delete_address(db, address_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address not found"
        )
    return {"message": "Address deleted successfully"}
