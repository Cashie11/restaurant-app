from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BankAccountBase(BaseModel):
    bank_name: str
    account_number: str
    account_name: str
    is_active: bool = True

class BankAccountCreate(BankAccountBase):
    pass

class BankAccountUpdate(BankAccountBase):
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    account_name: Optional[str] = None
    is_active: Optional[bool] = None

class BankAccountResponse(BankAccountBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
