from sqlalchemy import create_engine, text
import os
import sys

# Add parent directory to path so we can import app
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Database URL
DATABASE_URL = "sqlite:///./data/urbangrille.db"

def add_column():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        try:
            # Check if column exists
            result = conn.execute(text("PRAGMA table_info(orders)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'delivery_fee' not in columns:
                print("Adding delivery_fee column to orders table...")
                conn.execute(text("ALTER TABLE orders ADD COLUMN delivery_fee FLOAT DEFAULT 0 NOT NULL"))
                print("Column added successfully.")
            else:
                print("Column delivery_fee already exists.")
                
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    add_column()
