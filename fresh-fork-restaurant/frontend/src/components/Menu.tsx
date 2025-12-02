import React, { useState } from 'react';

const Menu: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Items', emoji: '🍽️' },
        { id: 'appetizers', name: 'Appetizers', emoji: '🥗' },
        { id: 'main', name: 'Main Courses', emoji: '🍖' },
        { id: 'pasta', name: 'Pasta & Pizza', emoji: '🍝' },
        { id: 'seafood', name: 'Seafood', emoji: '🦞' },
        { id: 'desserts', name: 'Desserts', emoji: '🍰' },
        { id: 'beverages', name: 'Beverages', emoji: '🥤' }
    ];

    const menuItems = [
        // Appetizers
        {
            id: 1,
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce, parmesan cheese, croutons, and classic Caesar dressing',
            price: 12.99,
            category: 'appetizers',
            image: '/assets/img/shop/grocery/01.png',
            badge: 'Popular',
            rating: 4.7,
            reviews: 156
        },
        {
            id: 2,
            name: 'Bruschetta Trio',
            description: 'Three varieties of toasted bread with tomato basil, mushroom, and olive tapenade',
            price: 14.99,
            category: 'appetizers',
            image: '/assets/img/shop/grocery/02.png',
            badge: null,
            rating: 4.6,
            reviews: 89
        },
        {
            id: 3,
            name: 'Calamari Fritti',
            description: 'Crispy fried calamari served with marinara sauce and lemon wedges',
            price: 16.99,
            category: 'appetizers',
            image: '/assets/img/shop/grocery/03.png',
            badge: 'New',
            rating: 4.8,
            reviews: 124
        },
        // Main Courses
        {
            id: 4,
            name: 'Grilled Ribeye Steak',
            description: '12oz premium ribeye with roasted vegetables and garlic mashed potatoes',
            price: 34.99,
            category: 'main',
            image: '/assets/img/shop/grocery/04.png',
            badge: 'Bestseller',
            rating: 4.9,
            reviews: 342
        },
        {
            id: 5,
            name: 'Herb Roasted Chicken',
            description: 'Half chicken marinated in herbs, served with seasonal vegetables',
            price: 24.99,
            category: 'main',
            image: '/assets/img/shop/grocery/05.png',
            badge: null,
            rating: 4.7,
            reviews: 198
        },
        {
            id: 6,
            name: 'Lamb Chops',
            description: 'Grilled lamb chops with rosemary, served with mint sauce and roasted potatoes',
            price: 38.99,
            category: 'main',
            image: '/assets/img/shop/grocery/06.png',
            badge: 'Premium',
            rating: 4.8,
            reviews: 167
        },
        // Pasta & Pizza
        {
            id: 7,
            name: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta with pancetta, eggs, parmesan, and black pepper',
            price: 18.99,
            category: 'pasta',
            image: '/assets/img/shop/grocery/07.png',
            badge: 'Popular',
            rating: 4.8,
            reviews: 234
        },
        {
            id: 8,
            name: 'Margherita Pizza',
            description: 'Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil',
            price: 16.99,
            category: 'pasta',
            image: '/assets/img/shop/grocery/08.png',
            badge: null,
            rating: 4.7,
            reviews: 289
        },
        {
            id: 9,
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with garlic, red chili peppers, and fresh parsley',
            price: 15.99,
            category: 'pasta',
            image: '/assets/img/shop/grocery/09.png',
            badge: null,
            rating: 4.6,
            reviews: 145
        },
        // Seafood
        {
            id: 10,
            name: 'Grilled Salmon',
            description: 'Atlantic salmon fillet with lemon butter sauce and asparagus',
            price: 28.99,
            category: 'seafood',
            image: '/assets/img/shop/grocery/10.png',
            badge: 'Chef Special',
            rating: 4.9,
            reviews: 267
        },
        {
            id: 11,
            name: 'Seafood Paella',
            description: 'Spanish rice dish with shrimp, mussels, clams, and saffron',
            price: 32.99,
            category: 'seafood',
            image: '/assets/img/shop/grocery/11.png',
            badge: 'Premium',
            rating: 4.8,
            reviews: 198
        },
        {
            id: 12,
            name: 'Lobster Tail',
            description: 'Butter-poached lobster tail with drawn butter and lemon',
            price: 42.99,
            category: 'seafood',
            image: '/assets/img/shop/grocery/12.png',
            badge: 'Premium',
            rating: 4.9,
            reviews: 156
        },
        // Desserts
        {
            id: 13,
            name: 'Tiramisu',
            description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
            price: 8.99,
            category: 'desserts',
            image: '/assets/img/shop/grocery/13.png',
            badge: 'Popular',
            rating: 4.8,
            reviews: 234
        },
        {
            id: 14,
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
            price: 9.99,
            category: 'desserts',
            image: '/assets/img/shop/grocery/14.png',
            badge: 'Bestseller',
            rating: 4.9,
            reviews: 312
        },
        {
            id: 15,
            name: 'Crème Brûlée',
            description: 'Classic French custard with caramelized sugar topping',
            price: 7.99,
            category: 'desserts',
            image: '/assets/img/shop/grocery/15.png',
            badge: null,
            rating: 4.7,
            reviews: 178
        },
        // Beverages
        {
            id: 16,
            name: 'Fresh Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 4.99,
            category: 'beverages',
            image: '/assets/img/shop/grocery/16.png',
            badge: null,
            rating: 4.6,
            reviews: 145
        },
        {
            id: 17,
            name: 'Iced Coffee',
            description: 'Cold brew coffee served over ice with your choice of milk',
            price: 5.99,
            category: 'beverages',
            image: '/assets/img/shop/grocery/01.png',
            badge: 'Popular',
            rating: 4.7,
            reviews: 312
        },
        {
            id: 18,
            name: 'Fruit Smoothie',
            description: 'Blend of fresh seasonal fruits with yogurt and honey',
            price: 6.99,
            category: 'beverages',
            image: '/assets/img/shop/grocery/02.png',
            badge: null,
            rating: 4.8,
            reviews: 178
        }
    ];

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="ci-star-fill" style={{ color: '#FF6B35' }}></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="ci-star-half" style={{ color: '#FF6B35' }}></i>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="ci-star" style={{ color: '#FF6B35' }}></i>);
        }

        return stars;
    };

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            <div className="container py-5">
                {/* Page Header */}
                <div className="text-center mb-5">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>🍽️</div>
                    <h1 className="display-4 fw-bold mb-3" style={{ color: '#2d3436' }}>Our Delicious Menu</h1>
                    <p className="lead" style={{ color: '#636e72', maxWidth: '600px', margin: '0 auto' }}>
                        Discover our carefully crafted dishes made with the freshest ingredients
                    </p>
                </div>

                {/* Category Filter */}
                <div className="mb-5">
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className="btn rounded-pill px-4 py-2 shadow-sm"
                                style={{
                                    background: activeCategory === category.id
                                        ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                                        : '#FFFFFF',
                                    color: activeCategory === category.id ? '#FFFFFF' : '#2d3436',
                                    border: activeCategory === category.id ? 'none' : '2px solid #FFE5D9',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    transform: activeCategory === category.id ? 'translateY(-2px)' : 'translateY(0)',
                                    boxShadow: activeCategory === category.id
                                        ? '0 8px 20px rgba(255, 107, 53, 0.3)'
                                        : '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeCategory !== category.id) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeCategory !== category.id) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                                    }
                                }}
                            >
                                <span className="me-2">{category.emoji}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="col">
                            <div
                                className="card h-100 border-0 shadow-sm"
                                style={{
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: '#FFFFFF'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                }}
                            >
                                <div className="position-relative">
                                    <button
                                        type="button"
                                        className="btn btn-sm position-absolute top-0 end-0 z-2 mt-2 me-2"
                                        aria-label="Add to Wishlist"
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            border: 'none',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <i className="ci-heart" style={{ color: '#FF6B35' }}></i>
                                    </button>
                                    <div className="p-3">
                                        <div className="ratio" style={{ '--cz-aspect-ratio': 'calc(160 / 191 * 100%)' } as React.CSSProperties}>
                                            <img src={item.image} alt={item.name} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    {item.badge && (
                                        <span
                                            className="badge position-absolute top-0 start-0 mt-2 ms-2"
                                            style={{
                                                background: item.badge === 'Popular' || item.badge === 'Bestseller'
                                                    ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                                                    : item.badge === 'New'
                                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                        : item.badge === 'Premium' || item.badge === 'Chef Special'
                                                            ? 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)'
                                                            : '#FF6B35',
                                                color: '#FFFFFF',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontWeight: '600',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="card-body pt-2 px-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="h4 mb-0 fw-bold" style={{ color: '#FF6B35' }}>
                                            ${item.price}
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            {renderStars(item.rating)}
                                        </div>
                                    </div>

                                    <h3 className="fs-6 fw-bold mb-2" style={{ color: '#2d3436' }}>
                                        {item.name}
                                    </h3>

                                    <p className="small mb-3" style={{ color: '#636e72', fontSize: '0.85rem', lineHeight: '1.5' }}>
                                        {item.description}
                                    </p>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <span className="fs-xs" style={{ color: '#b2bec3' }}>
                                            {item.rating} ({item.reviews} reviews)
                                        </span>
                                    </div>

                                    <button
                                        className="btn w-100 text-white fw-semibold"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <i className="ci-cart me-2"></i>Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-5">
                        <div className="mb-4" style={{ fontSize: '4rem' }}>🍽️</div>
                        <h3 className="mb-3" style={{ color: '#2d3436' }}>No items found</h3>
                        <p style={{ color: '#636e72' }}>Try selecting a different category</p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-5 pt-5">
                    <div
                        className="p-5 rounded-4"
                        style={{
                            background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5F0 100%)',
                            border: '2px solid #FFD4C4'
                        }}
                    >
                        <h3 className="mb-3 fw-bold" style={{ color: '#2d3436' }}>Can't find what you're looking for?</h3>
                        <p className="mb-4" style={{ color: '#636e72' }}>Contact us for special requests or dietary accommodations</p>
                        <button
                            className="btn btn-lg px-5 fw-semibold text-white"
                            style={{
                                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Contact Us <i className="ci-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
