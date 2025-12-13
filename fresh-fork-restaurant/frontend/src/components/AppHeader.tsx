import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const AppHeader: React.FC = () => {
    const { cart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center me-4" to="/">
                    <span className="fw-bolder text-primary display-6 me-1" style={{ fontSize: '1.75rem' }}>FreshFork</span>
                </Link>

                {/* Search Bar - Hidden on mobile */}
                <div className="input-group d-none d-lg-flex mx-4" style={{ maxWidth: '400px' }}>
                    <input
                        type="text"
                        className="form-control rounded-pill-start border-end-0"
                        placeholder="Search for products..."
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-secondary rounded-pill-end border-start-0 bg-white" type="button">
                        <i className="ci-search"></i>
                    </button>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/menu') ? 'active fw-bold' : ''}`} to="/menu">Menu</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/about') ? 'active fw-bold' : ''}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/contact') ? 'active fw-bold' : ''}`} to="/contact">Contact</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        {/* Cart Button */}
                        <Link to="/cart" className="btn btn-outline-primary border-0 position-relative me-3">
                            <i className="ci-shopping-cart fs-lg"></i>
                            {cart && cart.total_items > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart.total_items}
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            )}
                        </Link>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <Link
                                to={user?.role === 'admin' || user?.role === 'super_admin' ? "/admin" : "/dashboard"}
                                className="btn btn-primary rounded-pill px-4"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/signin" className="btn btn-primary rounded-pill px-4">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
