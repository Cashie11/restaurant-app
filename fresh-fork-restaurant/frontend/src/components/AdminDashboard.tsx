import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import { productService, Product, ProductCreate } from '../services/productService';

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
                setUsers(data.users);
            } else if (activeTab === 'orders') {
                const data = await adminService.getOrders(0, 100, orderStatusFilter);
                setOrders(data.orders);
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
            alert('Failed to save product');
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
            alert('Failed to delete product');
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
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user');
        }
    };

    const handleUpdateOrderStatus = async (orderId: number, status: string) => {
        try {
            await adminService.updateOrderStatus(orderId, status);
            loadTabData();
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Failed to update order status');
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header */}
            <div className="bg-white border-bottom shadow-sm">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <h4 className="mb-0">
                                <i className="ci-settings me-2" style={{ color: '#FF6B35' }}></i>
                                Admin Panel
                            </h4>
                            <small className="text-muted">Welcome, {user.first_name}!</small>
                        </div>
                        <div className="d-flex gap-2">
                            <button onClick={() => navigate('/')} className="btn btn-outline-primary">
                                <i className="ci-home me-2"></i>Back to Site
                            </button>
                            <button onClick={logout} className="btn btn-outline-danger">
                                <i className="ci-sign-out me-2"></i>Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white border-bottom">
                <div className="container-fluid">
                    <ul className="nav nav-tabs border-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                                style={{ border: 'none', borderBottom: activeTab === 'dashboard' ? '3px solid #FF6B35' : 'none' }}
                            >
                                <i className="ci-dashboard me-2"></i>Dashboard
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                                onClick={() => setActiveTab('products')}
                                style={{ border: 'none', borderBottom: activeTab === 'products' ? '3px solid #FF6B35' : 'none' }}
                            >
                                <i className="ci-bag me-2"></i>Products
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveTab('users')}
                                style={{ border: 'none', borderBottom: activeTab === 'users' ? '3px solid #FF6B35' : 'none' }}
                            >
                                <i className="ci-user me-2"></i>Users
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                                style={{ border: 'none', borderBottom: activeTab === 'orders' ? '3px solid #FF6B35' : 'none' }}
                            >
                                <i className="ci-cart me-2"></i>Orders
                            </button>
                        </li>
                    </ul>
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
                                <div className="row g-4 mb-4">
                                    <div className="col-md-3">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                            <div className="card-body text-white">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="mb-0 opacity-75">Total Users</h6>
                                                    <i className="ci-user fs-3"></i>
                                                </div>
                                                <h2 className="mb-0">{stats?.total_users || 0}</h2>
                                                <small className="opacity-75">+{stats?.new_users_week || 0} this week</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' }}>
                                            <div className="card-body text-white">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="mb-0 opacity-75">Total Orders</h6>
                                                    <i className="ci-bag fs-3"></i>
                                                </div>
                                                <h2 className="mb-0">{stats?.total_orders || 0}</h2>
                                                <small className="opacity-75">+{stats?.new_orders_week || 0} this week</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                            <div className="card-body text-white">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="mb-0 opacity-75">Pending Orders</h6>
                                                    <i className="ci-time fs-3"></i>
                                                </div>
                                                <h2 className="mb-0">{stats?.pending_orders || 0}</h2>
                                                <small className="opacity-75">Needs attention</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card border-0 shadow-sm h-100" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                            <div className="card-body text-white">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h6 className="mb-0 opacity-75">Total Revenue</h6>
                                                    <i className="ci-dollar fs-3"></i>
                                                </div>
                                                <h2 className="mb-0">${stats?.total_revenue?.toFixed(2) || '0.00'}</h2>
                                                <small className="opacity-75">All time</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-white border-0 py-3">
                                                <h5 className="mb-0">Recent Users</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
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
                                                                            className="btn btn-sm btn-outline-danger"
                                                                            onClick={() => handleDeleteUser(user.id)}
                                                                            disabled={user.role === 'admin'}
                                                                            title="Delete User"
                                                                        >
                                                                            <i className="ci-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-white border-0 py-3">
                                                <h5 className="mb-0">Recent Orders</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table table-hover mb-0">
                                                        <thead className="bg-light">
                                                            <tr>
                                                                <th>Order ID</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {recentOrders.map((order: any) => (
                                                                <tr key={order.id}>
                                                                    <td className="fw-semibold">#{order.id}</td>
                                                                    <td className="text-success">${order.total_amount.toFixed(2)}</td>
                                                                    <td>
                                                                        <span className={`badge ${order.status === 'delivered' ? 'bg-success' :
                                                                            order.status === 'pending' ? 'bg-warning' :
                                                                                order.status === 'processing' ? 'bg-info' :
                                                                                    'bg-secondary'
                                                                            }`}>
                                                                            {order.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-muted small">
                                                                        {new Date(order.created_at).toLocaleDateString()}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
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
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3>Product Management</h3>
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
                                                            className="form-control"
                                                            value={productForm.image_url}
                                                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                                                            placeholder="https://example.com/image.jpg"
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
                                                        <div className="d-flex gap-4">
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
                                <div className="card border-0 shadow-sm">
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
                                                            <td className="text-success fw-semibold">${product.price.toFixed(2)}</td>
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
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3>User Management</h3>
                                    <div className="input-group" style={{ maxWidth: '300px' }}>
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

                                <div className="card border-0 shadow-sm">
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
                                                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                                                    {user.role}
                                                                </span>
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
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3>Order Management</h3>
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
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-hover mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>User ID</th>
                                                        <th>Amount</th>
                                                        <th>Payment</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order: any) => (
                                                        <tr key={order.id}>
                                                            <td className="fw-semibold">#{order.id}</td>
                                                            <td>{order.user_id}</td>
                                                            <td className="text-success fw-semibold">${order.total_amount.toFixed(2)}</td>
                                                            <td>
                                                                <span className="badge bg-info">{order.payment_method}</span>
                                                            </td>
                                                            <td>
                                                                <select
                                                                    className={`form-select form-select-sm ${order.status === 'delivered' ? 'bg-success text-white' :
                                                                        order.status === 'pending' ? 'bg-warning' :
                                                                            order.status === 'processing' ? 'bg-info text-white' :
                                                                                'bg-secondary text-white'
                                                                        }`}
                                                                    value={order.status}
                                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="processing">Processing</option>
                                                                    <option value="shipped">Shipped</option>
                                                                    <option value="delivered">Delivered</option>
                                                                    <option value="cancelled">Cancelled</option>
                                                                </select>
                                                            </td>
                                                            <td className="text-muted small">
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
