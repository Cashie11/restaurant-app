import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash

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
            email="admin@urbangrille.com",
            first_name="Admin",
            last_name="User",
            hashed_password=get_password_hash("UrbanChef!2025Secure"),
            is_active=True,
            role=UserRole.ADMIN,
            is_email_verified=True
        )
        db.add(admin_user)
        
        # Create Regular User
        regular_user = User(
            email="user@example.com",
            first_name="Test",
            last_name="User",
            hashed_password=get_password_hash("user123"),
            is_active=True,
            role=UserRole.USER,
            is_email_verified=True
        )
        db.add(regular_user)
        
        db.commit()
        print("✅ Successfully seeded users!")
        print("Credentials:")
        print("Admin: admin@urbangrille.com / UrbanChef!2025Secure")
        print("User:  user@example.com  / user123")
        
    except Exception as e:
        print(f"❌ Error seeding users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
