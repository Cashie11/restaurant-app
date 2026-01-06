from app.core.database import SessionLocal
from app.crud import product as crud_product
from app.schemas.product import ProductResponse

def debug():
    db = SessionLocal()
    try:
        print("Fetching products...")
        products = crud_product.get_products(db)
        print(f"Found {len(products)} products.")
        
        for p in products:
            print(f"Validating product: {p.name} (ID: {p.id})")
            try:
                # This mimics FastAPI's response validation
                ProductResponse.from_orm(p)
            except Exception as e:
                print(f"Validation failed for {p.name}: {e}")
                # Print more details about the product data
                print(f"Category: {p.category}, Type: {type(p.category)}")
    except Exception as e:
        print(f"Error during execution: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug()
