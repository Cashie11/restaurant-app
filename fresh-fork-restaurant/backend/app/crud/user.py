from sqlalchemy.orm import Session
from typing import Optional
from app.models.user import User, Address
from app.schemas.user import UserCreate, UserUpdate, AddressCreate
from app.core.security import get_password_hash, verify_password


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID"""
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate) -> User:
    """Create a new user"""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
    """Update user information"""
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate a user"""
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def change_password(db: Session, user_id: int, current_password: str, new_password: str) -> bool:
    """Change user password"""
    user = get_user_by_id(db, user_id)
    if not user:
        return False
    
    if not verify_password(current_password, user.hashed_password):
        return False
    
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    return True


def create_address(db: Session, user_id: int, address: AddressCreate) -> Address:
    """Create a new address for user"""
    # If this is set as default, unset other default addresses
    if address.is_default:
        db.query(Address).filter(Address.user_id == user_id).update({"is_default": False})
    
    db_address = Address(
        user_id=user_id,
        **address.dict()
    )
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address


def get_user_addresses(db: Session, user_id: int):
    """Get all addresses for a user"""
    return db.query(Address).filter(Address.user_id == user_id).all()


def delete_address(db: Session, address_id: int, user_id: int) -> bool:
    """Delete an address"""
    address = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == user_id
    ).first()
    
    if not address:
        return False
    
    db.delete(address)
    db.commit()
    return True
