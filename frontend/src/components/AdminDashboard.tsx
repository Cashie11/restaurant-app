import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import { productService, Product, ProductCreate } from '../services/productService';
import { bankService, BankAccount, BankAccountCreate } from '../services/bankService';
import { contactService, ContactMessage } from '../services/contactService';
import { API_BASE_URL } from '../api/axios';

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Dashboard state
    const [stats, setStats] = useState<any>(null);
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

    // Products state
    const [products, setProducts] = useState<Product[]>([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState<ProductCreate>({
        sku: '',
        name: '',
        description: '',
        price: 0,
        image_url: '',
        category: 'vegetables',
        is_popular: false,
        is_special: false,
        is_offer: false,
        discount_percentage: 0,
        stock_quantity: 0,
        is_active: true
    });

    // Users state
    const [users, setUsers] = useState<any[]>([]);
    const [userSearch, setUserSearch] = useState('');

    // Orders state
    const [orders, setOrders] = useState<any[]>([]);
    const [orderStatusFilter, setOrderStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [cancellationReason, setCancellationReason] = useState('');
    const [showCancellationInput, setShowCancellationInput] = useState(false);


    // Banks state
    const [banks, setBanks] = useState<BankAccount[]>([]);
    const [showBankForm, setShowBankForm] = useState(false);
    const [bankForm, setBankForm] = useState<BankAccountCreate>({
        bank_name: '',
        account_number: '',
        account_name: ''
    });

    // Messages state
    const [messages, setMessages] = useState<ContactMessage[]>([]);

    const [loading, setLoading] = useState(false);

    // Redirect if not admin
    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    // Load data based on active tab
    const loadTabData = React.useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const [statsData, usersData, ordersData] = await Promise.all([
                    adminService.getStats(),
                    adminService.getRecentUsers(5),
                    adminService.getRecentOrders(10)
                ]);
                setStats(statsData);
                setRecentUsers(usersData);
                setRecentOrders(ordersData);
            } else if (activeTab === 'products') {
                const productsData = await productService.getProducts();
                setProducts(productsData);
            } else if (activeTab === 'users') {
                const data = await adminService.getUsers(0, 100, userSearch);
                setUsers(Array.isArray(data) ? data : data.users || []);
            } else if (activeTab === 'orders') {
                const data = await adminService.getOrders(0, 100, orderStatusFilter);
                setOrders(Array.isArray(data) ? data : data.orders || []);
            } else if (activeTab === 'banks') {
                const banksData = await bankService.getAllBanks(localStorage.getItem('access_token') || '');
                setBanks(banksData);
                setBanks(banksData);
            } else if (activeTab === 'messages') {
                const msgs = await contactService.getMessages(localStorage.getItem('access_token') || '');
                setMessages(msgs);
            }
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    }, [activeTab, userSearch, orderStatusFilter]);

    useEffect(() => {
        loadTabData();
    }, [loadTabData]);

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct.id, productForm);
            } else {
                await productService.createProduct(productForm);
            }
            setShowProductForm(false);
            setEditingProduct(null);
            resetProductForm();
            loadTabData();
        } catch (error) {
            console.error('Failed to save product:', error);
            toast.error('Failed to save product');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Using direct fetch or axios, need to ensure auth header if needed, strictly speaking upload endpoint is open based on code but ideally protected.
            // My upload endpoint implementation didn't strictly require auth, but let's assume valid usercontext.
            // Using fetch for simplicity or I can import axios.
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_BASE_URL}/upload/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            setProductForm({ ...productForm, image_url: data.url });
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Failed to upload image:', error);
            toast.error('Failed to upload image');
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            sku: product.sku,
            name: product.name,
            description: product.description || '',
            price: product.price,
            image_url: product.image_url || '',
            category: product.category,
            is_popular: product.is_popular,
            is_special: product.is_special,
            is_offer: product.is_offer,
            discount_percentage: product.discount_percentage,
            stock_quantity: product.stock_quantity,
            is_active: product.is_active
        });
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            loadTabData();
        } catch (error) {
            console.error('Failed to delete product:', error);
            toast.error('Failed to delete product');
        }
    };

    const resetProductForm = () => {
        setProductForm({
            sku: '',
            name: '',
            description: '',
            price: 0,
            image_url: '',
            category: 'vegetables',
            is_popular: false,
            is_special: false,
            is_offer: false,
            discount_percentage: 0,
            stock_quantity: 0,
            is_active: true
        });
    };

    const handleDeleteUser = async (userId: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await adminService.deleteUser(userId);
            loadTabData();
        } catch (error: any) {
            console.error('Failed to delete user:', error);
            const errorMessage = error?.response?.data?.detail || error?.message || 'Failed to delete user';
            toast.error(`Failed to delete user: ${errorMessage}`);
        }
    };

    const handleUpdateOrderStatus = async (orderId: number, status: string) => {
        if (status === 'cancelled' && !cancellationReason && !showCancellationInput) {
            setShowCancellationInput(true);
            return;
        }

        if (status === 'cancelled' && !cancellationReason) {
            toast.error('Please provide a reason for cancellation');
            return;
        }

        try {
            await adminService.updateOrderStatus(orderId, status, cancellationReason);
            toast.success(`Order marked as ${status}`);

            loadTabData();
            if (activeTab === 'dashboard') {
                const ordersData = await adminService.getRecentOrders(10);
                setRecentOrders(ordersData);
            }

            if (selectedOrder && selectedOrder.id === orderId) {
                const updatedOrder = await adminService.getOrder(orderId);
                setSelectedOrder(updatedOrder);
            }

            setShowCancellationInput(false);
            setCancellationReason('');
        } catch (error) {
            console.error('Failed to update order status:', error);
            toast.error('Failed to update order status');
        }
    };

    const handleConfirmPayment = async (orderId: number) => {
        if (!window.confirm('Are you sure you want to confirm this payment?')) return;
        try {
            await adminService.confirmPayment(orderId);
            loadTabData();
            if (selectedOrder && selectedOrder.id === orderId) {
                // Refresh modal data if open
                const updatedOrder = await adminService.getOrder(orderId);
                setSelectedOrder(updatedOrder);
            }
            toast.success('Payment confirmed');
        } catch (error) {
            console.error('Failed to confirm payment:', error);
            toast.error('Failed to confirm payment');
        }
    };

    const handleViewOrder = async (orderId: number) => {
        try {
            setLoading(true);
            const order = await adminService.getOrder(orderId);
            setSelectedOrder(order);
            setShowOrderModal(true);
        } catch (error) {
            console.error('Failed to load order details:', error);
            toast.error('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUserRole = async (userId: number, newRole: string) => {
        if (userId === user?.id) {
            toast.error("You cannot change your own role.");
            return;
        }
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        try {
            await adminService.updateUser(userId, { role: newRole });
            toast.success("User role updated successfully");
            loadTabData();
        } catch (error: any) {
            console.error('Failed to update user role:', error);
            toast.error(error.response?.data?.detail || 'Failed to update user role');
        }
    };

    const handleBankSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await bankService.createBank(bankForm, localStorage.getItem('access_token') || '');
            setShowBankForm(false);
            setBankForm({ bank_name: '', account_number: '', account_name: '' });
            loadTabData();
            toast.success('Bank account added successfully');
        } catch (error) {
            console.error('Failed to add bank:', error);
            toast.error('Failed to add bank account');
        }
    };

    const handleDeleteBank = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this bank account?')) return;
        try {
            await bankService.deleteBank(id, localStorage.getItem('access_token') || '');
            loadTabData();
            toast.success('Bank account deleted');
        } catch (error) {
            console.error('Failed to delete bank:', error);
            toast.error('Failed to delete bank account');
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: '#17130f', color: '#fff' }}>
                <div className="container-fluid">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 py-3">
                        <div className="d-flex align-items-center gap-3">
                            <span style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(135deg, #FF6B35, #F7931E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                                <i className="bi bi-shield-lock"></i>
                            </span>
                            <div>
                                <h4 className="mb-0 fw-bold">Admin Panel</h4>
                                <small style={{ color: 'rgba(255,255,255,0.55)' }}>Welcome, {user.first_name}!</small>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            <button onClick={() => navigate('/')} className="btn btn-outline-light btn-sm rounded-pill px-3 text-nowrap">
                                <i className="bi bi-house me-2"></i>Back to Site
                            </button>
                            <button onClick={logout} className="btn btn-outline-danger btn-sm rounded-pill px-3 text-nowrap">
                                <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white border-bottom">
                <div className="container-fluid px-3 py-2">
                    <div className="d-flex flex-wrap gap-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
                            { id: 'products', label: 'Products', icon: 'bi-box-seam' },
                            { id: 'users', label: 'Users', icon: 'bi-people' },
                            { id: 'orders', label: 'Orders', icon: 'bi-receipt' },
                            { id: 'banks', label: 'Bank Accounts', icon: 'bi-bank' },
                            { id: 'messages', label: 'Messages', icon: 'bi-chat-dots' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className="btn btn-sm text-nowrap d-flex align-items-center gap-2 rounded-pill px-3 py-2"
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    background: activeTab === tab.id ? '#FF6B35' : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : '#6b6258',
                                    border: 'none',
                                    fontWeight: activeTab === tab.id ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = '#FF6B35'; }}
                                onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = '#6b6258'; }}
                            >
                                <i className={`bi ${tab.icon}`}></i> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-fluid py-4">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Dashboard Tab */}
                        {activeTab === 'dashboard' && (
                            <div>
                                {/* Stats Cards */}
                                <div className="row g-3 mb-4">
                                    <div className="col-6 col-xl-3">
                                        <div className="h-100 p-3 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4' }}>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <div className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#9a9188' }}>Total Users</div>
                                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#1f1b16', letterSpacing: '-1px', lineHeight: 1.1, margin: '6px 0 4px' }}>{stats?.total_users || 0}</div>
                                                    <div style={{ fontSize: '12px', color: '#9a9188' }}>+{stats?.new_users_week || 0} this week</div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 14, background: '#fff0ea', color: '#FF6B35', fontSize: 21 }}>
                                                    <i className="bi bi-people"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xl-3">
                                        <div className="h-100 p-3 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4' }}>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <div className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#9a9188' }}>Total Orders</div>
                                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#1f1b16', letterSpacing: '-1px', lineHeight: 1.1, margin: '6px 0 4px' }}>{stats?.total_orders || 0}</div>
                                                    <div style={{ fontSize: '12px', color: '#9a9188' }}>+{stats?.new_orders_week || 0} this week</div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 14, background: '#eaf3ff', color: '#2563eb', fontSize: 21 }}>
                                                    <i className="bi bi-bag"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xl-3">
                                        <div className="h-100 p-3 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4' }}>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <div className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#9a9188' }}>Pending Orders</div>
                                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#1f1b16', letterSpacing: '-1px', lineHeight: 1.1, margin: '6px 0 4px' }}>{stats?.pending_orders || 0}</div>
                                                    <div style={{ fontSize: '12px', color: '#9a9188' }}>Needs attention</div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 14, background: '#fff6e5', color: '#d97706', fontSize: 21 }}>
                                                    <i className="bi bi-clock"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xl-3">
                                        <div className="h-100 p-3 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4' }}>
                                            <div className="d-flex align-items-start justify-content-between">
                                                <div>
                                                    <div className="fw-bold text-uppercase" style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#9a9188' }}>Total Revenue</div>
                                                    <div className="fw-bold" style={{ fontSize: '26px', color: '#1f1b16', letterSpacing: '-1px', lineHeight: 1.1, margin: '6px 0 4px' }}>₦{(stats?.total_revenue || 0).toLocaleString()}</div>
                                                    <div style={{ fontSize: '12px', color: '#9a9188' }}>All time</div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48, borderRadius: 14, background: '#eafaf0', color: '#16a34a', fontSize: 21 }}>
                                                    <i className="bi bi-cash-stack"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="h-100 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4', overflow: 'hidden' }}>
                                            <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ borderBottom: '1px solid #f4efe9' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-people" style={{ color: '#FF6B35' }}></i>
                                                    <h5 className="mb-0 fw-bold" style={{ fontSize: '16px' }}>Recent Users</h5>
                                                </div>
                                                <button className="btn btn-sm btn-link text-decoration-none p-0" style={{ color: '#FF6B35' }} onClick={() => setActiveTab('users')}>View all</button>
                                            </div>
                                            <div className="card-body p-0">
                                                {/* Desktop table */}
                                                <div className="table-responsive d-none d-md-block">
                                                    <table className="table table-hover mb-0">
                                                        <thead className="bg-light">
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Email</th>
                                                                <th>Role</th>
                                                                <th>Joined</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {recentUsers.map((user: any) => (
                                                                <tr key={user.id}>
                                                                    <td className="fw-semibold">{user.first_name} {user.last_name}</td>
                                                                    <td className="text-muted">{user.email}</td>
                                                                    <td>
                                                                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                                            {user.role}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-muted small">
                                                                        {new Date(user.created_at).toLocaleDateString()}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-sm btn-outline-secondary"
                                                                            onClick={() => { setActiveTab('users'); setUserSearch(user.email); }}
                                                                        >
                                                                            Manage
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {/* Mobile card view */}
                                                <div className="d-md-none">
                                                    {recentUsers.map((user: any) => (
                                                        <div key={user.id} className="d-flex align-items-center justify-content-between gap-2 px-3 py-2" style={{ borderBottom: '1px solid #f4efe9' }}>
                                                            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                                                <div className="fw-semibold">{user.first_name} {user.last_name}</div>
                                                                <div className="small text-muted text-break">{user.email}</div>
                                                                <div className="d-flex flex-wrap align-items-center gap-2 mt-1">
                                                                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>{user.role}</span>
                                                                    <span className="small text-muted">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary flex-shrink-0"
                                                                onClick={() => { setActiveTab('users'); setUserSearch(user.email); }}
                                                            >
                                                                Manage
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="h-100 rounded-4" style={{ background: '#fff', border: '1px solid #f0eae4', overflow: 'hidden' }}>
                                            <div className="d-flex align-items-center justify-content-between px-4 py-3" style={{ borderBottom: '1px solid #f4efe9' }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-bag" style={{ color: '#FF6B35' }}></i>
                                                    <h5 className="mb-0 fw-bold" style={{ fontSize: '16px' }}>Recent Orders</h5>
                                                </div>
                                                <button className="btn btn-sm btn-link text-decoration-none p-0" style={{ color: '#FF6B35' }} onClick={() => setActiveTab('orders')}>View all</button>
                                            </div>
                                            <div className="card-body p-0">
                                                {/* Desktop table */}
                                                <div className="table-responsive d-none d-md-block">
                                                    <table className="table table-hover mb-0">
                                                        <thead className="bg-light">
                                                            <tr>
                                                                <th>Order ID</th>
                                                                <th>Customer</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {recentOrders.map((order: any) => (
                                                                <tr key={order.id}>
                                                                    <td className="fw-semibold">#{order.id}</td>
                                                                    <td>
                                                                        {order.user ? (
                                                                            <span className="fw-semibold">{order.user.first_name} {order.user.last_name}</span>
                                                                        ) : (
                                                                            <span className="text-muted">Guest</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="text-success">₦{(order.total_amount || 0).toLocaleString()}</td>
                                                                    <td>
                                                                        <span className={`badge ${order.status === 'delivered' ? 'bg-success' :
                                                                            order.status === 'pending' ? 'bg-warning' :
                                                                                order.status === 'processing' ? 'bg-info' :
                                                                                    'bg-secondary'
                                                                            }`}>
                                                                            {order.status === 'delivering' ? 'On Route' : order.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-muted small">
                                                                        {new Date(order.created_at).toLocaleDateString()}
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewOrder(order.id)}>
                                                                            View
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {/* Mobile card view */}
                                                <div className="d-md-none">
                                                    {recentOrders.map((order: any) => (
                                                        <div key={order.id} className="d-flex align-items-center justify-content-between gap-2 px-3 py-2" style={{ borderBottom: '1px solid #f4efe9' }}>
                                                            <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                                                <div className="fw-semibold">#{order.id}</div>
                                                                <div className="small text-muted">
                                                                    {order.user ? `${order.user.first_name} ${order.user.last_name}` : 'Guest'}
                                                                </div>
                                                                <div className="d-flex flex-wrap align-items-center gap-2 mt-1">
                                                                    <span className="text-success fw-semibold">₦{(order.total_amount || 0).toLocaleString()}</span>
                                                                    <span className={`badge ${order.status === 'delivered' ? 'bg-success' :
                                                                        order.status === 'pending' ? 'bg-warning' :
                                                                            order.status === 'processing' ? 'bg-info' :
                                                                                'bg-secondary'
                                                                        }`}>
                                                                        {order.status === 'delivering' ? 'On Route' : order.status}
                                                                    </span>
                                                                    <span className="small text-muted">{new Date(order.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-sm btn-outline-primary flex-shrink-0" onClick={() => handleViewOrder(order.id)}>
                                                                View
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products Tab */}
                        {activeTab === 'products' && (
                            <div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                                    <h3 className="mb-0">Product Management</h3>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            setEditingProduct(null);
                                            resetProductForm();
                                            setShowProductForm(true);
                                        }}
                                    >
                                        <i className="ci-add me-2"></i>Add Product
                                    </button>
                                </div>

                                {/* Product Form Modal */}
                                {showProductForm && (
                                    <div className="card border-0 shadow-sm mb-4">
                                        <div className="card-header bg-white border-0 py-3">
                                            <h5 className="mb-0">{editingProduct ? 'Edit Product' : 'Add New Product'}</h5>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleProductSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">SKU (Product Code) *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={productForm.sku}
                                                            onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                                                            placeholder="e.g., VEGE-001"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Product Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={productForm.name}
                                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Price *</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            className="form-control"
                                                            value={productForm.price}
                                                            onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Category *</label>
                                                        <select
                                                            className="form-select"
                                                            value={productForm.category}
                                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                                            required
                                                        >
                                                            <option value="popular">Popular</option>
                                                            <option value="vegetables">Vegetables</option>
                                                            <option value="fruits">Fruits</option>
                                                            <option value="dairy">Dairy</option>
                                                            <option value="bakery">Bakery</option>
                                                            <option value="meat">Meat</option>
                                                            <option value="seafood">Seafood</option>
                                                            <option value="beverages">Beverages</option>
                                                            <option value="desserts">Desserts</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Stock Quantity</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={productForm.stock_quantity}
                                                            onChange={(e) => setProductForm({ ...productForm, stock_quantity: parseInt(e.target.value) })}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Image URL</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-2"
                                                            value={productForm.image_url}
                                                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                                                            placeholder="https://example.com/image.jpg"
                                                        />
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Description</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={3}
                                                            value={productForm.description}
                                                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label fw-bold">Display Sections</label>
                                                        <div className="d-flex flex-wrap gap-3">
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={productForm.is_popular}
                                                                    onChange={(e) => setProductForm({ ...productForm, is_popular: e.target.checked })}
                                                                />
                                                                <label className="form-check-label">Popular Items</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={productForm.is_special}
                                                                    onChange={(e) => setProductForm({ ...productForm, is_special: e.target.checked })}
                                                                />
                                                                <label className="form-check-label">Special Products</label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={productForm.is_offer}
                                                                    onChange={(e) => setProductForm({ ...productForm, is_offer: e.target.checked })}
                                                                />
                                                                <label className="form-check-label">Special Offers</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {productForm.is_offer && (
                                                        <div className="col-md-6">
                                                            <label className="form-label">Discount Percentage</label>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                className="form-control"
                                                                value={productForm.discount_percentage}
                                                                onChange={(e) => setProductForm({ ...productForm, discount_percentage: parseFloat(e.target.value) })}
                                                                max="100"
                                                                min="0"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-4 d-flex gap-2">
                                                    <button type="submit" className="btn btn-primary">
                                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            setShowProductForm(false);
                                                            setEditingProduct(null);
                                                            resetProductForm();
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {/* Products Table */}
                                {/* Desktop Table View */}
                                <div className="card border-0 shadow-sm d-none d-md-block">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Category</th>
                                                        <th>Price</th>
                                                        <th>Stock</th>
                                                        <th>Sections</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((product) => (
                                                        <tr key={product.id}>
                                                            <td>
                                                                {product.image_url ? (
                                                                    <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                                                                ) : (
                                                                    <div style={{ width: '50px', height: '50px', background: '#e9ecef', borderRadius: '8px' }}></div>
                                                                )}
                                                            </td>
                                                            <td className="fw-semibold">{product.name}</td>
                                                            <td>
                                                                <span className="badge bg-secondary">{product.category}</span>
                                                            </td>
                                                            <td className="text-success fw-semibold">₦{product.price.toLocaleString()}</td>
                                                            <td>{product.stock_quantity}</td>
                                                            <td>
                                                                <div className="d-flex gap-1">
                                                                    {product.is_popular && <span className="badge bg-primary">Popular</span>}
                                                                    {product.is_special && <span className="badge bg-info">Special</span>}
                                                                    {product.is_offer && <span className="badge bg-warning">Offer</span>}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={() => handleEditProduct(product)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-outline-danger"
                                                                        onClick={() => handleDeleteProduct(product.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="d-md-none">
                                    {products.map((product) => (
                                        <div key={product.id} className="card border-0 shadow-sm mb-3">
                                            <div className="card-body p-3">
                                                <div className="d-flex gap-3">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                                    ) : (
                                                        <div style={{ width: '80px', height: '80px', background: '#e9ecef', borderRadius: '8px' }}></div>
                                                    )}
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <div>
                                                                <h6 className="mb-1 fw-bold">{product.name}</h6>
                                                                <span className="badge bg-secondary mb-2">{product.category}</span>
                                                            </div>
                                                            <div className="text-success fw-bold">₦{product.price.toLocaleString()}</div>
                                                        </div>
                                                        <div className="small text-muted mb-2">Stock: {product.stock_quantity}</div>
                                                        <div className="d-flex gap-2 mt-2">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary flex-grow-1"
                                                                onClick={() => handleEditProduct(product)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger flex-grow-1"
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                                    <h3 className="mb-0">User Management</h3>
                                    <div className="input-group flex-grow-1" style={{ maxWidth: '300px' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search users..."
                                            value={userSearch}
                                            onChange={(e) => setUserSearch(e.target.value)}
                                        />
                                        <button className="btn btn-outline-secondary" onClick={loadTabData}>
                                            <i className="ci-search"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop Table View */}
                                <div className="card border-0 shadow-sm d-none d-md-block">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Role</th>
                                                        <th>Status</th>
                                                        <th>Joined</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user: any) => (
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td className="fw-semibold">{user.first_name} {user.last_name}</td>
                                                            <td>{user.email}</td>
                                                            <td className="text-muted">{user.phone || 'N/A'}</td>
                                                            <td>
                                                                <select
                                                                    className={`form-select form-select-sm ${user.role === 'admin' ? 'text-danger fw-bold border-danger' : 'text-primary'}`}
                                                                    value={user.role}
                                                                    onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                                    disabled={user.id === user?.id}
                                                                    style={{ width: 'auto' }}
                                                                >
                                                                    <option value="user">User</option>
                                                                    <option value="admin">Admin</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <span className={`badge ${user.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </td>
                                                            <td className="text-muted small">
                                                                {new Date(user.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                    disabled={user.role === 'admin'}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="d-md-none">
                                    {users.map((user: any) => (
                                        <div key={user.id} className="card border-0 shadow-sm mb-3">
                                            <div className="card-body p-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <div className="fw-bold">{user.first_name} {user.last_name}</div>
                                                        <div className="small text-muted">{user.email}</div>
                                                    </div>
                                                    <span className={`badge ${user.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                        {user.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="small text-muted">Role</div>
                                                    <select
                                                        className={`form-select form-select-sm mt-1 ${user.role === 'admin' ? 'text-danger fw-bold border-danger' : 'text-primary'}`}
                                                        value={user.role}
                                                        onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                                        disabled={user.id === user?.id}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        className="btn btn-sm btn-outline-danger w-100"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        disabled={user.role === 'admin'}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                                    <h3 className="mb-0">Order Management</h3>
                                    <select
                                        className="form-select"
                                        style={{ maxWidth: '200px' }}
                                        value={orderStatusFilter}
                                        onChange={(e) => {
                                            setOrderStatusFilter(e.target.value);
                                            loadTabData();
                                        }}
                                    >
                                        <option value="">All Orders</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="delivering">On Route</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Desktop Table View */}
                                <div className="card border-0 shadow-sm d-none d-md-block">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover align-middle mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th className="border-0 ps-4">Order ID</th>
                                                        <th className="border-0">Customer</th>
                                                        <th className="border-0">Order Total</th>
                                                        <th className="border-0">Status</th>
                                                        <th className="border-0 text-end pe-4">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order) => (
                                                        <tr key={order.id}>
                                                            <td className="ps-4 fw-semibold">#{order.id}</td>
                                                            <td>
                                                                {order.user ? (
                                                                    <span className="fw-semibold">{order.user.first_name} {order.user.last_name}</span>
                                                                ) : (
                                                                    <span className="text-muted">Guest</span>
                                                                )}
                                                            </td>
                                                            <td className="fw-bold">₦{order.total_amount.toLocaleString()}</td>
                                                            <td>
                                                                <select
                                                                    className={`form-select form-select-sm border-0 ${order.status === 'delivered' ? 'bg-success-subtle text-success-emphasis' :
                                                                        order.status === 'cancelled' ? 'bg-danger-subtle text-danger-emphasis' :
                                                                            'bg-warning-subtle text-warning-emphasis'
                                                                        }`}
                                                                    value={order.status}
                                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                                    style={{ width: '140px', fontWeight: 500 }}
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="confirmed">Confirmed</option>
                                                                    <option value="preparing">Preparing</option>
                                                                    <option value="delivering">On Route</option>
                                                                    <option value="delivered">Delivered</option>
                                                                    <option value="cancelled">Cancelled</option>
                                                                </select>
                                                            </td>
                                                            <td className="text-end pe-4">
                                                                <button
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() => handleViewOrder(order.id)}
                                                                >
                                                                    View
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="d-md-none">
                                    {orders.map((order) => (
                                        <div key={order.id} className="card border-0 shadow-sm mb-3">
                                            <div className="card-body p-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <div className="fw-bold">Order #{order.id}</div>
                                                        <div className="small text-muted">{new Date(order.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                    <span className={`badge ${order.status === 'delivered' ? 'bg-success' :
                                                        order.status === 'cancelled' ? 'bg-danger' :
                                                            'bg-warning'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="small text-muted text-uppercase mb-1">Customer</div>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <div className="fw-semibold">{order.delivery_address?.name || `User ${order.user_id}`}</div>
                                                            <div className="small text-muted">{order.delivery_address?.phone}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between align-items-end">
                                                    <div>
                                                        <div className="small text-muted text-uppercase">Total</div>
                                                        <div className="fw-bold fs-5">₦{order.total_amount.toLocaleString()}</div>
                                                    </div>
                                                    <div className="d-flex flex-column gap-2">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={order.status}
                                                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="preparing">Preparing</option>
                                                            <option value="delivering">On Route</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                        <button
                                                            className="btn btn-primary btn-sm rounded-pill"
                                                            onClick={() => handleViewOrder(order.id)}
                                                        >
                                                            Manage
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Banks Tab */}
                        {activeTab === 'banks' && (
                            <div>
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                                    <h3 className="mb-0">Bank Accounts</h3>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowBankForm(true)}
                                    >
                                        <i className="ci-add me-2"></i>Add Bank Account
                                    </button>
                                </div>

                                {showBankForm && (
                                    <div className="card mb-4 border-0 shadow-sm">
                                        <div className="card-body">
                                            <form onSubmit={handleBankSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-4">
                                                        <label className="form-label">Bank Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={bankForm.bank_name}
                                                            onChange={e => setBankForm({ ...bankForm, bank_name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Account Number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={bankForm.account_number}
                                                            onChange={e => setBankForm({ ...bankForm, account_number: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="form-label">Account Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={bankForm.account_name}
                                                            onChange={e => setBankForm({ ...bankForm, account_name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12 text-end">
                                                        <button type="button" className="btn btn-secondary me-2" onClick={() => setShowBankForm(false)}>Cancel</button>
                                                        <button type="submit" className="btn btn-primary">Save Bank Account</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                <div className="row g-4">
                                    {banks.map(bank => (
                                        <div key={bank.id} className="col-md-6 col-lg-4">
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <div className="rounded-circle bg-light p-3">
                                                            <i className="ci-bank fs-4 text-primary"></i>
                                                        </div>
                                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteBank(bank.id)}>
                                                            <i className="ci-trash"></i>
                                                        </button>
                                                    </div>
                                                    <h5 className="card-title mb-1">{bank.bank_name}</h5>
                                                    <p className="text-muted small mb-3">{bank.account_name}</p>
                                                    <div className="bg-light p-2 rounded d-flex align-items-center justify-content-between">
                                                        <code className="fs-6 text-dark">{bank.account_number}</code>
                                                        <i className="ci-copy text-muted cursor-pointer" onClick={() => { navigator.clipboard.writeText(bank.account_number); toast.success('Copied!'); }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {banks.length === 0 && <p className="text-muted text-center col-12">No bank accounts added yet.</p>}
                                </div>
                            </div>
                        )}

                        {/* Messages Tab */}
                        {activeTab === 'messages' && (
                            <div>
                                <h3 className="mb-4">Contact Messages</h3>

                                {/* Desktop Table View */}
                                <div className="card border-0 shadow-sm d-none d-md-block">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Message</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {messages.map((msg) => (
                                                        <tr key={msg.id} className={msg.is_read ? '' : 'fw-bold bg-light-warning'}>
                                                            <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                                                            <td>{msg.name}</td>
                                                            <td><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                                                            <td style={{ maxWidth: '300px' }} className="text-truncate" title={msg.message}>
                                                                {msg.message}
                                                            </td>
                                                            <td>
                                                                {!msg.is_read && (
                                                                    <button
                                                                        className="btn btn-sm btn-outline-primary"
                                                                        onClick={async () => {
                                                                            await contactService.markAsRead(msg.id, localStorage.getItem('access_token') || '');
                                                                            setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
                                                                            toast.success('Marked as read');
                                                                        }}
                                                                    >
                                                                        Mark Read
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {messages.length === 0 && (
                                                        <tr>
                                                            <td colSpan={5} className="text-center py-4 text-muted">No messages found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Card View */}
                                <div className="d-md-none">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className="card border-0 shadow-sm mb-3">
                                            <div className="card-body p-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <div>
                                                        <div className="fw-bold">{msg.name}</div>
                                                        <a href={`mailto:${msg.email}`} className="small text-decoration-none">{msg.email}</a>
                                                    </div>
                                                    {!msg.is_read && <span className="badge bg-primary">New</span>}
                                                </div>
                                                <div className="small text-muted mb-2">{new Date(msg.created_at).toLocaleString()}</div>
                                                <div className="mb-3" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.message}</div>
                                                <div className="d-flex justify-content-end">
                                                    {!msg.is_read && (
                                                        <button
                                                            className="btn btn-sm btn-outline-primary w-100"
                                                            onClick={async () => {
                                                                await contactService.markAsRead(msg.id, localStorage.getItem('access_token') || '');
                                                                setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
                                                                toast.success('Marked as read');
                                                            }}
                                                        >
                                                            Mark Read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length === 0 && (
                                        <p className="text-center py-4 text-muted">No messages found.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable my-2 mx-auto">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowOrderModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        {/* Customer Details Section */}
                                        <h6 className="fw-bold mb-3 border-bottom pb-2">Customer Details</h6>
                                        {selectedOrder.user ? (
                                            <div className="mb-3">
                                                <p className="mb-1"><strong>Name:</strong> {selectedOrder.user.first_name} {selectedOrder.user.last_name}</p>
                                                <p className="mb-1"><strong>Email:</strong> {selectedOrder.user.email}</p>
                                                {selectedOrder.user.phone && <p className="mb-1"><strong>Phone:</strong> {selectedOrder.user.phone}</p>}
                                            </div>
                                        ) : (
                                            <p className="text-muted fst-italic">Guest or User Deleted</p>
                                        )}

                                        <h6 className="fw-bold mb-3 border-bottom pb-2 mt-4">Order Info</h6>
                                        <p className="mb-1"><strong>Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                                        <p className="mb-1"><strong>Status:</strong> <span className="badge bg-primary">{selectedOrder.status}</span></p>
                                        <p className="mb-1"><strong>Payment:</strong> {selectedOrder.payment_method} ({selectedOrder.payment_status})</p>
                                        {selectedOrder.notes && (
                                            <div className="mt-2 p-2 bg-light rounded">
                                                <small className="text-muted d-block fw-bold">Notes:</small>
                                                {selectedOrder.notes}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="fw-bold mb-3 border-bottom pb-2">Delivery Address</h6>
                                        <div className="bg-light p-3 rounded">
                                            <p className="mb-1">{selectedOrder.delivery_address.street}</p>
                                            <p className="mb-1">{selectedOrder.delivery_address.city}, {selectedOrder.delivery_address.state}</p>
                                            <p className="mb-1">{selectedOrder.delivery_address.country}</p>
                                            <p className="mb-0"><strong>Phone:</strong> {selectedOrder.delivery_address.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <h6 className="fw-bold mb-3 border-bottom pb-2">Order Items</h6>
                                <div className="table-responsive">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items.map((item: any) => (
                                                <tr key={item.id}>
                                                    <td>{item.product_name}</td>
                                                    <td>₦{item.price.toLocaleString()}</td>
                                                    <td>{item.quantity}</td>
                                                    <td className="text-end">₦{(item.price * item.quantity).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            <tr className="border-top fw-bold">
                                                <td colSpan={3} className="text-end">Subtotal</td>
                                                <td className="text-end">₦{(selectedOrder.total_amount || 0).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3} className="text-end text-muted">Delivery Fee</td>
                                                <td className="text-end text-muted">₦{(selectedOrder.delivery_fee || 0).toLocaleString()}</td>
                                            </tr>
                                            <tr className="fw-bold fs-5">
                                                <td colSpan={3} className="text-end text-primary">Total</td>
                                                <td className="text-end text-primary">₦{((selectedOrder.total_amount || 0) + (selectedOrder.delivery_fee || 0)).toLocaleString()}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer flex-wrap gap-2">
                                <div className="d-flex flex-wrap gap-2">
                                    {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                                        <div className="dropdown d-inline-block me-2">
                                            <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                Update Status
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><button className="dropdown-item" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'confirmed')}>Mark Confirmed</button></li>
                                                <li><button className="dropdown-item" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'preparing')}>Mark Preparing</button></li>
                                                <li><button className="dropdown-item" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivering')}>Mark On Route</button></li>
                                                <li><button className="dropdown-item" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}>Mark Delivered</button></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item text-danger" onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}>Cancel Order</button></li>
                                            </ul>
                                        </div>
                                    )}
                                    {selectedOrder.payment_status !== 'paid' && selectedOrder.status !== 'cancelled' && (
                                        <button className="btn btn-success text-white" onClick={() => handleConfirmPayment(selectedOrder.id)}>
                                            <i className="ci-check-circle me-1"></i> Confirm Payment
                                        </button>
                                    )}
                                </div>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
