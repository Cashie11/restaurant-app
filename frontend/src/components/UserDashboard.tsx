import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const UserDashboard: React.FC = () => {
    const { user, logout, updateUser } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

    // Profile editing state
    const [editMode, setEditMode] = useState(false);
    const [profileForm, setProfileForm] = useState({ first_name: '', last_name: '', phone: '' });
    const [savingProfile, setSavingProfile] = useState(false);

    // Password change state
    const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
    const [changingPassword, setChangingPassword] = useState(false);

    const startEditProfile = () => {
        setProfileForm({
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            phone: user?.phone || ''
        });
        setEditMode(true);
    };

    const cancelEditProfile = () => {
        setEditMode(false);
    };

    const saveProfile = async () => {
        if (!profileForm.first_name.trim() || !profileForm.last_name.trim()) {
            toast.error('First name and last name are required');
            return;
        }
        setSavingProfile(true);
        try {
            const updated = await authService.updateProfile({
                first_name: profileForm.first_name.trim(),
                last_name: profileForm.last_name.trim(),
                phone: profileForm.phone.trim() || undefined
            });
            updateUser(updated);
            setEditMode(false);
            toast.success('Profile updated successfully');
        } catch (error: any) {
            console.error('Failed to update profile:', error);
            toast.error(error?.response?.data?.detail || 'Failed to update profile');
        } finally {
            setSavingProfile(false);
        }
    };

    const changePassword = async () => {
        if (!passwordForm.current_password || !passwordForm.new_password) {
            toast.error('Please fill in all password fields');
            return;
        }
        if (passwordForm.new_password.length < 8) {
            toast.error('New password must be at least 8 characters');
            return;
        }
        if (!/\d/.test(passwordForm.new_password) || !/[A-Z]/.test(passwordForm.new_password)) {
            toast.error('New password must contain at least one digit and one uppercase letter');
            return;
        }
        if (passwordForm.new_password !== passwordForm.confirm_password) {
            toast.error('Passwords do not match');
            return;
        }
        setChangingPassword(true);
        try {
            await authService.changePassword({
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password
            });
            setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
            toast.success('Password changed successfully');
        } catch (error: any) {
            console.error('Failed to change password:', error);
            toast.error(error?.response?.data?.detail || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

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
            pending: { cls: 'ud-status-pending', icon: 'bi-clock', label: 'Pending' },
            confirmed: { cls: 'ud-status-confirmed', icon: 'bi-check-circle', label: 'Confirmed' },
            preparing: { cls: 'ud-status-preparing', icon: 'bi-fire', label: 'Preparing' },
            delivering: { cls: 'ud-status-delivering', icon: 'bi-truck', label: 'On Route' },
            delivered: { cls: 'ud-status-delivered', icon: 'bi-check2-circle', label: 'Delivered' },
            cancelled: { cls: 'ud-status-cancelled', icon: 'bi-x-circle', label: 'Cancelled' }
        };
        const c = statuses[status] || statuses.pending;
        return (
            <span className={`ud-status ${c.cls}`}>
                <i className={`bi ${c.icon}`}></i>
                {c.label}
            </span>
        );
    };

    const stats = [
        { label: 'Total Orders', value: orders.length, icon: 'bi-bag', cls: 'ud-stat-orange' },
        { label: 'Pending', value: orders.filter((o) => o.status === 'pending').length, icon: 'bi-clock', cls: 'ud-stat-amber' },
        { label: 'Completed', value: orders.filter((o) => o.status === 'delivered').length, icon: 'bi-check2-circle', cls: 'ud-stat-green' }
    ];

    return (
        <div className="ud-wrap">
            <style>{`
                .ud-wrap { background: #faf7f4; min-height: 100vh; padding: 40px 0 64px; }
                .ud-sidebar {
                    background: #17130f;
                    border-radius: 22px;
                    padding: 28px 22px;
                    color: #fff;
                    position: sticky;
                    top: 96px;
                }
                .ud-avatar {
                    width: 72px; height: 72px; border-radius: 20px;
                    background: linear-gradient(135deg, #FF6B35, #F7931E);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 30px; font-weight: 800; color: #fff;
                    margin: 0 auto 14px; box-shadow: 0 10px 22px rgba(255,107,53,0.35);
                }
                .ud-profile-name { text-align: center; font-weight: 700; font-size: 17px; }
                .ud-profile-email { text-align: center; color: rgba(255,255,255,0.5); font-size: 13px; margin: 3px 0 24px; word-break: break-all; }
                .ud-nav { display: flex; flex-direction: column; gap: 6px; }
                .ud-nav-item {
                    display: flex; align-items: center; gap: 12px;
                    padding: 12px 16px; border-radius: 13px;
                    color: rgba(255,255,255,0.72); text-decoration: none;
                    font-weight: 600; font-size: 14px; background: transparent; border: none;
                    cursor: pointer; width: 100%; text-align: left; transition: all 0.2s ease;
                }
                .ud-nav-item i { font-size: 17px; }
                .ud-nav-item:hover { background: rgba(255,255,255,0.06); color: #fff; }
                .ud-nav-item.active { background: linear-gradient(135deg, #FF6B35, #F7931E); color: #fff; box-shadow: 0 6px 16px rgba(255,107,53,0.3); }
                .ud-nav-item.ud-nav-admin { color: #ffd9a8; }
                .ud-logout {
                    display: flex; align-items: center; gap: 12px;
                    margin-top: 18px; padding: 12px 16px; border-radius: 13px;
                    color: rgba(255,255,255,0.5); background: transparent; border: none;
                    cursor: pointer; width: 100%; font-weight: 600; font-size: 14px; transition: all 0.2s ease;
                }
                .ud-logout:hover { color: #ff8f8f; background: rgba(255,255,255,0.05); }

                .ud-card { background: #fff; border: 1px solid #f0eae4; border-radius: 20px; }
                .ud-card-pad { padding: 26px; }

                .ud-stat { border-radius: 18px; padding: 20px; display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1px solid #f0eae4; }
                .ud-stat .lbl { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9a9188; }
                .ud-stat .val { font-size: 30px; font-weight: 800; color: #1f1b16; letter-spacing: -1px; }
                .ud-stat .ic { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
                .ud-stat-orange .ic { background: #fff0ea; color: #FF6B35; }
                .ud-stat-amber .ic { background: #fff6e5; color: #d97706; }
                .ud-stat-green .ic { background: #eafaf0; color: #16a34a; }

                .ud-status { display: inline-flex; align-items: center; gap: 7px; padding: 6px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 700; }
                .ud-status-pending { background: #fff6e5; color: #b45309; }
                .ud-status-confirmed { background: #eaf3ff; color: #2563eb; }
                .ud-status-preparing { background: #fff0ea; color: #ea580c; }
                .ud-status-delivering { background: #eef6ff; color: #0891b2; }
                .ud-status-delivered { background: #eafaf0; color: #16a34a; }
                .ud-status-cancelled { background: #fdecec; color: #dc2626; }

                .ud-order-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid #f4efe9; gap: 16px; flex-wrap: wrap; }
                .ud-order-row:last-child { border-bottom: none; }
                .ud-order-id { font-weight: 700; color: #1f1b16; }
                .ud-order-meta { font-size: 13px; color: #9a9188; }
                .ud-order-total { font-weight: 800; color: #1f1b16; }

                .ud-field { background: #faf7f4; border: 1px solid #f0eae4; border-radius: 12px; padding: 14px 16px; }
                .ud-field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9a9188; margin-bottom: 4px; }
                .ud-field p { margin: 0; font-weight: 600; color: #1f1b16; }

                .ud-input { border: 1.5px solid #e5ded6; border-radius: 12px; padding: 12px 14px; width: 100%; font-size: 14px; background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
                .ud-input:focus { outline: none; border-color: #FF6B35; box-shadow: 0 0 0 4px rgba(255,107,53,0.1); }

                @media (max-width: 991.98px) {
                    .ud-sidebar { position: static; margin-bottom: 20px; }
                    .ud-nav { flex-direction: row; flex-wrap: wrap; }
                    .ud-nav-item { white-space: nowrap; width: auto; }
                    .ud-profile-name, .ud-profile-email { text-align: left; }
                }
            `}</style>

            <div className="container">
                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="ud-sidebar">
                            <div className="ud-avatar">{user?.first_name?.charAt(0) || 'U'}</div>
                            <div className="ud-profile-name">{user?.first_name} {user?.last_name}</div>
                            <div className="ud-profile-email">{user?.email}</div>

                            <nav className="ud-nav">
                                <button className={`ud-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                                    <i className="bi bi-bag"></i> My Orders
                                </button>
                                <button className={`ud-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                                    <i className="bi bi-person"></i> Profile Info
                                </button>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="ud-nav-item ud-nav-admin">
                                        <i className="bi bi-shield-lock"></i> Admin Panel
                                    </Link>
                                )}
                            </nav>

                            <button className="ud-logout" onClick={logout}>
                                <i className="bi bi-box-arrow-right"></i> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div>
                                <h2 className="fw-bold mb-1" style={{ color: '#1f1b16' }}>
                                    {activeTab === 'orders' ? 'My Orders' : 'Profile Information'}
                                </h2>
                                <span className="text-muted small">Welcome back, {user?.first_name}!</span>
                            </div>
                            {activeTab === 'orders' && orders.length > 0 && (
                                <button
                                    onClick={async () => {
                                        if (window.confirm('Are you sure you want to clear your order history?')) {
                                            try {
                                                await orderService.clearOrderHistory();
                                                setOrders([]);
                                                toast.success('Order history cleared');
                                            } catch (error) {
                                                toast.error('Failed to clear history');
                                            }
                                        }
                                    }}
                                    className="btn btn-outline-danger rounded-pill px-4"
                                >
                                    <i className="bi bi-trash me-2"></i>Clear History
                                </button>
                            )}
                        </div>

                        {activeTab === 'orders' ? (
                            <>
                                {/* Stats */}
                                <div className="row g-3 mb-4">
                                    {stats.map((stat, i) => (
                                        <div className="col-md-4" key={i}>
                                            <div className="ud-stat">
                                                <div>
                                                    <div className="lbl">{stat.label}</div>
                                                    <div className="val">{stat.value}</div>
                                                </div>
                                                <div className={`ic ${stat.cls}`}><i className={`bi ${stat.icon}`}></i></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Orders */}
                                <div className="ud-card">
                                    <div className="ud-card-pad">
                                        {loading ? (
                                            <div className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
                                            </div>
                                        ) : orders.length === 0 ? (
                                            <div className="text-center py-5">
                                                <div className="d-inline-flex p-4 rounded-circle mb-3" style={{ background: '#faf7f4' }}>
                                                    <i className="bi bi-bag fs-1" style={{ color: '#c9c1b8' }}></i>
                                                </div>
                                                <h5 className="fw-bold">No orders yet</h5>
                                                <p className="text-muted mb-4">Start exploring our menu today!</p>
                                                <Link to="/menu" className="btn btn-primary rounded-pill px-4">Browse Menu</Link>
                                            </div>
                                        ) : (
                                            orders.map((order: any) => (
                                                <React.Fragment key={order.id}>
                                                    <div className="ud-order-row">
                                                        <div>
                                                            <div className="ud-order-id">Order #{order.id}</div>
                                                            <div className="ud-order-meta">{new Date(order.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                        </div>
                                                        {getStatusBadge(order.status)}
                                                        <div className="ud-order-total">₦{order.total_amount.toLocaleString()}</div>
                                                        <Link
                                                            to="/order-confirmation"
                                                            state={{ orderId: order.id, bank: {}, total: order.total_amount, status: order.status, cancellation_reason: order.cancellation_reason }}
                                                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                                        >
                                                            Details
                                                        </Link>
                                                    </div>
                                                    {order.status === 'cancelled' && order.cancellation_reason && (
                                                        <div className="rounded-3 px-3 py-2 mb-2" style={{ background: '#fdecec', color: '#dc2626', fontSize: '13px' }}>
                                                            <strong>Cancellation reason:</strong> {order.cancellation_reason}
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Profile View */
                            <div>
                                <div className="ud-card mb-4">
                                    <div className="ud-card-pad">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <h5 className="fw-bold mb-0">Profile Information</h5>
                                            {!editMode && (
                                                <button className="btn btn-primary rounded-pill px-4" onClick={startEditProfile}>
                                                    <i className="bi bi-pencil me-2"></i>Edit Profile
                                                </button>
                                            )}
                                        </div>

                                        {editMode ? (
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">First Name</label>
                                                    <input type="text" className="ud-input" value={profileForm.first_name} onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">Last Name</label>
                                                    <input type="text" className="ud-input" value={profileForm.last_name} onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })} />
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="form-label fw-semibold">Phone Number</label>
                                                    <input type="tel" className="ud-input" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="e.g. 08012345678" />
                                                </div>
                                                <div className="col-12 text-end mt-3">
                                                    <button className="btn btn-secondary rounded-pill px-4 me-2" onClick={cancelEditProfile} disabled={savingProfile}>Cancel</button>
                                                    <button className="btn btn-primary rounded-pill px-4" onClick={saveProfile} disabled={savingProfile}>
                                                        {savingProfile ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-check-lg me-2"></i>}
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="ud-field"><label>First Name</label><p>{user?.first_name}</p></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ud-field"><label>Last Name</label><p>{user?.last_name}</p></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ud-field"><label>Email Address</label><p>{user?.email}</p></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="ud-field"><label>Phone Number</label><p>{user?.phone || 'Not provided'}</p></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="ud-card">
                                    <div className="ud-card-pad">
                                        <h5 className="fw-bold mb-4">Change Password</h5>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-semibold">Current Password</label>
                                                <input type="password" className="ud-input" value={passwordForm.current_password} onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">New Password</label>
                                                <input type="password" className="ud-input" value={passwordForm.new_password} onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })} placeholder="Min 8 chars, 1 digit, 1 uppercase" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-semibold">Confirm New Password</label>
                                                <input type="password" className="ud-input" value={passwordForm.confirm_password} onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })} />
                                            </div>
                                            <div className="col-12 text-end mt-3">
                                                <button className="btn btn-primary rounded-pill px-4" onClick={changePassword} disabled={changingPassword}>
                                                    {changingPassword ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-shield-lock me-2"></i>}
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
