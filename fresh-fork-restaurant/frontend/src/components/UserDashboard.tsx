import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{
            background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)',
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '3rem'
        }}>
            <div className="container">
                {/* Animated Welcome Card */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div
                            className="rounded-4 shadow-lg p-4 border-0 position-relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            }}
                        >
                            {/* Decorative circles */}
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-50px',
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                bottom: '-30px',
                                left: '-30px',
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%)',
                            }}></div>

                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 position-relative">
                                <div className="d-flex align-items-center gap-3">
                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center text-white shadow-lg"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            border: '4px solid white'
                                        }}
                                    >
                                        {user?.first_name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <h2 className="h3 mb-1 fw-bold" style={{ color: '#2d3436' }}>
                                            Hey {user?.first_name}! 👋
                                        </h2>
                                        <p className="mb-0 text-muted">Welcome to your dashboard</p>
                                        <small className="text-muted">{user?.email}</small>
                                    </div>
                                </div>
                                <button
                                    onClick={logout}
                                    className="btn btn-outline-danger rounded-pill px-4 shadow-sm"
                                    style={{
                                        borderWidth: '2px',
                                        fontWeight: '600'
                                    }}
                                >
                                    <i className="ci-sign-out me-2"></i>Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Stylish Sidebar */}
                    <div className="col-lg-3">
                        <div
                            className="rounded-4 shadow-lg p-4 border-0"
                            style={{
                                position: 'sticky',
                                top: '120px',
                                alignSelf: 'flex-start',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            }}
                        >
                            <h6 className="text-uppercase small fw-bold mb-4" style={{ color: '#FF6B35', letterSpacing: '1px' }}>
                                Navigation
                            </h6>
                            <nav className="nav flex-column gap-2">
                                <Link
                                    to="/dashboard"
                                    className="nav-link d-flex align-items-center gap-3 px-4 py-3 rounded-3 text-white fw-semibold shadow-sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                        border: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <i className="ci-user fs-5"></i>
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    to="/dashboard/orders"
                                    className="nav-link d-flex align-items-center gap-3 px-4 py-3 rounded-3 fw-semibold"
                                    style={{
                                        color: '#2d3436',
                                        backgroundColor: 'rgba(255, 107, 53, 0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <i className="ci-bag fs-5" style={{ color: '#FF6B35' }}></i>
                                    <span>My Orders</span>
                                </Link>
                                <Link
                                    to="/dashboard/addresses"
                                    className="nav-link d-flex align-items-center gap-3 px-4 py-3 rounded-3 fw-semibold"
                                    style={{
                                        color: '#2d3436',
                                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <i className="ci-location fs-5" style={{ color: '#FF6B35' }}></i>
                                    <span>Addresses</span>
                                </Link>
                                {user?.role === 'admin' && (
                                    <>
                                        <hr className="my-3" style={{ opacity: 0.1 }} />
                                        <Link
                                            to="/admin"
                                            className="nav-link d-flex align-items-center gap-3 px-4 py-3 rounded-3 text-white fw-semibold shadow-sm"
                                            style={{
                                                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                                            }}
                                        >
                                            <i className="ci-settings fs-5"></i>
                                            <span>Admin Panel</span>
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9">
                        {/* Vibrant Stats Cards */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <div
                                    className="rounded-4 shadow-lg p-4 border-0 h-100 position-relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                    }}
                                >
                                    <div className="position-relative" style={{ zIndex: 1 }}>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div
                                                className="rounded-3 d-flex align-items-center justify-content-center bg-white shadow"
                                                style={{ width: '50px', height: '50px' }}
                                            >
                                                <i className="ci-bag fs-4" style={{ color: '#28a745' }}></i>
                                            </div>
                                            <div className="text-white text-end">
                                                <p className="mb-1 small opacity-75">Total Orders</p>
                                                <h2 className="h1 mb-0 fw-bold">0</h2>
                                            </div>
                                        </div>
                                        <div className="text-white small opacity-75">
                                            <i className="ci-arrow-up me-1"></i>Start ordering today!
                                        </div>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-20px',
                                        right: '-20px',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }}></div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div
                                    className="rounded-4 shadow-lg p-4 border-0 h-100 position-relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                                    }}
                                >
                                    <div className="position-relative" style={{ zIndex: 1 }}>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div
                                                className="rounded-3 d-flex align-items-center justify-content-center bg-white shadow"
                                                style={{ width: '50px', height: '50px' }}
                                            >
                                                <i className="ci-time fs-4" style={{ color: '#ffc107' }}></i>
                                            </div>
                                            <div className="text-white text-end">
                                                <p className="mb-1 small opacity-75">Pending</p>
                                                <h2 className="h1 mb-0 fw-bold">0</h2>
                                            </div>
                                        </div>
                                        <div className="text-white small opacity-75">
                                            <i className="ci-clock me-1"></i>No pending orders
                                        </div>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-20px',
                                        right: '-20px',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }}></div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div
                                    className="rounded-4 shadow-lg p-4 border-0 h-100 position-relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                    }}
                                >
                                    <div className="position-relative" style={{ zIndex: 1 }}>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div
                                                className="rounded-3 d-flex align-items-center justify-content-center bg-white shadow"
                                                style={{ width: '50px', height: '50px' }}
                                            >
                                                <i className="ci-check-circle fs-4" style={{ color: '#FF6B35' }}></i>
                                            </div>
                                            <div className="text-white text-end">
                                                <p className="mb-1 small opacity-75">Completed</p>
                                                <h2 className="h1 mb-0 fw-bold">0</h2>
                                            </div>
                                        </div>
                                        <div className="text-white small opacity-75">
                                            <i className="ci-check me-1"></i>All caught up!
                                        </div>
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-20px',
                                        right: '-20px',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Information Card */}
                        <div
                            className="rounded-4 shadow-lg p-4 border-0 mb-4"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            }}
                        >
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                    <span
                                        className="rounded-3 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                        }}
                                    >
                                        <i className="ci-user text-white"></i>
                                    </span>
                                    Profile Information
                                </h5>
                                <button
                                    className="btn btn-sm rounded-pill px-4 text-white fw-semibold shadow-sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                        border: 'none'
                                    }}
                                >
                                    <i className="ci-edit me-1"></i>Edit
                                </button>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        value={user?.first_name || ''}
                                        readOnly
                                        style={{
                                            borderRadius: '12px',
                                            backgroundColor: '#f8f9fa',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        value={user?.last_name || ''}
                                        readOnly
                                        style={{
                                            borderRadius: '12px',
                                            backgroundColor: '#f8f9fa',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        value={user?.email || ''}
                                        readOnly
                                        style={{
                                            borderRadius: '12px',
                                            backgroundColor: '#f8f9fa',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold text-uppercase" style={{ letterSpacing: '0.5px' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg border-0 shadow-sm"
                                        value={user?.phone || 'Not provided'}
                                        readOnly
                                        style={{
                                            borderRadius: '12px',
                                            backgroundColor: '#f8f9fa',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders Card */}
                        <div
                            className="rounded-4 shadow-lg p-5 border-0"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            }}
                        >
                            <h5 className="mb-4 fw-bold d-flex align-items-center gap-2">
                                <span
                                    className="rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                    }}
                                >
                                    <i className="ci-bag text-white"></i>
                                </span>
                                Recent Orders
                            </h5>
                            <div className="text-center py-5">
                                <div
                                    className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center shadow-lg"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 30, 0.1) 100%)',
                                    }}
                                >
                                    <i className="ci-bag" style={{ fontSize: '3rem', color: '#FF6B35' }}></i>
                                </div>
                                <h5 className="fw-bold mb-2" style={{ color: '#2d3436' }}>No orders yet! 🍽️</h5>
                                <p className="text-muted mb-4">Discover delicious meals and place your first order</p>
                                <Link
                                    to="/menu"
                                    className="btn btn-lg rounded-pill px-5 text-white fw-bold shadow-lg"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                        border: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                                    }}
                                >
                                    <i className="ci-utensils me-2"></i>Browse Menu
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
