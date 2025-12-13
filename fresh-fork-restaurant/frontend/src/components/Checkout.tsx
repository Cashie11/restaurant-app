import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Checkout: React.FC = () => {
    const { cart, refreshCart } = useCart();
    const items = cart?.items || [];
    const total = cart?.subtotal || 0;
    const { user } = useAuth();
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'US',
        payment_method: 'card', // card, paypal, cash
        notes: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/signin', { state: { message: 'Please sign in to checkout.' } });
        } else if (items.length === 0) {
            navigate('/cart');
        }
    }, [user, items, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                delivery_address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zip_code: formData.zip_code,
                    country: formData.country
                },
                payment_method: formData.payment_method,
                notes: formData.notes
            };

            await axios.post('http://localhost:8000/api/checkout/place-order', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh cart (which should be empty now)
            await refreshCart();

            // Redirect to success page (or show success message)
            alert('Order placed successfully! Check your email for confirmation.');
            navigate('/dashboard'); // Or a dedicated success page
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h1 className="mb-4">Checkout</h1>

                <div className="row">
                    {/* Left Column: Forms */}
                    <div className="col-lg-8">
                        {/* Progress Steps */}
                        <div className="d-flex justify-content-between mb-4 position-relative">
                            <div className="progress position-absolute w-100" style={{ height: '2px', top: '50%', transform: 'translateY(-50%)', zIndex: 0 }}>
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
                            </div>
                            <button onClick={() => setStep(1)} className={`btn btn-sm rounded-circle position-relative z-1 ${step >= 1 ? 'btn-success' : 'btn-secondary'}`} style={{ width: '40px', height: '40px' }}>1</button>
                            <button onClick={() => setStep(2)} className={`btn btn-sm rounded-circle position-relative z-1 ${step >= 2 ? 'btn-success' : 'btn-secondary'}`} style={{ width: '40px', height: '40px' }} disabled={step < 2}>2</button>
                            <button onClick={() => setStep(3)} className={`btn btn-sm rounded-circle position-relative z-1 ${step >= 3 ? 'btn-success' : 'btn-secondary'}`} style={{ width: '40px', height: '40px' }} disabled={step < 3}>3</button>
                        </div>

                        <div className="card border-0 shadow-sm p-4">
                            {step === 1 && (
                                <div>
                                    <h4 className="mb-3">Shipping Address</h4>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">Street Address</label>
                                            <input type="text" className="form-control" name="street" value={formData.street} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">State / Province</label>
                                            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Zip Code</label>
                                            <input type="text" className="form-control" name="zip_code" value={formData.zip_code} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Country</label>
                                            <select className="form-select" name="country" value={formData.country} onChange={handleInputChange}>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="UK">United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-end">
                                        <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!formData.street || !formData.city || !formData.zip_code}>
                                            Continue to Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h4 className="mb-3">Payment Method</h4>
                                    <div className="mb-3">
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="payment_method" id="card" value="card" checked={formData.payment_method === 'card'} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="card">Credit / Debit Card</label>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input" type="radio" name="payment_method" id="paypal" value="paypal" checked={formData.payment_method === 'paypal'} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="payment_method" id="cash" value="cash" checked={formData.payment_method === 'cash'} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="cash">Cash on Delivery</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Order Notes (Optional)</label>
                                        <textarea className="form-control" name="notes" rows={2} value={formData.notes} onChange={handleInputChange}></textarea>
                                    </div>

                                    <div className="mt-4 d-flex justify-content-between">
                                        <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                                        <button className="btn btn-primary" onClick={() => setStep(3)}>Review Order</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <h4 className="mb-3">Review Order</h4>
                                    <div className="mb-3 p-3 bg-light rounded">
                                        <p className="mb-1"><strong>Ship To:</strong></p>
                                        <p className="mb-0">{formData.street}, {formData.city}, {formData.state} {formData.zip_code}, {formData.country}</p>
                                    </div>
                                    <div className="mb-3 p-3 bg-light rounded">
                                        <p className="mb-1"><strong>Payment Method:</strong></p>
                                        <p className="mb-0 text-capitalize">{formData.payment_method}</p>
                                    </div>

                                    <div className="mt-4 d-flex justify-content-between">
                                        <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                                        <button className="btn btn-success btn-lg" onClick={handlePlaceOrder} disabled={loading}>
                                            {loading ? 'Processing...' : `Place Order ($${total.toFixed(2)})`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0 py-3">
                                <h5 className="mb-0">Order Summary</h5>
                            </div>
                            <div className="card-body">
                                {items.map((item) => {
                                    const imageUrl = item.product?.image_url;
                                    const productName = item.product?.name ?? 'Product';
                                    const lineTotal = item.price_at_addition * item.quantity;

                                    return (
                                        <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="bg-light rounded me-2"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                ></div>
                                                <div>
                                                    <h6 className="mb-0 small">{productName}</h6>
                                                    <small className="text-muted">Qty: {item.quantity}</small>
                                                </div>
                                            </div>
                                            <span>${lineTotal.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Shipping</span>
                                    <span className="text-success">Free</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
