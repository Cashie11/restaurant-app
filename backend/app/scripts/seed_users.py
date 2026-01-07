import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash
from app.core.config import settings

def seed_users():
    db = SessionLocal()
    
    try:
        # Check if users exist
        if db.query(User).count() > 0:
            print("Users already exist. Skipping seed.")
            return

        print("Seeding users...")
        
        # Create Admin
        admin_user = User(
            email=settings.SEED_ADMIN_EMAIL,
            first_name="Admin",
            last_name="User",
            hashed_password=get_password_hash(settings.SEED_ADMIN_PASSWORD),
            is_active=True,
            role=UserRole.ADMIN,
            is_email_verified=True
        )
        db.add(admin_user)
        
        # Create Regular User
        regular_user = User(
            email=settings.SEED_USER_EMAIL,
            first_name="Test",
            last_name="User",
            hashed_password=get_password_hash(settings.SEED_USER_PASSWORD),
            is_active=True,
            role=UserRole.USER,
            is_email_verified=True
        )
        db.add(regular_user)
        
        db.commit()
        print("✅ Successfully seeded users!")
        print("Credentials:")
        print(f"Admin: {settings.SEED_ADMIN_EMAIL} / [HIDDEN] (Check .env)")
        print(f"User:  {settings.SEED_USER_EMAIL}  / [HIDDEN]")
        
    except Exception as e:
        print(f"❌ Error seeding users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
