
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTouchSwipe } from '../hooks/useTouchSwipe';
import { productService, Product } from '../services/productService';

interface Offer {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    stock_quantity?: number;
}

interface OfferCardProps {
    offer: Offer;
    handleAddToCart: (e: React.MouseEvent, productId: number) => Promise<void>;
    addingId: number | null;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, handleAddToCart, addingId }) => (
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

        {/* Discount Badge */}
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
                backgroundColor: '#d63031',
                color: 'white',
                animation: 'bounceIn 0.8s cubic-bezier(0.8, 0, 1, 1)'
            }}
        >
            -{offer.discount}%
        </span>

        {/* Wishlist Button */}
        <button
            className="btn-wishlist position-absolute top-0 end-0 m-3"
            type="button"
            style={{
                zIndex: 20,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                borderRadius: '12px',
                width: '40px',
                height: '40px',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF6B35';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                e.currentTarget.style.borderColor = '#FF6B35';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.color = '#2d3436';
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
            }}
        >
            <i className="ci-heart fs-sm"></i>
        </button>

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
                src={offer.image}
                alt={offer.name}
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
                {offer.category}
            </p>

            <h6 className="mb-3 product-title" style={{
                fontSize: '16px',
                fontWeight: 700,
                minHeight: '48px',
                lineHeight: '1.5',
                color: '#2d3436',
                transition: 'color 0.2s'
            }}>
                {offer.name}
            </h6>

            {/* Rating */}
            <div className="d-flex align-items-center justify-content-center mb-3">
                <div className="d-flex text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ci-star${i < Math.floor(offer.rating) ? '-filled' : ''} fs-xs`} style={{ marginRight: '2px' }}></i>
                    ))}
                </div>
                <span className="text-muted fs-xs fw-medium">({offer.reviews})</span>
            </div>

            {/* Price */}
            <div className="mb-4 d-flex align-items-center justify-content-center gap-2">
                <span className="fw-bolder" style={{
                    fontSize: '24px',
                    color: '#FF6B35',
                    letterSpacing: '-0.5px'
                }}>
                    ${offer.price.toFixed(2)}
                </span>
                <del className="text-muted fw-normal" style={{ fontSize: '15px' }}>
                    ${offer.originalPrice.toFixed(2)}
                </del>
            </div>

            {/* Savings Badge */}
            <div className="mb-3">
                <span className="fw-bold" style={{ color: '#00b894', fontSize: '13px', background: 'rgba(0, 184, 148, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                    Save ${(offer.originalPrice - offer.price).toFixed(2)}!
                </span>
            </div>

            {/* Stock Status */}
            <div className="text-center mb-2">
                <span className="badge bg-success" style={{ fontSize: '11px' }}>
                    <i className="ci-package me-1"></i>
                    {offer.stock_quantity || 50} in stock
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
                        opacity: addingId === offer.id ? 0.8 : 1
                    }}
                    disabled={addingId === offer.id}
                    onClick={(e) => handleAddToCart(e, offer.id)}
                    onMouseEnter={(e) => {
                        if (addingId !== offer.id) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px rgba(255, 107, 53, 0.3)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (addingId !== offer.id) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 107, 53, 0.2)';
                        }
                    }}
                >
                    {addingId === offer.id ? (
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

const SpecialOffers: React.FC = () => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [addingId, setAddingId] = useState<number | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize swipe with items length
    const swipe = useTouchSwipe(offers.length);

    useEffect(() => {
        loadOffers();
    }, []);

    const loadOffers = async () => {
        try {
            // Import dynamically or assume it's available in context/imports
            const offerProducts: Product[] = await productService.getOfferProducts(6);

            // Transform API product to component Offer interface
            const formattedOffers = offerProducts.map((p: Product) => {
                const discount = p.discount_percentage || 0;
                // Assuming p.price is the SELLING price (stored in DB as the price to charge)
                // If DB stores Original Price, then selling price = p.price * (1 - discount/100).
                // Let's assume DB stores the reference price (Original).
                // Wait, if I add to cart, it uses p.price. So p.price MUST be the selling price.
                // But typically e-commerce stores base price and applies discount.
                // Let's check Cart logic... Cart uses p.price.
                // So p.price is the price USER PAYS.
                // Then Original Price = p.price / (1 - discount/100).

                // However, to be safe and avoid division by zero:
                const originalPrice = discount > 0
                    ? p.price / (1 - discount / 100)
                    : p.price;

                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    originalPrice: originalPrice,
                    discount: discount,
                    image: p.image_url || '/assets/img/placeholder.png',
                    category: p.category,
                    rating: p.rating,
                    reviews: p.review_count,
                    stock_quantity: p.stock_quantity
                };
            });

            setOffers(formattedOffers);
        } catch (error) {
            console.error('Failed to load special offers:', error);
        } finally {
            setLoading(false);
        }
    };

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
            toast.success('Item added to cart successfully!');
        } catch (error: any) {
            console.error('Failed to add item:', error);
            const msg = error.response?.data?.detail || error.message || "Failed to add item to cart";
            toast.error(`Error: ${msg}`);
        } finally {
            setAddingId(null);
        }
    };

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
    }

    if (offers.length === 0) return null;

    return (
        <section className="container py-5">
            {/* Header Section */}
            <div className="text-center mb-5" style={{
                animation: 'fadeInDown 0.6s ease-out'
            }}>
                <div className="d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill mb-3" style={{
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    <i className="ci-percent text-danger me-2"></i>
                    <span className="text-uppercase fw-semibold" style={{ fontSize: '12px', letterSpacing: '1px', color: '#FF6B35' }}>
                        LIMITED TIME
                    </span>
                </div>
                <h2 className="display-6 fw-bold mb-3">Special Offers</h2>
                <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Amazing deals you don't want to miss - save big on quality products
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
                    >
                        <i className="ci-arrow-left" style={{ fontSize: '18px', color: swipe.currentIndex === 0 ? '#dfe6e9' : '#FF6B35' }}></i>
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
                        onClick={() => swipe.goToSlide(Math.min(offers.length - 1, swipe.currentIndex + 1))}
                        disabled={swipe.currentIndex === offers.length - 1}
                    >
                        <i className="ci-arrow-right" style={{ fontSize: '18px', color: swipe.currentIndex === offers.length - 1 ? '#dfe6e9' : '#FF6B35' }}></i>
                    </button>

                    <div className="overflow-hidden" style={{ touchAction: 'pan-y' }}>
                        <div
                            className="d-flex transition-transform"
                            style={{
                                width: `${offers.length * 100}%`,
                                transform: `translateX(-${swipe.currentIndex * (100 / offers.length)}%)`,
                                transition: swipe.isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                            onTouchStart={swipe.handleTouchStart}
                            onTouchMove={swipe.handleTouchMove}
                            onTouchEnd={swipe.handleTouchEnd}
                        >
                            {offers.map((offer) => (
                                <div key={offer.id} className="px-2" style={{ width: `${100 / offers.length}%` }}>
                                    <OfferCard offer={offer} handleAddToCart={handleAddToCart} addingId={addingId} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="d-flex justify-content-center mt-3 gap-2">
                    {offers.map((_, index) => (
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
                {offers.map((offer, idx) => (
                    <div key={offer.id} className="col-lg-4 col-md-6" style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                    }}>
                        <OfferCard offer={offer} handleAddToCart={handleAddToCart} addingId={addingId} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SpecialOffers;
