from sqlalchemy import create_engine, text
from app.core.config import settings

def add_user_deleted_column():
    engine = create_engine(settings.DATABASE_URL)
    try:
        with engine.connect() as connection:
            connection.execute(text("ALTER TABLE orders ADD COLUMN is_user_deleted BOOLEAN DEFAULT 0"))
            connection.commit()
            print("Successfully added is_user_deleted column to orders table")
    except Exception as e:
        print(f"Error adding column: {e}")

if __name__ == "__main__":
    add_user_deleted_column()
