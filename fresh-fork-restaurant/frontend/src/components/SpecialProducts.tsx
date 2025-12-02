import React from 'react';

const SpecialProducts: React.FC = () => {
    const specialProducts = [
        {
            id: 1,
            name: 'Chef\'s Signature Burger',
            description: 'Premium beef patty with truffle aioli, aged cheddar, caramelized onions, and brioche bun',
            price: 24.99,
            originalPrice: 29.99,
            image: '/assets/img/shop/grocery/01.png',
            badge: 'CHEF SPECIAL',
            badgeColor: 'danger',
            rating: 4.9,
            reviews: 324,
            emoji: '👨‍🍳'
        },
        {
            id: 2,
            name: 'Seafood Platter Deluxe',
            description: 'Fresh lobster, shrimp, scallops, and crab legs served with garlic butter and lemon',
            price: 49.99,
            originalPrice: 59.99,
            image: '/assets/img/shop/grocery/02.png',
            badge: 'LIMITED TIME',
            badgeColor: 'warning',
            rating: 4.8,
            reviews: 189,
            emoji: '🦞'
        },
        {
            id: 3,
            name: 'Truffle Mushroom Risotto',
            description: 'Creamy arborio rice with wild mushrooms, black truffle, and parmesan shavings',
            price: 32.99,
            originalPrice: 38.99,
            image: '/assets/img/shop/grocery/03.png',
            badge: 'VEGETARIAN',
            badgeColor: 'success',
            rating: 4.7,
            reviews: 156,
            emoji: '🍄'
        },
        {
            id: 4,
            name: 'Wagyu Beef Steak',
            description: 'A5-grade wagyu beef grilled to perfection with roasted vegetables and red wine reduction',
            price: 89.99,
            originalPrice: 109.99,
            image: '/assets/img/shop/grocery/product/01.png',
            badge: 'PREMIUM',
            badgeColor: 'dark',
            rating: 5.0,
            reviews: 98,
            emoji: '🥩'
        }
    ];

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-warning me-1">⭐</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="text-warning me-1">⭐</span>);
        }

        return stars;
    };

    return (
        <section className="bg-white py-5 py-lg-7">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">Special Products</h2>
                    <p className="lead text-muted">Exclusive dishes crafted by our chefs with premium ingredients</p>
                </div>

                <div className="row g-4">
                    {specialProducts.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-6">
                            <div className="card border-0 shadow-sm h-100 product-card">
                                <div className="position-relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute top-0 start-0 m-3">
                                        <span className={`badge bg-${product.badgeColor} text-white rounded-pill px-3 py-2`}>
                                            {product.badge}
                                        </span>
                                    </div>
                                    <div className="position-absolute top-0 end-0 m-3">
                                        <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                            <span className="fs-5">{product.emoji}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title fw-bold mb-2">{product.name}</h5>
                                    <p className="card-text text-muted small mb-3" style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                                        {product.description}
                                    </p>

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-2">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="fs-xs text-muted ms-2">({product.reviews} reviews)</span>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div>
                                            <span className="fw-bold text-success fs-5">${product.price}</span>
                                            <span className="text-muted text-decoration-line-through ms-2">${product.originalPrice}</span>
                                        </div>
                                        <div className="badge bg-danger text-white">
                                            Save ${product.originalPrice - product.price}
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-fresh flex-fill">
                                            <i className="ci-cart me-1"></i>Order Now
                                        </button>
                                        <button className="btn btn-outline-fresh">
                                            <i className="ci-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <p className="text-muted mb-3">
                        <i className="ci-clock me-2"></i>
                        Special products are available for limited time only
                    </p>
                    <button className="btn btn-outline-fresh btn-lg px-5">
                        View All Specials <i className="ci-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialProducts;
