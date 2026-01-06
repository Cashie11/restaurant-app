from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models.bank import BankAccount

def seed_banks():
    db: Session = SessionLocal()
    try:
        # Check if banks already exist
        existing_banks = db.query(BankAccount).count()
        if existing_banks > 0:
            print("Bank accounts already exist. Skipping seed.")
            return

        banks = [
            BankAccount(
                bank_name="GTBank",
                account_number="0123456789",
                account_name="Urban Grille Ltd",
                is_active=True
            ),
            BankAccount(
                bank_name="Zenith Bank",
                account_number="2001234567",
                account_name="Urban Grille Ltd",
                is_active=True
            ),
            BankAccount(
                bank_name="First Bank",
                account_number="3001234567",
                account_name="Urban Grille Ltd",
                is_active=True
            )
        ]

        for bank in banks:
            db.add(bank)
        
        db.commit()
        print("Successfully seeded bank accounts.")
        
    except Exception as e:
        print(f"Error seeding banks: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_banks()
