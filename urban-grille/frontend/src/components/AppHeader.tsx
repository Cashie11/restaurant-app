import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const AppHeader: React.FC = () => {
    const { cart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold text-primary" to="/" style={{ fontSize: '1.5rem', zIndex: 1050 }}>
                    Urban Grille
                </Link>

                {/* Mobile Actions */}
                <div className="d-lg-none d-flex align-items-center gap-3" style={{ zIndex: 1050 }}>
                    <Link to="/cart" className="btn btn-link position-relative text-primary p-0 text-decoration-none">
                        <i className="ci-shopping-cart fs-2"></i>
                        {cart && cart.total_items > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: '0.7rem' }}>
                                {cart.total_items}
                            </span>
                        )}
                    </Link>

                    <button
                        className="btn p-0 border-0 d-flex align-items-center justify-content-center"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="collapse navbar-collapse d-none d-lg-block">
                    <form className="mx-auto" style={{ maxWidth: '400px', flex: '1' }} onSubmit={(e) => {
                        e.preventDefault();
                        if (searchValue.trim()) {
                            window.location.href = `/menu?search=${encodeURIComponent(searchValue.trim())}`;
                        }
                    }}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="search"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchValue.trim()) {
                                        e.preventDefault();
                                        window.location.href = `/menu?search=${encodeURIComponent(searchValue.trim())}`;
                                    }
                                }}
                            />
                            <button className="btn btn-outline-secondary" type="submit">
                                <i className="ci-search"></i>
                            </button>
                        </div>
                    </form>

                    <ul className="navbar-nav mx-3">
                        {['/', '/menu', '/about', '/contact'].map((path) => (
                            <li className="nav-item" key={path}>
                                <Link
                                    className={`nav-link ${isActive(path) ? 'active fw-bold' : ''}`}
                                    to={path}
                                >
                                    {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <Link to="/cart" className="btn btn-link position-relative text-primary">
                            <i className="ci-shopping-cart fs-5"></i>
                            {cart && cart.total_items > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.total_items}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <Link to={user?.role?.includes('admin') ? "/admin" : "/dashboard"} className="btn btn-primary rounded-pill px-4">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/signin" className="btn btn-outline-primary rounded-pill px-4">Sign In</Link>
                                <Link to="/signup" className="btn btn-primary rounded-pill px-4">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Full Screen Menu Overlay */}
                <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
                    {/* Close Button */}
                    <button
                        className="btn position-absolute top-0 end-0 m-3 p-2"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                        style={{ zIndex: 1060 }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
                        <nav className="mobile-nav w-100 text-center">
                            {['/', '/menu', '/about', '/contact'].map((path) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`mobile-nav-link ${isActive(path) ? 'active text-primary' : 'text-dark'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                                </Link>
                            ))}

                            <hr className="my-4 text-secondary opacity-25 w-50 mx-auto" />

                            {isAuthenticated ? (
                                <Link
                                    to={user?.role?.includes('admin') ? "/admin" : "/dashboard"}
                                    className="btn btn-primary btn-lg rounded-pill w-75 mb-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="d-flex flex-column gap-3 align-items-center w-100 px-4">
                                    <Link
                                        to="/signin"
                                        className="btn btn-outline-primary btn-lg rounded-pill w-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="btn btn-primary btn-lg rounded-pill w-100"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppHeader;
