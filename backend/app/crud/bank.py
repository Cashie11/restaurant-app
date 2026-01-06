from sqlalchemy.orm import Session
from app.models.bank import BankAccount
from app.schemas.bank import BankAccountCreate, BankAccountUpdate

def get_bank_account(db: Session, bank_id: int):
    return db.query(BankAccount).filter(BankAccount.id == bank_id).first()

def get_active_bank_accounts(db: Session):
    return db.query(BankAccount).filter(BankAccount.is_active == True).all()

def get_all_bank_accounts(db: Session):
    return db.query(BankAccount).all()

def create_bank_account(db: Session, bank_in: BankAccountCreate):
    db_bank = BankAccount(**bank_in.dict())
    db.add(db_bank)
    db.commit()
    db.refresh(db_bank)
    return db_bank

def update_bank_account(db: Session, bank_id: int, bank_in: BankAccountUpdate):
    db_bank = get_bank_account(db, bank_id)
    if not db_bank:
        return None
    
    update_data = bank_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_bank, field, value)
    
    db.add(db_bank)
    db.commit()
    db.refresh(db_bank)
    return db_bank

def delete_bank_account(db: Session, bank_id: int):
    db_bank = get_bank_account(db, bank_id)
    if not db_bank:
        return False
    db.delete(db_bank)
    db.commit()
    return True
