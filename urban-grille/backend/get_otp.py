from app.core.database import SessionLocal
from app.models.user import User
import sys

email = sys.argv[1]
db = SessionLocal()
user = db.query(User).filter(User.email == email).first()

if user:
    print(f"OTP for {email}: {user.otp_code}")
else:
    print(f"User {email} not found")

db.close()
