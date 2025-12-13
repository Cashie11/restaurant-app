import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTouchSwipe } from '../hooks/useTouchSwipe';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string | null;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  handleAddToCart: (e: React.MouseEvent, productId: number) => Promise<void>;
  addingId: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleAddToCart, addingId }) => (
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

    {/* Badge */}
    {product.badge && (
      <span
        className={`badge position-absolute top-0 start-0 m-3 shadow-sm ${product.badge === 'Popular' ? 'bg-danger' :
          product.badge === 'New' ? 'bg-success' : 'bg-primary'
          }`}
        style={{
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 20,
          animation: 'bounceIn 0.8s cubic-bezier(0.8, 0, 1, 1)'
        }}
      >
        {product.badge}
      </span>
    )}

    {/* Product Image Container */}
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
        Groceries
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
        <span className="fw-bold me-2" style={{ color: '#FF6B35', fontSize: '15px' }}>
          ${product.price.toFixed(2)}
        </span>
        <div className="d-flex text-warning">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`ci-star${i < Math.floor(product.rating) ? '-filled' : ''} fs-xs`} style={{ marginRight: '2px' }}></i>
          ))}
        </div>
        <span className="text-muted fs-xs ms-1">({product.reviews} reviews)</span>
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
              Add to Cart
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

const popularItems = [
  {
    id: 1,
    name: 'Muesli Fitness Energy, gluten free',
    price: 2.15,
    image: '/assets/img/shop/grocery/01.png',
    badge: null,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Fresh orange Klementina, Spain',
    price: 3.12,
    image: '/assets/img/shop/grocery/02.png',
    badge: 'Popular',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Pesto sauce Barilla with basil, Italy',
    price: 3.95,
    image: '/assets/img/shop/grocery/03.png',
    badge: null,
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: 'Organic eggs from home-grown chicken',
    price: 4.28,
    image: '/assets/img/shop/grocery/04.png',
    badge: 'New',
    rating: 5.0,
    reviews: 23
  },
  {
    id: 5,
    name: 'Fresh salmon fillet, Norway',
    price: 12.99,
    image: '/assets/img/shop/grocery/05.png',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 156
  },
  {
    id: 6,
    name: 'Coconut, Indonesia',
    price: 2.99,
    image: '/assets/img/shop/grocery/06.png',
    badge: null,
    rating: 4.6,
    reviews: 78
  },
  {
    id: 7,
    name: 'Italian pasta Barilla',
    price: 1.99,
    image: '/assets/img/shop/grocery/07.png',
    badge: null,
    rating: 4.8,
    reviews: 201
  },
  {
    id: 8,
    name: 'Corn oil refined Oleina',
    price: 4.50,
    image: '/assets/img/shop/grocery/08.png',
    badge: null,
    rating: 4.5,
    reviews: 93
  }
];

const PopularItems: React.FC = () => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [addingId, setAddingId] = useState<number | null>(null);
  const swipe = useTouchSwipe(popularItems.length);

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
    <div className="container pb-5 mb-2 mb-sm-3 mb-lg-4 mb-xl-5">
      {/* Mobile Carousel */}
      <div className="d-md-none">
        <div className="text-center mb-4">
          <h2 className="h4 fw-bold mb-2">Popular Dishes</h2>
          <p className="text-muted small">Swipe to discover more</p>
        </div>

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
            onClick={() => swipe.goToSlide(Math.min(popularItems.length - 1, swipe.currentIndex + 1))}
            disabled={swipe.currentIndex === popularItems.length - 1}
            onMouseEnter={(e) => {
              if (swipe.currentIndex < popularItems.length - 1) {
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
              color: swipe.currentIndex === popularItems.length - 1 ? '#dfe6e9' : '#FF6B35',
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
                width: `${popularItems.length * 100}%`,
                transform: `translateX(-${swipe.currentIndex * (100 / popularItems.length)}%)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {popularItems.map((product) => (
                <div
                  key={product.id}
                  className="px-2"
                  style={{ width: `${100 / popularItems.length}%` }}
                >
                  <ProductCard product={product} handleAddToCart={handleAddToCart} addingId={addingId} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="d-flex justify-content-center mt-3 gap-2">
          {popularItems.map((_, idx) => (
            <button
              key={idx}
              className="rounded-circle border-0"
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: swipe.currentIndex === idx ? '#FF6B35' : '#dfe6e9',
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => swipe.goToSlide(idx)}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="d-none d-md-block">
        <h2 className="h3 text-center mb-4">Popular Dishes</h2>
        <div className="row g-4">
          {popularItems.map((product, index) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6" style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}>
              <ProductCard product={product} handleAddToCart={handleAddToCart} addingId={addingId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularItems;
