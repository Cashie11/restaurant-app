import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTouchSwipe } from '../hooks/useTouchSwipe';

interface SpecialProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

interface SpecialProductCardProps {
    product: SpecialProduct;
    handleAddToCart: (e: React.MouseEvent, productId: number) => Promise<void>;
    addingId: number | null;
}

const SpecialProductCard: React.FC<SpecialProductCardProps> = ({ product, handleAddToCart, addingId }) => (
    <div
        className="card h-100 border-0 position-relative"
        style={{
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
            position: 'relative'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)';
        }}
    >

        {/* Special Badge */}
        <span
            className="badge position-absolute top-0 start-0 m-3 shadow-sm"
            style={{
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                zIndex: 20,
                backgroundColor: '#e17055',
                color: 'white',
                animation: 'bounceIn 0.8s cubic-bezier(0.8, 0, 1, 1)'
            }}
        >
            Special
        </span>

        {/* Product Image */}
        <div className="card-img-top position-relative overflow-hidden" style={{
            height: '240px',
            background: 'radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <img
                src={product.image}
                alt={product.name}
                style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15) translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                }}
            />
        </div>

        {/* Product Info */}
        <div className="card-body text-center p-4 d-flex flex-column" style={{ background: '#ffffff', position: 'relative', zIndex: 10 }}>
            <p className="text-uppercase fw-bold mb-2" style={{
                fontSize: '11px',
                letterSpacing: '1px',
                color: '#b2bec3'
            }}>
                {product.category}
            </p>

            <h6 className="mb-3 product-title" style={{
                fontSize: '16px',
                fontWeight: 700,
                minHeight: '48px',
                lineHeight: '1.5',
                color: '#2d3436',
                transition: 'color 0.2s'
            }}>
                {product.name}
            </h6>

            {/* Rating */}
            <div className="d-flex align-items-center justify-content-center mb-3">
                <div className="d-flex text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ci-star${i < Math.floor(product.rating) ? '-filled' : ''} fs-xs`} style={{ marginRight: '2px' }}></i>
                    ))}
                </div>
                <span className="text-muted fs-xs fw-medium">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="mb-4">
                <span className="fw-bolder" style={{
                    fontSize: '24px',
                    color: '#FF6B35',
                    letterSpacing: '-0.5px'
                }}>
                    ${product.price.toFixed(2)}
                </span>
            </div>

            <div className="mt-auto">
                {/* Add to Cart Button */}
                <button
                    className="btn w-100 mb-3 fw-bold"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        color: 'white',
                        fontSize: '14px',
                        boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: addingId === product.id ? 0.8 : 1
                    }}
                    disabled={addingId === product.id}
                    onClick={(e) => handleAddToCart(e, product.id)}
                    onMouseEnter={(e) => {
                        if (addingId !== product.id) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px rgba(255, 107, 53, 0.3)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (addingId !== product.id) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 107, 53, 0.2)';
                        }
                    }}
                >
                    {addingId === product.id ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Adding...
                        </>
                    ) : (
                        <>
                            <i className="ci-cart me-2"></i> Add to Cart
                        </>
                    )}
                </button>

                {/* Quick View Link */}
                <a
                    href="#!"
                    className="text-decoration-none d-inline-flex align-items-center justify-content-center fw-semibold quick-view-link"
                    style={{
                        fontSize: '13px',
                        color: '#636e72',
                        transition: 'all 0.2s ease',
                        borderBottom: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FF6B35';
                        e.currentTarget.style.borderBottomColor = '#FF6B35';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#636e72';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                    }}
                >
                    <i className="ci-eye me-1"></i> Quick view
                </a>
            </div>
        </div>
    </div>
);

const specialProducts = [
    {
        id: 9,
        name: "Mozzarella mini cheese",
        price: 3.50,
        image: "/assets/img/shop/grocery/09.png",
        category: "Dairy",
        rating: 4.7,
        reviews: 89
    },
    {
        id: 10,
        name: "Sliced Italian ham",
        price: 5.99,
        image: "/assets/img/shop/grocery/10.png",
        category: "Meat",
        rating: 4.8,
        reviews: 134
    },
    {
        id: 11,
        name: "Fresh blueberries",
        price: 4.25,
        image: "/assets/img/shop/grocery/11.png",
        category: "Fruits",
        rating: 4.9,
        reviews: 67
    },
    {
        id: 12,
        name: "Corn flakes original",
        price: 2.99,
        image: "/assets/img/shop/grocery/12.png",
        category: "Breakfast",
        rating: 4.6,
        reviews: 112
    },
    {
        id: 13,
        name: "Tomato sauce with basil",
        price: 2.50,
        image: "/assets/img/shop/grocery/13.png",
        category: "Sauces",
        rating: 4.8,
        reviews: 98
    },
    {
        id: 14,
        name: "Chocolate cookies",
        price: 3.75,
        image: "/assets/img/shop/grocery/14.png",
        category: "Snacks",
        rating: 4.7,
        reviews: 156
    }
];

const SpecialProducts: React.FC = () => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [addingId, setAddingId] = useState<number | null>(null);
    const swipe = useTouchSwipe(specialProducts.length);

    const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
        e.preventDefault(); // Prevent navigation if inside a link
        e.stopPropagation();

        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }

        try {
            setAddingId(productId);
            await addToCart(productId, 1);
            // Optional: Add toast notification here
        } catch (error) {
            console.error('Failed to add item:', error);
            alert('Failed to add item to cart. Please try again.');
        } finally {
            setAddingId(null);
        }
    };

    return (
        <section className="container py-5">
            {/* Header Section */}
            <div className="text-center mb-5" style={{
                animation: 'fadeInDown 0.6s ease-out'
            }}>
                <div className="d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill mb-3" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    <i className="ci-star text-danger me-2"></i>
                    <span className="text-uppercase fw-semibold" style={{ fontSize: '12px', letterSpacing: '1px', color: '#FF6B35' }}>
                        PREMIUM SELECTION
                    </span>
                </div>
                <h2 className="display-6 fw-bold mb-3">Special Products</h2>
                <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Handpicked premium items for the discerning customer
                </p>
            </div>

            {/* Mobile Carousel */}
            <div className="d-md-none">
                <div className="position-relative">
                    {/* Previous Button */}
                    <button
                        className="position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center border-0"
                        style={{
                            zIndex: 10,
                            left: '-25px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)',
                            border: '2px solid rgba(255, 107, 53, 0.1)',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            cursor: 'pointer'
                        }}
                        onClick={() => swipe.goToSlide(Math.max(0, swipe.currentIndex - 1))}
                        disabled={swipe.currentIndex === 0}
                        onMouseEnter={(e) => {
                            if (swipe.currentIndex > 0) {
                                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.3), 0 6px 15px rgba(255, 107, 53, 0.2)';
                                e.currentTarget.style.borderColor = '#FF6B35';
                                const icon = e.currentTarget.querySelector('i');
                                if (icon) {
                                    icon.style.color = 'white';
                                    icon.style.fontSize = '20px';
                                }
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
                            const icon = e.currentTarget.querySelector('i');
                            if (icon) {
                                icon.style.color = '#FF6B35';
                                icon.style.fontSize = '18px';
                            }
                        }}
                    >
                        <i className="ci-arrow-left" style={{
                            fontSize: '18px',
                            color: swipe.currentIndex === 0 ? '#dfe6e9' : '#FF6B35',
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold'
                        }}></i>
                    </button>

                    {/* Next Button */}
                    <button
                        className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center border-0"
                        style={{
                            zIndex: 10,
                            right: '-25px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)',
                            border: '2px solid rgba(255, 107, 53, 0.1)',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            cursor: 'pointer'
                        }}
                        onClick={() => swipe.goToSlide(Math.min(specialProducts.length - 1, swipe.currentIndex + 1))}
                        disabled={swipe.currentIndex === specialProducts.length - 1}
                        onMouseEnter={(e) => {
                            if (swipe.currentIndex < specialProducts.length - 1) {
                                e.currentTarget.style.transform = 'translate(50%, -50%) scale(1.1)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.3), 0 6px 15px rgba(255, 107, 53, 0.2)';
                                e.currentTarget.style.borderColor = '#FF6B35';
                                const icon = e.currentTarget.querySelector('i');
                                if (icon) {
                                    icon.style.color = 'white';
                                    icon.style.fontSize = '20px';
                                }
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(50%, -50%) scale(1)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.1)';
                            const icon = e.currentTarget.querySelector('i');
                            if (icon) {
                                icon.style.color = '#FF6B35';
                                icon.style.fontSize = '18px';
                            }
                        }}
                    >
                        <i className="ci-arrow-right" style={{
                            fontSize: '18px',
                            color: swipe.currentIndex === specialProducts.length - 1 ? '#dfe6e9' : '#FF6B35',
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold'
                        }}></i>
                    </button>

                    <div
                        className="overflow-hidden"
                        style={{ touchAction: 'pan-y' }}
                    >
                        <div
                            className="d-flex transition-transform"
                            style={{
                                width: `${specialProducts.length * 100}%`,
                                transform: `translateX(-${swipe.currentIndex * (100 / specialProducts.length)}%)`,
                                transition: swipe.isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                            onTouchStart={swipe.handleTouchStart}
                            onTouchMove={swipe.handleTouchMove}
                            onTouchEnd={swipe.handleTouchEnd}
                        >
                            {specialProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="px-2"
                                    style={{ width: `${100 / specialProducts.length}%` }}
                                >
                                    <SpecialProductCard product={product} handleAddToCart={handleAddToCart} addingId={addingId} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="d-flex justify-content-center mt-3 gap-2">
                    {specialProducts.map((_, index) => (
                        <button
                            key={index}
                            className="rounded-circle border-0"
                            style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: swipe.currentIndex === index ? '#FF6B35' : '#dfe6e9',
                                transition: 'background-color 0.3s ease',
                            }}
                            onClick={() => swipe.goToSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop Grid */}
            <div className="row g-4 mt-4 d-none d-md-flex">
                {specialProducts.map((product, idx) => (
                    <div key={product.id} className="col-lg-4 col-md-6" style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                    }}>
                        <SpecialProductCard product={product} handleAddToCart={handleAddToCart} addingId={addingId} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpecialProducts;
