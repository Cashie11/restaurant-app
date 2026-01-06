import sqlite3
import os

DB_PATH = "/app/data/urbangrille.db"

def migrate_db():
    print(f"Connecting to database at {DB_PATH}...")
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if column exists
        cursor.execute("PRAGMA table_info(orders)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "cancellation_reason" in columns:
            print("Column 'cancellation_reason' already exists.")
        else:
            print("Adding 'cancellation_reason' column...")
            cursor.execute("ALTER TABLE orders ADD COLUMN cancellation_reason TEXT")
            conn.commit()
            print("Column added successfully.")
            
        conn.close()
    except Exception as e:
        print(f"Error migrating database: {e}")

if __name__ == "__main__":
    migrate_db()
