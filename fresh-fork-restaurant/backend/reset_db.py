import sys
import os
sys.path.append(os.getcwd())

from app.core.database import engine, Base
from app.models.user import User
from app.models.product import Product
from app.models.cart import Cart, CartItem
# Import other models if needed

def reset_db():
    print("Dropping all tables...")
    # Drop all tables
    Base.metadata.drop_all(bind=engine)
    print("Tables dropped.")
    
    print("Creating all tables...")
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Tables created.")

if __name__ == "__main__":
    reset_db()
