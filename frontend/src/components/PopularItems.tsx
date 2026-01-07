import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTouchSwipe } from '../hooks/useTouchSwipe';
import { productService, Product as ApiProduct } from '../services/productService';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string | null;
  rating: number;
  reviews: number;
  stock_quantity?: number;
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
          ₦{product.price.toLocaleString()}
        </span>
        <div className="d-flex text-warning">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`ci-star${i < Math.floor(product.rating) ? '-filled' : ''} fs-xs`} style={{ marginRight: '2px' }}></i>
          ))}
        </div>
        <span className="text-muted fs-xs ms-1">({product.reviews} reviews)</span>
      </div>

      {/* Stock Status */}
      <div className="text-center mb-2">
        {(product.stock_quantity !== undefined && product.stock_quantity > 0) ? (
          <span className="badge bg-success" style={{ fontSize: '11px' }}>
            <i className="ci-package me-1"></i>
            {product.stock_quantity} in stock
          </span>
        ) : product.stock_quantity === 0 ? (
          <span className="badge bg-danger" style={{ fontSize: '11px' }}>
            <i className="ci-package me-1"></i>
            Out of stock
          </span>
        ) : (
          <span className="badge bg-success" style={{ fontSize: '11px' }}>
            <i className="ci-package me-1"></i>
            25 in stock
          </span>
        )}
      </div>

      <div className="mt-auto">
        {/* Add to Cart Button */}
        <button
          className="btn w-100 mb-3 fw-bold"
          style={{
            background: (product.stock_quantity === undefined || product.stock_quantity > 0) ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : '#6c757d',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            fontSize: '14px',
            boxShadow: (product.stock_quantity === undefined || product.stock_quantity > 0) ? '0 4px 6px rgba(255, 107, 53, 0.2)' : 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            opacity: addingId === product.id ? 0.8 : 1
          }}
          disabled={addingId === product.id || (product.stock_quantity !== undefined && product.stock_quantity === 0)}
          onClick={(product.stock_quantity === undefined || product.stock_quantity > 0) ? (e) => handleAddToCart(e, product.id) : undefined}
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
          ) : (product.stock_quantity !== undefined && product.stock_quantity === 0) ? (
            <>
              <i className="ci-package me-2"></i>
              Out of Stock
            </>
          ) : (
            <>
              <i className="ci-cart me-2"></i>
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

const PopularItems: React.FC = () => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [addingId, setAddingId] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize swipe with items length (will update when items load)
  // We need to recreate swipe hook or update it when items change, 
  // but for now let's just pass items.length.
  // Note: useTouchSwipe might need to handle dynamic length updates.
  const swipe = useTouchSwipe(items.length);

  useEffect(() => {
    loadPopularItems();
  }, []);

  const loadPopularItems = async () => {
    try {
      // Import dynamically or assume it's available in context/imports
      // We need to import productService at the top
      const popularProducts: ApiProduct[] = await productService.getPopularProducts(8);

      // Transform API product to component format if needed, or just use it directly
      // The API returns Product interface which has image_url, name, price, etc.
      // The component expects 'image' property, API gives 'image_url'.
      const formattedItems = popularProducts.map((p: ApiProduct) => ({
        ...p,
        image: p.image_url || '/assets/img/placeholder.png',
        badge: p.is_popular ? 'Popular' : (p.is_special ? 'Special' : null),
        reviews: p.review_count || 0
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Failed to load popular items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
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

  if (items.length === 0) return null;

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
            onClick={() => swipe.goToSlide(Math.min(items.length - 1, swipe.currentIndex + 1))}
            disabled={swipe.currentIndex === items.length - 1}
          >
            <i className="ci-arrow-right" style={{ fontSize: '18px', color: swipe.currentIndex === items.length - 1 ? '#dfe6e9' : '#FF6B35' }}></i>
          </button>

          <div className="overflow-hidden" style={{ touchAction: 'pan-y' }}>
            <div
              className="d-flex transition-transform"
              style={{
                width: `${items.length * 100}%`,
                transform: `translateX(-${swipe.currentIndex * (100 / items.length)}%)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {items.map((product) => (
                <div key={product.id} className="px-2" style={{ width: `${100 / items.length}%` }}>
                  <ProductCard product={product} handleAddToCart={handleAddToCart} addingId={addingId} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="d-flex justify-content-center mt-3 gap-2">
          {items.map((_, idx) => (
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
          {items.map((product, index) => (
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
