import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { bankService, BankAccount } from '../services/bankService';
import { nigerianStates } from '../data/nigerianStates';
import { API_BASE_URL } from '../api/axios';

const Checkout: React.FC = () => {
    const { cart, refreshCart } = useCart();
    const items = cart?.items || [];
    const total = cart?.subtotal || 0;
    const { user } = useAuth();
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation

    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        phone: '',
        notes: ''
    });

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Calculate delivery fee
    useEffect(() => {
        const calculateFee = () => {
            if (total >= 50000) return 0;
            const state = formData.state.toLowerCase();
            if (!state) return 0; // Or default? Let's say 0 until selected
            if (state.includes('lagos')) return 1500;
            return 3500;
        };
        setDeliveryFee(calculateFee());
    }, [formData.state, total]);

    const finalTotal = total + deliveryFee;

    useEffect(() => {
        const loadBanks = async () => {
            try {
                const banks = await bankService.getActiveBanks();
                setBankAccounts(banks);
            } catch (err) {
                console.error("Failed to load banks", err);
                toast.error("Failed to load available banks");
            }
        };
        loadBanks();
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/signin', { state: { message: 'Please sign in to checkout.' } });
        } else if (items.length === 0 && !orderPlaced) {
            navigate('/cart');
        }
    }, [user, items, navigate, orderPlaced]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePhone = (phone: string) => {
        // Basic Nigeria phone validation: starts with 0 or +234, 10-14 digits
        return /^(0|\+234)\d{9,11}$/.test(phone);
    };

    const handlePlaceOrder = async () => {
        if (!selectedBankId) {
            toast.error("Please select a bank to make payment to.");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                delivery_address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zip_code: "000000", // Default for now
                    country: "Nigeria", // Fixed
                    phone: formData.phone // Added to notes or separate field if backend supports
                },
                payment_method: 'bank_transfer',
                notes: `Phone: ${formData.phone}. ${formData.notes}` // Appending phone to notes for now as backend might strict
            };

            const response = await axios.post(`${API_BASE_URL}/checkout/place-order`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrderPlaced(true);
            await refreshCart();

            // Show pending message as requested
            toast.success("Order Pending...", {
                icon: '⏳',
                duration: 2000
            });

            // Small delay to let user see the message
            setTimeout(() => {
                navigate('/order-confirmation', {
                    state: {
                        orderId: response.data.order_id, // Fixed: backend returns order_id not id
                        bank: bankAccounts.find(b => b.id === selectedBankId),
                        total: finalTotal
                    }
                });
            }, 1000);

        } catch (error: any) {
            console.error('Checkout error:', error);
            const msg = error.response?.data?.detail || "Failed to place order. Please try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const moveStep = (nextStep: number) => {
        if (nextStep === 2) {
            if (!formData.street || !formData.city || !formData.state || !formData.phone) {
                toast.error("Please fill in all address details.");
                return;
            }
            if (!validatePhone(formData.phone)) {
                toast.error("Please enter a valid Nigerian phone number.");
                return;
            }
        }
        setStep(nextStep);
    };

    const selectedBank = bankAccounts.find(b => b.id === selectedBankId);

    // Light Theme Styles
    const containerStyle = {
        background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)',
        minHeight: '100vh',
        color: '#2d3436',
        fontFamily: "'Inter', sans-serif"
    };

    // Disabled this check to prevent premature unmount during redirect flow
    // if (items.length === 0) return null; 

    return (
        <div style={containerStyle} className="py-5">
            <div className="container">
                <div className="row g-5">
                    {/* Left Column: Flow */}
                    <div className="col-lg-8">
                        {/* Progress */}
                        <div className="d-flex align-items-center mb-5 px-3">
                            <div className={`d-flex align-items-center justify-content-center rounded-circle fw-bold ${step >= 1 ? 'bg-primary text-white shadow' : 'bg-secondary text-white opacity-50'}`} style={{ width: 40, height: 40, transition: 'all 0.3s' }}>1</div>
                            <div className="mx-2 flex-grow-1" style={{ height: 2, background: '#dee2e6' }}>
                                <div style={{ width: step >= 2 ? '100%' : '0%', height: '100%', background: '#fd7e14', transition: 'width 0.5s' }}></div>
                            </div>
                            <div className={`d-flex align-items-center justify-content-center rounded-circle fw-bold ${step >= 2 ? 'bg-primary text-white shadow' : 'bg-secondary text-white opacity-50'}`} style={{ width: 40, height: 40, transition: 'all 0.3s' }}>2</div>
                            <div className="mx-2 flex-grow-1" style={{ height: 2, background: '#dee2e6' }}>
                                <div style={{ width: step >= 3 ? '100%' : '0%', height: '100%', background: '#fd7e14', transition: 'width 0.5s' }}></div>
                            </div>
                            <div className={`d-flex align-items-center justify-content-center rounded-circle fw-bold ${step >= 3 ? 'bg-primary text-white shadow' : 'bg-secondary text-white opacity-50'}`} style={{ width: 40, height: 40, transition: 'all 0.3s' }}>3</div>
                        </div>

                        <div className="bg-white rounded-4 shadow-sm p-4 border" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                            {step === 1 && (
                                <div className="animate__animated animate__fadeIn">
                                    <h3 className="mb-4 fw-bold text-dark">Delivery Details</h3>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">Street Address</label>
                                            <input type="text" className="form-control form-control-lg bg-light border-0" name="street" value={formData.street} onChange={handleInputChange} placeholder="e.g. 12 Adeola Odeku St" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">City</label>
                                            <input type="text" className="form-control form-control-lg bg-light border-0" name="city" value={formData.city} onChange={handleInputChange} placeholder="e.g. Victoria Island" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">State</label>
                                            <select className="form-select form-select-lg bg-light border-0" name="state" value={formData.state} onChange={handleInputChange}>
                                                <option value="">Select State</option>
                                                {nigerianStates.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label fw-semibold text-secondary small text-uppercase ls-1">Phone Number</label>
                                            <input type="tel" className="form-control form-control-lg bg-light border-0" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. 08012345678" />
                                        </div>
                                        <div className="col-12 mt-4">
                                            <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm" onClick={() => moveStep(2)}>
                                                Continue to Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="animate__animated animate__fadeIn">
                                    <h3 className="mb-4 fw-bold text-dark">Select Bank for Transfer</h3>
                                    <p className="text-muted mb-4">You will make a direct transfer to the selected account.</p>

                                    <div className="d-flex flex-column gap-3">
                                        {bankAccounts.map(bank => (
                                            <div
                                                key={bank.id}
                                                onClick={() => setSelectedBankId(bank.id)}
                                                className={`card cursor-pointer border-0 rounded-4 transition-all ${selectedBankId === bank.id ? 'bg-white shadow-lg ring-2 ring-primary' : 'bg-white shadow-sm hover-shadow'}`}
                                                style={{
                                                    transition: 'all 0.2s',
                                                    border: selectedBankId === bank.id ? '2px solid #fd7e14' : '1px solid #f1f1f1',
                                                    transform: selectedBankId === bank.id ? 'scale(1.02)' : 'none'
                                                }}
                                            >
                                                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <div className={`rounded-circle p-3 me-4 d-flex align-items-center justify-content-center ${selectedBankId === bank.id ? 'bg-primary text-white' : 'bg-light text-secondary'}`} style={{ width: 64, height: 64, transition: 'all 0.3s' }}>
                                                            <i className="bi bi-bank fs-3"></i>
                                                        </div>
                                                        <div>
                                                            <h5 className="mb-1 fw-bold text-dark">{bank.bank_name}</h5>
                                                            <div className="text-secondary small text-uppercase fw-bold ls-1 mb-1">{bank.account_name}</div>
                                                            <div className="d-flex align-items-center">
                                                                <span className="font-monospace fs-5 fw-bold text-dark me-2">{bank.account_number}</span>
                                                                <button
                                                                    className="btn btn-sm btn-light border-0 py-0 px-2 text-muted"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigator.clipboard.writeText(bank.account_number);
                                                                        toast.success("Copied!");
                                                                    }}
                                                                >
                                                                    <i className="bi bi-clipboard"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-none d-md-block">
                                                        {selectedBankId === bank.id ? (
                                                            <i className="bi bi-check-circle-fill text-primary display-6 animate__animated animate__zoomIn"></i>
                                                        ) : (
                                                            <i className="bi bi-circle text-muted fs-3"></i>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {bankAccounts.length === 0 && (
                                        <div className="alert alert-warning mt-3">No active bank accounts available. Please contact support.</div>
                                    )}

                                    <div className="mt-4 pt-3 border-top d-flex justify-content-between">
                                        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setStep(1)}>Back</button>
                                        <button className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm" onClick={() => moveStep(3)} disabled={!selectedBankId}>
                                            Review & Pay
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="animate__animated animate__fadeIn">
                                    <h3 className="mb-4 fw-bold text-dark">Review Order</h3>

                                    <div className="mb-4 p-4 rounded-4 bg-light border border-light-subtle">
                                        <h6 className="text-secondary text-uppercase small fw-bold ls-1 mb-3">Delivery To</h6>
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                                            <div>
                                                <p className="mb-0 fw-semibold text-dark fs-5">{formData.street}, {formData.city}</p>
                                                <p className="mb-0 text-muted small">{formData.state}, Nigeria</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mt-3">
                                            <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                                            <p className="mb-0 fw-semibold text-dark">{formData.phone}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4 p-4 rounded-4 bg-light border border-light-subtle">
                                        <h6 className="text-secondary text-uppercase small fw-bold ls-1 mb-3">Payment Method</h6>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-white p-3 rounded-circle shadow-sm me-3">
                                                <i className="bi bi-bank2 text-primary fs-4"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">Bank Transfer</div>
                                                <div className="small text-muted">To: {selectedBank?.bank_name}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-top d-flex justify-content-between">
                                        <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setStep(2)}>Back</button>
                                        <button
                                            className="btn btn-success rounded-pill px-5 fw-bold shadow-lg"
                                            onClick={handlePlaceOrder}
                                            disabled={loading}
                                            style={{ transform: 'scale(1.05)' }}
                                        >
                                            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-lock-fill me-2"></i>}
                                            Pay ₦{finalTotal.toLocaleString()}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="col-lg-4">
                        <div className="bg-white rounded-4 shadow-sm p-4 border position-sticky" style={{ top: '100px', borderColor: 'rgba(0,0,0,0.05)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                                <h5 className="mb-0 fw-bold text-dark">Order Summary</h5>
                                <span className="badge bg-primary rounded-pill">{cart?.total_items} Items</span>
                            </div>

                            <div className="d-flex flex-column gap-3 mb-4">
                                {items.map(item => (
                                    <div key={item.id} className="d-flex align-items-center">
                                        <div
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 12,
                                                backgroundColor: '#f8f9fa',
                                                backgroundImage: `url(${item.product?.image_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                            className="me-3 shadow-sm flex-shrink-0"
                                        ></div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="fw-bold text-dark text-truncate">{item.product?.name}</div>
                                            <div className="text-muted small">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="fw-bold text-primary">₦{(item.price_at_addition * item.quantity).toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-3 border-top border-dashed">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-semibold">₦{total.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Delivery</span>
                                    <span className={deliveryFee === 0 ? "text-success fw-bold" : "text-dark"}>
                                        {deliveryFee === 0 ? "Free" : `₦${deliveryFee.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between fs-4 fw-bold mt-3 pt-3 border-top">
                                    <span className="text-dark">Total</span>
                                    <span className="text-primary">₦{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-top">
                                <div className="d-flex align-items-center text-muted small">
                                    <i className="bi bi-shield-check fs-4 me-2 text-success"></i>
                                    <span>Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Checkout;
