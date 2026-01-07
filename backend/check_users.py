from app.core.database import SessionLocal
from app.models.user import User

db = SessionLocal()
users = db.query(User).all()

print(f"Total users: {len(users)}")
for user in users:
    print(f"User: {user.email}, Role: {user.role}, Active: {user.is_active}")

db.close()
