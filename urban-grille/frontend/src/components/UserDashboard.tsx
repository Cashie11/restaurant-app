import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

const UserDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                toast.error('Failed to load your orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusBadge = (status: string) => {
        const statuses: any = {
            pending: { color: 'bg-warning-subtle text-warning-emphasis', icon: 'ci-time' },
            confirmed: { color: 'bg-primary-subtle text-primary-emphasis', icon: 'ci-thumb-up' },
            preparing: { color: 'bg-info-subtle text-info-emphasis', icon: 'ci-loading' },
            delivering: { color: 'bg-info-subtle text-info-emphasis', icon: 'ci-delivery' },
            delivered: { color: 'bg-success-subtle text-success-emphasis', icon: 'ci-check-circle' },
            cancelled: { color: 'bg-danger-subtle text-danger-emphasis', icon: 'ci-close-circle' }
        };
        const config = statuses[status] || statuses.pending;

        return (
            <span className={`badge ${config.color} rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2`}>
                <i className={config.icon}></i>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: 'ci-bag', color: 'text-primary', bg: 'bg-primary-subtle' },
        { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: 'ci-time', color: 'text-warning', bg: 'bg-warning-subtle' },
        { label: 'Completed', value: orders.filter(o => o.status === 'delivered').length, icon: 'ci-check', color: 'text-success', bg: 'bg-success-subtle' }
    ];

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
                            <div className="card-body p-4 text-center">
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold display-5"
                                        style={{ width: '80px', height: '80px' }}>
                                        {user?.first_name?.charAt(0) || 'U'}
                                    </div>
                                </div>
                                <h5 className="fw-bold mb-1">{user?.first_name} {user?.last_name}</h5>
                                <p className="text-muted small mb-4">{user?.email}</p>

                                <div className="d-grid gap-2">
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-light text-start'} d-flex align-items-center gap-2 rounded-3 py-2 px-3`}
                                    >
                                        <i className="ci-bag"></i> My Orders
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-light text-start'} d-flex align-items-center gap-2 rounded-3 py-2 px-3`}
                                    >
                                        <i className="ci-user"></i> Profile Info
                                    </button>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="btn btn-outline-danger d-flex align-items-center gap-2 rounded-3 py-2 px-3 text-start">
                                            <i className="ci-settings"></i> Admin Panel
                                        </Link>
                                    )}
                                    <hr className="my-2" />
                                    <button onClick={logout} className="btn btn-link text-danger text-decoration-none d-flex align-items-center gap-2 px-3">
                                        <i className="ci-sign-out"></i> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h2 className="fw-bold mb-0">
                                {activeTab === 'orders' ? 'My Orders' : 'Profile Information'}
                            </h2>
                            {activeTab === 'orders' && orders.length > 0 && (
                                <button
                                    onClick={async () => {
                                        if (window.confirm('Are you sure you want to clear your order history?')) {
                                            try {
                                                await orderService.clearOrderHistory();
                                                setOrders([]);
                                                toast.success('Order history cleared');
                                            } catch (error) {
                                                console.error('Failed to clear history:', error);
                                                toast.error('Failed to clear history');
                                            }
                                        }
                                    }}
                                    className="btn btn-outline-danger rounded-pill px-4 ms-auto"
                                >
                                    <i className="ci-trash me-2"></i>Clear History
                                </button>
                            )}
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <span className="text-muted small">Welcome back!</span>
                        </div>

                        {activeTab === 'orders' ? (
                            <>
                                {/* Stats Row */}
                                <div className="row g-3 mb-4">
                                    {stats.map((stat, index) => (
                                        <div className="col-md-4" key={index}>
                                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p className="text-muted small fw-bold text-uppercase mb-1">{stat.label}</p>
                                                        <h2 className="mb-0 fw-bold">{stat.value}</h2>
                                                    </div>
                                                    <div className={`rounded-circle p-3 ${stat.bg} ${stat.color}`}>
                                                        <i className={`${stat.icon} fs-4`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Orders List */}
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                    {loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div className="text-center py-5">
                                            <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                                                <i className="ci-bag display-4 text-muted"></i>
                                            </div>
                                            <h5>No orders yet</h5>
                                            <p className="text-muted mb-4">Start exploring our menu today!</p>
                                            <Link to="/menu" className="btn btn-primary rounded-pill px-4">Browse Menu</Link>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Desktop Table View */}
                                            <div className="table-responsive d-none d-md-block">
                                                <table className="table table-hover align-middle mb-0">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th className="py-3 ps-4 border-0">Order ID</th>
                                                            <th className="py-3 border-0">Date</th>
                                                            <th className="py-3 border-0">Total</th>
                                                            <th className="py-3 border-0">Status</th>
                                                            <th className="py-3 border-0 text-end pe-4">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orders.map((order: any) => (
                                                            <React.Fragment key={order.id}>
                                                                <tr style={{ cursor: 'pointer' }}>
                                                                    <td className="ps-4 fw-semibold">#{order.id}</td>
                                                                    <td className="text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                                                                    <td className="fw-bold">₦{order.total_amount.toFixed(2)}</td>
                                                                    <td>{getStatusBadge(order.status)}</td>
                                                                    <td className="text-end pe-4">
                                                                        <Link to="/order-confirmation"
                                                                            state={{
                                                                                orderId: order.id,
                                                                                bank: {},
                                                                                total: order.total_amount,
                                                                                status: order.status,
                                                                                cancellation_reason: order.cancellation_reason
                                                                            }}
                                                                            className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                                                            Details
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                {order.status === 'cancelled' && order.cancellation_reason && (
                                                                    <tr>
                                                                        <td colSpan={5} className="px-4 pb-3 pt-0 border-0">
                                                                            <div className="alert alert-danger mb-0 d-flex align-items-center gap-2 mt-2 py-2">
                                                                                <i className="ci-close-circle fs-5"></i>
                                                                                <small>
                                                                                    <strong>Cancellation Reason:</strong> {order.cancellation_reason}
                                                                                </small>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Mobile Card View */}
                                            <div className="d-md-none">
                                                {orders.map((order: any) => (
                                                    <div key={order.id} className="border-bottom p-3">
                                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                                            <div>
                                                                <span className="fw-bold text-dark">Order #{order.id}</span>
                                                                <div className="text-muted small">{new Date(order.created_at).toLocaleDateString()}</div>
                                                            </div>
                                                            {getStatusBadge(order.status)}
                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <div>
                                                                <span className="text-muted small text-uppercase">Total Amount</span>
                                                                <div className="fw-bold fs-5">₦{order.total_amount.toFixed(2)}</div>
                                                            </div>
                                                            <Link to="/order-confirmation"
                                                                state={{
                                                                    orderId: order.id,
                                                                    bank: {},
                                                                    total: order.total_amount,
                                                                    status: order.status,
                                                                    cancellation_reason: order.cancellation_reason
                                                                }}
                                                                className="btn btn-outline-primary rounded-pill btn-sm px-4">
                                                                View Details
                                                            </Link>
                                                        </div>

                                                        {order.status === 'cancelled' && order.cancellation_reason && (
                                                            <div className="mt-3 bg-danger-subtle text-danger-emphasis p-2 rounded-3 small">
                                                                <strong>Reason:</strong> {order.cancellation_reason}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Profile View */
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <label className="text-muted small fw-bold text-uppercase mb-1">First Name</label>
                                                <p className="mb-0 fw-semibold">{user?.first_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <label className="text-muted small fw-bold text-uppercase mb-1">Last Name</label>
                                                <p className="mb-0 fw-semibold">{user?.last_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <label className="text-muted small fw-bold text-uppercase mb-1">Email Address</label>
                                                <p className="mb-0 fw-semibold">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <label className="text-muted small fw-bold text-uppercase mb-1">Phone Number</label>
                                                <p className="mb-0 fw-semibold">{user?.phone || 'Not provided'}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 text-end mt-4">
                                            <button className="btn btn-primary rounded-pill px-4">
                                                <i className="ci-edit me-2"></i>Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserDashboard;
