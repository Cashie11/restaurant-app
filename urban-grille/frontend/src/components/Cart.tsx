import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();

    if (loading && !cart) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <i className="ci-shopping-cart fs-1 text-muted mb-3"></i>
                    <h3>Your cart is empty</h3>
                    <p className="text-muted">Add some delicious items to get started!</p>
                    <Link to="/" className="btn btn-primary mt-3">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            <div className="container py-5">
                <h2 className="mb-4">Shopping Cart</h2>

                <div className="row g-4">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                {cart.items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="border-bottom py-4 animate-slideInRight"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="row align-items-center hover-lift p-3 rounded-3 bg-white shadow-sm border">
                                            {/* Product Image & Info */}
                                            <div className="col-12 col-md-6 mb-3 mb-md-0">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        {item.product?.image_url ? (
                                                            <img
                                                                src={item.product.image_url}
                                                                alt={item.product.name}
                                                                className="rounded-3 shadow-sm"
                                                                style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <div className="rounded-3 bg-light d-flex align-items-center justify-content-center"
                                                                style={{ width: '90px', height: '90px' }}>
                                                                <i className="ci-image text-muted opacity-50 fs-4"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-1 fw-bold text-dark">{item.product?.name}</h6>
                                                        <div className="text-muted small mb-2">SKU: {item.product?.sku}</div>
                                                        <div className="text-primary fw-bold">₦{item.price_at_addition.toLocaleString()}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-6 col-md-3 d-flex justify-content-start justify-content-md-center">
                                                <div className="input-group input-group-sm shadow-sm rounded-pill overflow-hidden" style={{ width: '110px' }}>
                                                    <button
                                                        className="btn btn-light hover-scale border-0"
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        disabled={loading}
                                                    >
                                                        <i className="ci-minus fs-xs"></i>
                                                    </button>
                                                    <span className="form-control text-center border-0 bg-light fw-bold text-dark">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="btn btn-light hover-scale border-0"
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={loading}
                                                    >
                                                        <i className="ci-plus fs-xs"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total & Actions */}
                                            <div className="col-6 col-md-3">
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <span className="fw-bold fs-lg text-dark me-3">
                                                        ₦{(item.price_at_addition * item.quantity).toLocaleString()}
                                                    </span>
                                                    <button
                                                        className="btn btn-outline-danger btn-icon btn-sm rounded-circle d-flex align-items-center justify-content-center hover-scale shadow-sm border-0 bg-white"
                                                        onClick={() => removeItem(item.id)}
                                                        disabled={loading}
                                                        style={{ width: '36px', height: '36px', transition: 'all 0.2s' }}
                                                        title="Remove item"
                                                    >
                                                        <i className="ci-trash text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Cart Actions */}
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <Link to="/" className="btn btn-link text-decoration-none px-0">
                                        <i className="ci-arrow-left me-2"></i>
                                        Continue Shopping
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                        onClick={clearCart}
                                        disabled={loading}
                                    >
                                        <i className="ci-trash me-2"></i>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm sticky-top rounded-4" style={{ top: '100px', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
                            <div className="card-body p-4">
                                <h5 className="mb-4 fw-bold">Order Summary</h5>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Items ({cart.total_items})</span>
                                    <span>₦{cart.subtotal.toLocaleString()}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Delivery Fee</span>
                                    <span className="text-success fw-bold">Free</span>
                                </div>

                                <div className="border-top border-bottom py-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold fs-5">Total</span>
                                        <span className="fw-bold fs-4 text-primary">₦{cart.subtotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="btn btn-primary w-100 mb-3 py-3 rounded-pill shadow-sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                        border: 'none',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px'
                                    }}
                                >
                                    Proceed to Checkout
                                    <i className="ci-arrow-right ms-2"></i>
                                </Link>

                                <div className="text-center">
                                    <p className="small text-muted mb-0">
                                        <i className="ci-security-check me-1"></i>
                                        Secure Checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
