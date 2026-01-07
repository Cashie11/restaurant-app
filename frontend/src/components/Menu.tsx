import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PopularItems from './PopularItems';

const Menu: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'all';
    const searchQuery = searchParams.get('search') || '';

    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState<number | null>(null);
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        loadProducts();
    }, [activeCategory, searchQuery]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const products = await productService.getProducts(activeCategory, searchQuery);
            setMenuItems(products);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (localSearch) {
                params.set('search', localSearch);
            } else {
                params.delete('search');
            }
            setSearchParams(params);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [localSearch]);

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams);
        if (categoryId === 'all') {
            params.delete('category');
        } else {
            params.set('category', categoryId);
        }
        setSearchParams(params);
    };

    const handleAddToCart = async (e: React.MouseEvent, productId: number) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }

        setAddingId(productId);
        try {
            await addToCart(productId, 1);
            toast.success('Item added to cart successfully!');
        } catch (error: any) {
            console.error('Failed to add to cart:', error);
            const msg = error.response?.data?.detail || error.message || "Failed to add to cart";
            toast.error(`Error: ${msg}`);
        } finally {
            setAddingId(null);
        }
    };

    const categories = [
        { id: 'all', name: 'All Items' },
        { id: 'appetizers', name: 'Appetizers' },
        { id: 'main', name: 'Main Courses' },
        { id: 'pasta', name: 'Pasta & Pizza' },
        { id: 'seafood', name: 'Seafood' },
        { id: 'desserts', name: 'Desserts' },
        { id: 'beverages', name: 'Beverages' }
    ];

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading menu...</p>
                </div>
            </div>
        );
    }

    const filteredItems = menuItems;

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            {/* Header & Search */}
            <div className="container pt-5 pb-3">
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill mb-3">
                        <i className="ci-restaurant text-danger me-2"></i>
                        <span className="text-uppercase fw-semibold" style={{ fontSize: '12px', letterSpacing: '1px', color: '#FF6B35' }}>
                            FRESH MENU
                        </span>
                    </div>
                    <h1 className="display-4 fw-bold mb-3">Our Menu</h1>
                    <p className="lead text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Discover our delicious selection of fresh dishes
                    </p>

                    {/* Search Bar - Prominent on both mobile and desktop */}
                    <div className="mb-4">
                        <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <span className="input-group-text bg-white border-0 ps-3">
                                <i className="ci-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none ps-0"
                                placeholder="Search dishes..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                            />
                            {localSearch && (
                                <button
                                    className="btn btn-link text-muted border-0 pe-3"
                                    onClick={() => setLocalSearch('')}
                                    aria-label="Clear search"
                                >
                                    <i className="ci-close"></i>
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <div className="text-center mt-2 small text-muted">
                                Showing results for "<strong>{searchQuery}</strong>"
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Special Section: Popular Items - Only show if not searching/filtering deeply */}
            {activeCategory === 'all' && !searchQuery && (
                <div className="mb-4">
                    <PopularItems />
                </div>
            )}

            <div className="container pb-5">
                {/* Category Tabs - Scrollable on Mobile */}
                <div className="mb-5 position-relative">
                    <div className="d-flex flex-nowrap overflow-auto py-2 px-2 hide-scrollbar ps-md-0 justify-content-md-center bg-transparent"
                        style={{
                            gap: '12px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
                        }}>
                        <style>
                            {`
                                .hide-scrollbar::-webkit-scrollbar { display: none; }
                            `}
                        </style>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`btn rounded-pill px-4 py-2 fw-semibold flex-shrink-0 transition-all ${activeCategory === category.id
                                    ? 'btn-primary shadow-sm'
                                    : 'btn-white border shadow-sm text-dark'
                                    }`}
                                style={{
                                    fontSize: '14px',
                                    borderRadius: '50px',
                                    whiteSpace: 'nowrap',
                                    border: activeCategory === category.id ? 'none' : '1px solid #eee',
                                    transform: activeCategory === category.id ? 'scale(1.05)' : 'none'
                                }}
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid - 2 Column on Mobile */}
                <div className="row g-3">
                    {filteredItems.map((item, index) => (
                        <div key={item.id} className="col-6 col-md-4 col-lg-3 mb-3">
                            <div className="card h-100 border-0 shadow-sm custom-card" style={{
                                borderRadius: '16px',
                                overflow: 'hidden',
                                transition: 'transform 0.2s',
                                backgroundColor: '#fff'
                            }}>
                                <div className="position-relative">
                                    <div style={{ paddingTop: '75%' }}></div> {/* Aspect ratio 4:3 */}
                                    <img
                                        src={item.image_url || item.image || 'https://via.placeholder.com/300x200/cccccc/666666?text=No+Image'}
                                        alt={item.name}
                                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                                    />
                                    {item.rating && (
                                        <div className="position-absolute bottom-0 start-0 m-2 bg-white rounded-pill px-2 py-1 shadow-sm d-flex align-items-center" style={{ fontSize: '0.7rem' }}>
                                            <i className="bi bi-star-fill text-warning me-1"></i>
                                            <span className="fw-bold">{item.rating}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="card-body p-3 d-flex flex-column">
                                    <h3 className="card-title fw-bold text-dark mb-1 text-truncate" style={{ fontSize: '1rem' }}>
                                        {item.name}
                                    </h3>

                                    <p className="text-muted small mb-2 d-none d-md-block text-truncate-2" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                                        {item.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-bold text-primary fs-5">₦{item.price?.toLocaleString()}</span>
                                            {/* Stock badge only on desktop to save mobile space */}
                                            <span className="badge bg-light text-muted d-none d-md-inline-block">
                                                {item.stock_quantity || '99'} left
                                            </span>
                                        </div>

                                        <button
                                            className="btn w-100 btn-primary fw-semibold shadow-sm d-flex align-items-center justify-content-center"
                                            style={{
                                                borderRadius: '12px',
                                                padding: '8px',
                                                fontSize: '0.9rem'
                                            }}
                                            disabled={addingId === item.id}
                                            onClick={(e) => handleAddToCart(e, item.id)}
                                        >
                                            {addingId === item.id ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <>
                                                    <i className="bi bi-plus-lg me-1"></i>
                                                    ADD
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-5">
                        <div className="mb-4 text-muted">
                            <i className="ci-search display-1"></i>
                        </div>
                        <h3 className="mb-3" style={{ color: '#2d3436' }}>No items found</h3>
                        <p style={{ color: '#636e72' }}>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;