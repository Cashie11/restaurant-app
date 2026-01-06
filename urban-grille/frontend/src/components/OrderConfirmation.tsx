import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BankAccount } from '../services/bankService';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

interface LocationState {
    orderId: number;
    bank: BankAccount;
    total: number;
    status?: string;
    cancellation_reason?: string;
}

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = location.state as LocationState;
    const [showConfetti, setShowConfetti] = useState(true);

    // State to hold live order data, initialized with passed params
    const [orderData, setOrderData] = useState<any>(params || {});

    const { orderId, bank, total, status, cancellation_reason } = orderData;
    const isCancelled = status?.toLowerCase() === 'cancelled';

    // Redirect if no order ID known initially
    useEffect(() => {
        if (!params?.orderId) {
            navigate('/');
        }
    }, [params, navigate]);

    // Polling for live status updates
    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const updatedOrder = await orderService.getOrder(orderId);
                // Merge new data, preserving bank info if missing in short response
                setOrderData((prev: any) => ({
                    ...prev,
                    ...updatedOrder,
                    // If backend response structure differs, might need mapping. 
                    // Assuming updatedOrder has 'status', 'cancellation_reason'
                    status: updatedOrder.status,
                    cancellation_reason: updatedOrder.cancellation_reason
                }));
            } catch (error) {
                console.error("Failed to poll order status", error);
            }
        };

        // Initial fetch
        fetchOrder();

        // Poll every 5 seconds
        const interval = setInterval(fetchOrder, 5000);

        return () => clearInterval(interval);
    }, [orderId]);


    // Hide confetti logic
    useEffect(() => {
        if (!isCancelled) {
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        } else {
            setShowConfetti(false);
        }
    }, [isCancelled]);

    if (!orderId) return null;

    // Helper to determine step status based on backend status string
    const getStepStatus = (stepLabel: string) => {
        const currentStatusRaw = status?.toLowerCase() || 'pending';
        // Normalize synonyms
        const currentStatus = currentStatusRaw === 'on_route' ? 'delivering' : currentStatusRaw;

        // Define status hierarchy
        const statusRanks: { [key: string]: number } = {
            'pending': 0,
            'confirmed': 1,
            'preparing': 2,
            'delivering': 3,
            'delivered': 4,
            'completed': 4
        };

        const currentRank = statusRanks[currentStatus] ?? 0;

        switch (stepLabel) {
            case 'Order Placed':
                return { completed: true, active: true };

            case 'Payment Verification':
                // Active during Pending (0). Completed for Confirmed (1) and above.
                if (currentRank >= 1) return { completed: true, active: false };
                return { completed: false, active: true, processing: true };

            case 'Preparing':
                // Active during Confirmed (1) and Preparing (2). Completed for Delivering (3) and above.
                if (currentRank >= 3) return { completed: true, active: false };
                if (currentRank >= 1) return { completed: false, active: true, processing: true };
                return { completed: false, active: false };

            case 'On Route':
                // Active during Delivering (3). Completed for Delivered (4).
                if (currentRank >= 4) return { completed: true, active: false };
                if (currentRank === 3) return { completed: false, active: true, processing: true };
                return { completed: false, active: false };

            case 'Delivered':
                // Active/Completed when Delivered (4).
                if (currentRank >= 4) return { completed: true, active: true };
                return { completed: false, active: false };

            default:
                return { completed: false, active: false };
        }
    };

    // Steps for the timeline
    const steps = [
        { label: 'Order Placed', time: 'Just now' },
        { label: 'Payment Verification', time: 'Pending Approval' },
        { label: 'Preparing', time: 'Est. 20 mins' },
        { label: 'On Route', time: '-' },
        { label: 'Delivered', time: '-' },
    ].map(step => ({
        ...step,
        ...getStepStatus(step.label)
    }));

    if (isCancelled) {
        return (
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    {/* Cancelled Header */}
                    <div className="text-center mb-5 animate__animated animate__fadeInDown">
                        <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-danger text-white rounded-circle shadow-lg" style={{ width: '80px', height: '80px' }}>
                            <i className="bi bi-x-lg fs-1"></i>
                        </div>
                        <h1 className="fw-bold text-dark mb-2">Order Cancelled</h1>
                        <p className="text-muted fs-5">Your order #{orderId} has been cancelled.</p>
                    </div>

                    {/* Cancellation Info Card */}
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4 animate__animated animate__fadeInUp bg-white">
                        <div className="card-header bg-danger-subtle border-bottom border-danger-subtle p-4">
                            <h5 className="fw-bold mb-0 text-danger-emphasis">Cancellation Details</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="alert alert-light border-0 d-flex align-items-start mb-0">
                                <i className="bi bi-info-circle-fill text-danger me-3 fs-4"></i>
                                <div>
                                    <h6 className="fw-bold text-dark mb-1">Reason for Cancellation</h6>
                                    <p className="text-muted mb-0">
                                        {cancellation_reason || "No specific reason provided. Please contact support for more details."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-3 justify-content-center animate__animated animate__fadeInUp animate__delay-1s">
                        <Link to="/menu" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm flex-grow-1">
                            Browse Menu
                        </Link>
                        <Link to="/dashboard" className="btn btn-outline-secondary rounded-pill px-4 py-3 fw-bold">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, #fdfbf7 0%, #fff0e6 100%)' }}>

            <div className="container" style={{ maxWidth: '600px' }}>
                {/* Success Header */}
                <div className="text-center mb-5 animate__animated animate__fadeInDown">
                    <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle shadow-lg" style={{ width: '80px', height: '80px' }}>
                        <i className="bi bi-check-lg fs-1"></i>
                    </div>
                    <h1 className="fw-bold text-dark mb-2">Order Receipt</h1>
                    <p className="text-muted fs-5">
                        Order #{orderId} — <span className={`badge ${status === 'Pending' ? 'bg-warning' : 'bg-success'} text-dark`}>{status || 'Pending'}</span>
                    </p>
                </div>

                {/* Tracking Card */}
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4 animate__animated animate__fadeInUp bg-white">
                    <div className="card-header bg-white border-bottom border-light p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0 text-dark">Order Status</h5>
                            <span className={`badge ${status === 'Pending' ? 'bg-warning' : 'bg-primary'} text-dark border border-warning-subtle px-3 py-2 rounded-pill`}>
                                {status === 'Pending' && <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>}
                                {status === 'delivering' ? 'On Route' : (status?.replace('_', ' ') || 'Awaiting Approval')}
                            </span>
                        </div>
                    </div>
                    <div className="card-body p-4">
                        {/* Timeline */}
                        <div className="position-relative ps-4 border-start border-2 border-light ms-2 my-2">
                            {steps.map((step, index) => (
                                <div key={index} className="mb-4 position-relative">
                                    <div className={`position-absolute top-0 start-0 translate-middle rounded-circle border border-4 border-white shadow-sm d-flex align-items-center justify-content-center ${step.completed ? 'bg-success text-white' : step.processing ? 'bg-warning text-white' : 'bg-light text-muted'}`}
                                        style={{ width: '32px', height: '32px', left: '-2px' }}>
                                        {step.completed ? <i className="bi bi-check-lg small"></i> : step.processing ? <i className="bi bi-hourglass-split small"></i> : <i className="bi bi-circle small"></i>}
                                    </div>
                                    <div className="ps-3">
                                        <div className={`fw-bold ${step.active ? 'text-dark' : 'text-muted'}`}>{step.label}</div>
                                        <div className="small text-muted">{step.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Receipt Card */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 animate__animated animate__fadeInUp animate__delay-1s bg-white">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary-subtle text-primary p-2 rounded-circle me-3">
                                <i className="bi bi-receipt fs-4"></i>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">Payment Information</h6>
                                <div className="small text-muted">Amount due for order</div>
                            </div>
                        </div>

                        <div className="p-3 rounded-3 bg-light border border-light-subtle mb-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted small">Total Verification Amount</span>
                                <span className="fw-bold text-dark">₦{total?.toFixed(2)}</span>
                            </div>
                            <hr className="my-2 border-light-subtle" />
                            {bank ? (
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Bank Name</div>
                                            <div className="fw-bold text-dark">{bank.bank_name}</div>
                                        </div>
                                        <div>
                                            <div className="small text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Account No.</div>
                                            <div className="fw-bold text-dark font-monospace fs-5">{bank.account_number}</div>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm rounded-pill" onClick={() => { navigator.clipboard.writeText(bank.account_number); }}>
                                        Copy
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center text-muted small">
                                    Bank details fetched with order...
                                </div>
                            )}
                        </div>
                        <div className="alert alert-info d-flex align-items-start small border-0 bg-info-subtle text-info-emphasis rounded-3">
                            <i className="bi bi-info-circle-fill me-2 mt-1"></i>
                            <div>
                                Your order will be processed immediately after your payment of <strong>₦{total?.toFixed(2)}</strong> is confirmed by our admin.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-3 justify-content-center animate__animated animate__fadeInUp animate__delay-1s">
                    <Link to="/dashboard" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm flex-grow-1">
                        Track Order
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary rounded-pill px-4 py-3 fw-bold">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
