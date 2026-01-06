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
        # Clear existing data in correct order to avoid FK violations
        from app.models.cart import Cart, CartItem
        from app.models.order import Order, OrderItem
        
        print("Clearing existing data...")
        db.query(OrderItem).delete()
        db.query(Order).delete()
        db.query(CartItem).delete()
        db.query(Cart).delete()
        db.query(Product).delete()
        db.commit()
        print("Cleared existing products and related data.")
        
        products = [
            # Appetizers
            Product(
                sku="APP-001",
                name="Mozzarella Mini Cheese",
                description="Fresh mini mozzarella cheese balls, perfect for salads",
                price=3500.00,
                image_url="/assets/img/shop/grocery/04.png",
                category=ProductCategory.APPETIZERS,
                is_popular=True,
                stock_quantity=50,
                rating=4.7,
                review_count=89,
                weight=0.3,
                tags="cheese,dairy,mozzarella,appetizer"
            ),
            Product(
                sku="APP-002",
                name="Fresh Asparagus Bunch",
                description="Tender green asparagus, great for grilling or appetizers",
                price=4500.00,
                image_url="/assets/img/shop/grocery/08.png",
                category=ProductCategory.APPETIZERS,
                is_popular=True,
                stock_quantity=40,
                rating=4.8,
                review_count=112,
                weight=0.5,
                tags="vegetable,fresh,asparagus,appetizer"
            ),
            Product(
                sku="APP-003",
                name="Herbal Cream Cheese Dip",
                description="Creamy herbal dip for crackers and vegetables",
                price=3000.00,
                image_url="/assets/img/shop/grocery/12.png",
                category=ProductCategory.APPETIZERS,
                is_special=True,
                stock_quantity=60,
                rating=4.6,
                review_count=78,
                weight=0.2,
                tags="dip,cheese,herbs,appetizer"
            ),

            # Main Courses
            Product(
                sku="MAIN-001",
                name="Premium Beef Steak",
                description="Juicy, tender ribeye steak from grass-fed cattle",
                price=19000.00,
                image_url="/assets/img/shop/grocery/10.png",
                category=ProductCategory.MAIN,
                is_popular=True,
                stock_quantity=30,
                rating=4.9,
                review_count=156,
                weight=0.6,
                tags="meat,beef,steak,main"
            ),
            Product(
                sku="MAIN-002",
                name="Fresh Salmon Fillet",
                description="Premium Norwegian salmon fillet, rich in Omega-3",
                price=15500.00,
                image_url="/assets/img/shop/grocery/13.png",
                category=ProductCategory.SEAFOOD,
                is_popular=True,
                stock_quantity=45,
                rating=4.9,
                review_count=134,
                weight=0.5,
                tags="seafood,salmon,fresh,main"
            ),
            Product(
                sku="MAIN-003",
                name="Barilla Italian Pesto Pasta",
                description="Classic Italian pasta with rich basil pesto sauce",
                price=12500.00,
                image_url="/assets/img/shop/grocery/07.png",
                category=ProductCategory.PASTA,
                is_popular=True,
                stock_quantity=100,
                rating=4.7,
                review_count=201,
                weight=0.5,
                tags="pasta,italian,pesto,main"
            ),

            # Fruits & More
            Product(
                sku="FRUIT-001",
                name="Fresh Spanish Oranges",
                description="Sweet and juicy oranges imported from Spain",
                price=3100.00,
                image_url="/assets/img/shop/grocery/02.png",
                category=ProductCategory.FRUITS,
                is_popular=True,
                stock_quantity=150,
                rating=4.9,
                review_count=89,
                weight=1.0,
                tags="fruit,orange,fresh"
            ),
            Product(
                sku="FRUIT-002",
                name="Exotic Indonesian Coconut",
                description="Fresh coconut with sweet water inside",
                price=3000.00,
                image_url="/assets/img/shop/grocery/05.png",
                category=ProductCategory.FRUITS,
                is_popular=True,
                stock_quantity=90,
                rating=4.6,
                review_count=78,
                weight=0.8,
                tags="coconut,fruit,exotic"
            ),
            Product(
                sku="FRUIT-003",
                name="Fresh Tropical Mango",
                description="Ripe and sweet tropical mango",
                price=2000.00,
                image_url="/assets/img/shop/grocery/06.png",
                category=ProductCategory.FRUITS,
                is_special=True,
                stock_quantity=120,
                rating=4.8,
                review_count=67,
                weight=0.4,
                tags="mango,fruit,tropical"
            ),
            Product(
                sku="FRUIT-004",
                name="Fresh Red Grapes",
                description="Sweet and crunchy seedless red grapes",
                price=4000.00,
                image_url="/assets/img/shop/grocery/14.png",
                category=ProductCategory.FRUITS,
                is_popular=False,
                stock_quantity=100,
                rating=4.7,
                review_count=56,
                weight=0.5,
                tags="grapes,fruit,fresh"
            ),

            # Beverages
            Product(
                sku="BEV-001",
                name="Classic Pepsi Can",
                description="Refreshing 330ml can of Pepsi",
                price=600.00,
                image_url="/assets/img/shop/grocery/03.png",
                category=ProductCategory.BEVERAGES,
                is_popular=True,
                stock_quantity=500,
                rating=4.5,
                review_count=234,
                weight=0.33,
                tags="beverage,soda,pepsi"
            ),
            Product(
                sku="BEV-002",
                name="Vita Coco Coconut Water",
                description="Pure and hydrating coconut water",
                price=2500.00,
                image_url="/assets/img/shop/grocery/05.png", # Reusing coconut image as it's better than lemons
                category=ProductCategory.BEVERAGES,
                is_offer=True,
                discount_percentage=20,
                stock_quantity=200,
                rating=4.7,
                review_count=92,
                weight=0.5,
                tags="beverage,coconut,water"
            ),

            # Grocery/Other
            Product(
                sku="GROC-001",
                name="Muesli Fitness Energy",
                description="Healthy energy muesli with fruits and grains",
                price=2200.00,
                image_url="/assets/img/shop/grocery/01.png",
                category=ProductCategory.GROCERY,
                is_popular=True,
                stock_quantity=100,
                rating=4.8,
                review_count=124,
                weight=0.5,
                tags="breakfast,muesli,energy"
            ),
            Product(
                sku="GROC-002",
                name="Premium Olive Oil",
                description="Extra virgin olive oil from cold-pressed olives",
                price=8000.00,
                image_url="/assets/img/shop/grocery/09.png",
                category=ProductCategory.OILS,
                is_special=True,
                stock_quantity=80,
                rating=4.9,
                review_count=134,
                weight=1.0,
                tags="oil,olive,cooking"
            ),
            # New Special Products
            Product(
                sku="SNACK-001",
                name="Gourmet Truffle Chips",
                description="Hand-cooked potato chips with black truffle seasoning",
                price=4500.00,
                image_url="/assets/img/shop/grocery/11.png",
                category=ProductCategory.SNACKS,
                is_special=True,
                stock_quantity=100,
                rating=4.8,
                review_count=45,
                weight=0.15,
                tags="snacks,chips,truffle,gourmet"
            ),
            Product(
                sku="BAK-001",
                name="Artisan Sourdough Bread",
                description="Freshly baked organic sourdough loaf",
                price=6000.00,
                image_url="/assets/img/shop/grocery/15.png",
                category=ProductCategory.BAKERY,
                is_special=True,
                stock_quantity=20,
                rating=4.9,
                review_count=156,
                weight=0.8,
                tags="bread,bakery,sourdough"
            ),

            # New Special Offers
            Product(
                sku="DAIRY-001",
                name="Organic Greek Yogurt",
                description="Creamy greek yogurt, high in protein",
                price=4000.00,
                image_url="/assets/img/shop/grocery/16.png",
                category=ProductCategory.DAIRY,
                is_offer=True,
                discount_percentage=15,
                stock_quantity=60,
                rating=4.7,
                review_count=89,
                weight=0.5,
                tags="dairy,yogurt,organic"
            ),
            Product(
                sku="MEAT-001",
                name="BBQ Chicken Wings",
                description="Marinated chicken wings ready for the grill",
                price=8500.00,
                image_url="/assets/img/shop/grocery/17.png",
                category=ProductCategory.MEAT,
                is_offer=True,
                discount_percentage=25,
                stock_quantity=40,
                rating=4.6,
                review_count=112,
                weight=1.0,
                tags="meat,chicken,bbq"
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
