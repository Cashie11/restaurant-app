"""
Seed script to populate database with initial products
Run with: python -m app.scripts.seed_products
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal
from app.models.product import Product, ProductCategory
from app.core.security import get_password_hash

def seed_products():
    db = SessionLocal()
    
    try:
        # Clear existing products
        db.query(Product).delete()
        db.commit()
        print("Cleared existing products.")
        
        products = [
            # Popular Items
            Product(
                sku="GROCERY-001",
                name="Muesli Fitness Energy, gluten free",
                description="Healthy energy muesli, gluten free option",
                price=2.15,
                image_url="/assets/img/shop/grocery/01.png",
                category=ProductCategory.GROCERY,
                is_popular=True,
                stock_quantity=100,
                rating=4.8,
                review_count=124,
                weight=0.5,
                tags="muesli,breakfast,gluten-free"
            ),
            Product(
                sku="GROCERY-002",
                name="Fresh orange Klementina, Spain",
                description="Sweet and juicy oranges from Spain",
                price=3.12,
                image_url="/assets/img/shop/grocery/02.png",
                category=ProductCategory.FRUITS,
                is_popular=True,
                stock_quantity=150,
                rating=4.9,
                review_count=89,
                weight=1.0,
                tags="fruits,orange,fresh"
            ),
            Product(
                sku="GROCERY-003",
                name="Pesto sauce Barilla with basil, Italy",
                description="Classic Italian pesto sauce with basil",
                price=3.95,
                image_url="/assets/img/shop/grocery/03.png",
                category=ProductCategory.GROCERY,
                is_popular=True,
                stock_quantity=80,
                rating=4.7,
                review_count=56,
                weight=0.2,
                tags="sauce,pesto,italian"
            ),
            Product(
                sku="GROCERY-004",
                name="Organic eggs from home-grown chicken",
                description="Farm fresh organic eggs",
                price=4.28,
                image_url="/assets/img/shop/grocery/04.png",
                category=ProductCategory.DAIRY,
                is_popular=True,
                stock_quantity=60,
                rating=5.0,
                review_count=23,
                weight=0.4,
                tags="eggs,organic,dairy"
            ),
            Product(
                sku="GROCERY-005",
                name="Fresh salmon fillet, Norway",
                description="Premium Norwegian salmon fillet",
                price=12.99,
                image_url="/assets/img/shop/grocery/05.png",
                category=ProductCategory.SEAFOOD,
                is_popular=True,
                stock_quantity=40,
                rating=4.9,
                review_count=156,
                weight=0.5,
                tags="seafood,salmon,fresh"
            ),
            Product(
                sku="GROCERY-006",
                name="Coconut, Indonesia",
                description="Fresh imported coconut from Indonesia",
                price=2.99,
                image_url="/assets/img/shop/grocery/06.png",
                category=ProductCategory.FRUITS,
                is_popular=True,
                stock_quantity=90,
                rating=4.6,
                review_count=78,
                weight=0.8,
                tags="coconut,fruits,exotic"
            ),
            Product(
                sku="GROCERY-007",
                name="Italian pasta Barilla",
                description="Authentic Italian pasta",
                price=1.99,
                image_url="/assets/img/shop/grocery/07.png",
                category=ProductCategory.GROCERY,
                is_popular=True,
                stock_quantity=200,
                rating=4.8,
                review_count=201,
                weight=0.5,
                tags="pasta,italian,grocery"
            ),
            Product(
                sku="GROCERY-008",
                name="Corn oil refined Oleina",
                description="Refined corn oil for cooking",
                price=4.50,
                image_url="/assets/img/shop/grocery/08.png",
                category=ProductCategory.GROCERY,
                is_popular=True,
                stock_quantity=120,
                rating=4.5,
                review_count=93,
                weight=1.0,
                tags="oil,cooking,grocery"
            ),

            # Special Products
            Product(
                sku="SPECIAL-001",
                name="Mozzarella mini cheese",
                description="Fresh mini mozzarella cheese balls",
                price=3.50,
                image_url="/assets/img/shop/grocery/09.png",
                category=ProductCategory.DAIRY,
                is_special=True,
                stock_quantity=50,
                rating=4.7,
                review_count=89,
                weight=0.3,
                tags="cheese,dairy,mozzarella"
            ),
            Product(
                sku="SPECIAL-002",
                name="Sliced Italian ham",
                description="Premium sliced Italian ham",
                price=5.99,
                image_url="/assets/img/shop/grocery/10.png",
                category=ProductCategory.MEAT,
                is_special=True,
                stock_quantity=45,
                rating=4.8,
                review_count=134,
                weight=0.2,
                tags="ham,meat,italian"
            ),
            Product(
                sku="SPECIAL-003",
                name="Fresh blueberries",
                description="Sweet and nutritious fresh blueberries",
                price=4.25,
                image_url="/assets/img/shop/grocery/11.png",
                category=ProductCategory.FRUITS,
                is_special=True,
                stock_quantity=80,
                rating=4.9,
                review_count=67,
                weight=0.2,
                tags="berries,fruits,fresh"
            ),
            Product(
                sku="SPECIAL-004",
                name="Corn flakes original",
                description="Classic corn flakes breakfast cereal",
                price=2.99,
                image_url="/assets/img/shop/grocery/12.png",
                category=ProductCategory.GROCERY,
                is_special=True,
                stock_quantity=100,
                rating=4.6,
                review_count=112,
                weight=0.4,
                tags="cereal,breakfast,corn-flakes"
            ),
            Product(
                sku="SPECIAL-005",
                name="Tomato sauce with basil",
                description="Rich tomato sauce with fresh basil",
                price=2.50,
                image_url="/assets/img/shop/grocery/13.png",
                category=ProductCategory.GROCERY,
                is_special=True,
                stock_quantity=90,
                rating=4.8,
                review_count=98,
                weight=0.4,
                tags="sauce,tomato,basil"
            ),
            Product(
                sku="SPECIAL-006",
                name="Chocolate cookies",
                description="Delicious chocolate chip cookies",
                price=3.75,
                image_url="/assets/img/shop/grocery/14.png",
                category=ProductCategory.GROCERY,
                is_special=True,
                stock_quantity=150,
                rating=4.7,
                review_count=156,
                weight=0.3,
                tags="cookies,snacks,chocolate"
            ),

            # Special Offers
            Product(
                sku="OFFER-001",
                name="Vita Coco Coconut water",
                description="Hydrating coconut water",
                price=1.99,
                image_url="/assets/img/shop/grocery/15.png",
                category=ProductCategory.BEVERAGES,
                is_offer=True,
                discount_percentage=33,
                stock_quantity=200,
                rating=4.5,
                review_count=78,
                weight=0.5,
                tags="beverage,coconut,water"
            ),
            Product(
                sku="OFFER-002",
                name="Honest Organic Juice",
                description="Organic fruit juice beverage",
                price=2.49,
                image_url="/assets/img/shop/grocery/16.png",
                category=ProductCategory.BEVERAGES,
                is_offer=True,
                discount_percentage=29,
                stock_quantity=180,
                rating=4.7,
                review_count=92,
                weight=0.5,
                tags="juice,organic,beverage"
            ),
            Product(
                sku="OFFER-003",
                name="Organic baby spinach",
                description="Fresh organic baby spinach leaves",
                price=1.99,
                image_url="/assets/img/shop/grocery/01.png",
                category=ProductCategory.VEGETABLES,
                is_offer=True,
                discount_percentage=33,
                stock_quantity=120,
                rating=4.8,
                review_count=56,
                weight=0.2,
                tags="spinach,vegetables,organic"
            ),
            Product(
                sku="OFFER-004",
                name="Fresh strawberries",
                description="Sweet fresh strawberries on sale",
                price=3.99,
                image_url="/assets/img/shop/grocery/02.png",
                category=ProductCategory.FRUITS,
                is_offer=True,
                discount_percentage=33,
                stock_quantity=100,
                rating=4.9,
                review_count=124,
                weight=0.3,
                tags="strawberries,fruits,sale"
            ),
            Product(
                sku="OFFER-005",
                name="Premium olive oil",
                description="Extra virgin olive oil",
                price=6.99,
                image_url="/assets/img/shop/grocery/08.png",
                category=ProductCategory.GROCERY,
                is_offer=True,
                discount_percentage=30,
                stock_quantity=80,
                rating=4.8,
                review_count=89,
                weight=0.75,
                tags="oil,olive,cooking"
            ),
            Product(
                sku="OFFER-006",
                name="Organic pasta",
                description="Organic italian pasta on sale",
                price=1.49,
                image_url="/assets/img/shop/grocery/07.png",
                category=ProductCategory.GROCERY,
                is_offer=True,
                discount_percentage=40,
                stock_quantity=200,
                rating=4.6,
                review_count=145,
                weight=0.5,
                tags="pasta,organic,sale"
            )
        ]
        
        # Add all products to database
        for product in products:
            db.add(product)
        
        db.commit()
        print(f"✅ Successfully seeded {len(products)} products!")
        
        # Print summary
        popular_count = sum(1 for p in products if p.is_popular)
        special_count = sum(1 for p in products if p.is_special)
        offer_count = sum(1 for p in products if p.is_offer)
        
        print(f"\nSummary:")
        print(f"- Popular Items: {popular_count}")
        print(f"- Special Products: {special_count}")
        print(f"- Special Offers: {offer_count}")
        
    except Exception as e:
        print(f"❌ Error seeding products: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_products()
