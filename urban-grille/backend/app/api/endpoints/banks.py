from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api import deps
from app.schemas.bank import BankAccountCreate, BankAccountUpdate, BankAccountResponse
from app.crud import bank as crud_bank
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[BankAccountResponse])
async def get_banks(
    db: Session = Depends(get_db)
):
    """
    Get all active bank accounts (Public)
    """
    return crud_bank.get_active_bank_accounts(db)

@router.get("/all", response_model=List[BankAccountResponse])
async def get_all_banks_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """
    Get all bank accounts including inactive ones (Admin only)
    """
    return crud_bank.get_all_bank_accounts(db)

@router.post("/", response_model=BankAccountResponse, status_code=status.HTTP_201_CREATED)
async def create_bank(
    bank_in: BankAccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """
    Create a new bank account (Admin only)
    """
    return crud_bank.create_bank_account(db, bank_in)

@router.put("/{bank_id}", response_model=BankAccountResponse)
async def update_bank(
    bank_id: int,
    bank_in: BankAccountUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """
    Update a bank account (Admin only)
    """
    bank = crud_bank.update_bank_account(db, bank_id, bank_in)
    if not bank:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bank account not found"
        )
    return bank

@router.delete("/{bank_id}")
async def delete_bank(
    bank_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_admin_user)
):
    """
    Delete a bank account (Admin only)
    """
    success = crud_bank.delete_bank_account(db, bank_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Bank account not found"
        )
    return {"message": "Bank account deleted successfully"}
