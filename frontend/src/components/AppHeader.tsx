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
    const [scrolled, setScrolled] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    // Close the mobile menu on navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Add a shadow once the user scrolls
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home', icon: 'bi-house-door' },
        { path: '/menu', label: 'Menu', icon: 'bi-grid' },
        { path: '/about', label: 'About', icon: 'bi-info-circle' },
        { path: '/contact', label: 'Contact', icon: 'bi-envelope' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            window.location.href = `/menu?search=${encodeURIComponent(searchValue.trim())}`;
        }
    };

    const totalItems = cart?.total_items || 0;

    return (
        <>
            <style>{`
                .ug-header {
                    position: sticky;
                    top: 0;
                    z-index: 1030;
                    background: rgba(255, 255, 255, 0.86);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                    transition: box-shadow 0.25s ease;
                }
                .ug-header.scrolled { box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08); }

                .ug-header-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 12px 20px;
                    display: flex;
                    align-items: center;
                    gap: 18px;
                }

                .ug-brand {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .ug-brand-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 13px;
                    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 21px;
                    box-shadow: 0 5px 14px rgba(255, 107, 53, 0.35);
                }
                .ug-brand-text { display: flex; flex-direction: column; line-height: 1.05; }
                .ug-brand-name { font-weight: 700; font-size: 17px; color: #1a1a1a; letter-spacing: -0.3px; }
                .ug-brand-accent {
                    font-weight: 800;
                    font-size: 12px;
                    color: #FF6B35;
                    text-transform: uppercase;
                    letter-spacing: 2.5px;
                }

                .ug-nav { display: flex; align-items: center; gap: 3px; }
                .ug-nav-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 15px;
                    border-radius: 999px;
                    color: #5b6167;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 14px;
                    transition: all 0.2s ease;
                }
                .ug-nav-link i { font-size: 16px; }
                .ug-nav-link:hover { color: #FF6B35; background: rgba(255, 107, 53, 0.08); }
                .ug-nav-link.active { color: #FF6B35; background: rgba(255, 107, 53, 0.12); font-weight: 600; }

                .ug-search {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin-left: auto;
                    background: #f4f5f7;
                    border: 1px solid transparent;
                    border-radius: 999px;
                    padding: 9px 16px;
                    min-width: 200px;
                    flex: 0 1 280px;
                    color: #9aa0a6;
                    transition: all 0.2s ease;
                }
                .ug-search:focus-within {
                    background: #fff;
                    border-color: #FF6B35;
                    box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
                    color: #FF6B35;
                }
                .ug-search input {
                    border: none;
                    background: transparent;
                    outline: none;
                    flex: 1;
                    font-size: 14px;
                    color: #2d3436;
                    min-width: 0;
                }
                .ug-search input::placeholder { color: #a0a5ab; }
                .ug-search-clear {
                    border: none;
                    background: transparent;
                    color: #9aa0a6;
                    cursor: pointer;
                    padding: 0;
                    display: flex;
                }
                .ug-search-clear:hover { color: #FF6B35; }

                .ug-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

                .ug-cart {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 13px;
                    background: #f4f5f7;
                    color: #2d3436;
                    text-decoration: none;
                    font-size: 19px;
                    transition: all 0.2s ease;
                }
                .ug-cart:hover { background: rgba(255, 107, 53, 0.12); color: #FF6B35; }
                .ug-cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    min-width: 19px;
                    height: 19px;
                    padding: 0 5px;
                    border-radius: 999px;
                    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #fff;
                    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.4);
                }

                .ug-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 18px;
                    border-radius: 999px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    border: none;
                    cursor: pointer;
                    white-space: nowrap;
                }
                .ug-btn i { font-size: 15px; }
                .ug-btn-primary {
                    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(255, 107, 53, 0.3);
                }
                .ug-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 7px 20px rgba(255, 107, 53, 0.4); color: #fff; }
                .ug-btn-ghost {
                    background: transparent;
                    color: #2d3436;
                    border: 1.5px solid #e5e7eb;
                }
                .ug-btn-ghost:hover { border-color: #FF6B35; color: #FF6B35; background: rgba(255, 107, 53, 0.05); }
                .ug-btn-lg { padding: 13px 24px; font-size: 16px; width: 100%; justify-content: center; }

                .ug-burger {
                    display: none;
                    width: 42px;
                    height: 42px;
                    border-radius: 13px;
                    border: none;
                    background: #f4f5f7;
                    color: #2d3436;
                    font-size: 21px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                }
                .ug-burger:hover { background: rgba(255, 107, 53, 0.12); color: #FF6B35; }

                .ug-overlay {
                    position: fixed;
                    inset: 0;
                    background: #fff;
                    z-index: 2000;
                    padding: 18px 20px;
                    display: flex;
                    flex-direction: column;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-12px);
                    transition: all 0.28s ease;
                }
                .ug-overlay.open { opacity: 1; visibility: visible; transform: translateY(0); }
                .ug-overlay-top { display: flex; align-items: center; justify-content: space-between; }
                .ug-overlay-close {
                    width: 44px;
                    height: 44px;
                    border-radius: 13px;
                    border: none;
                    background: #f4f5f7;
                    color: #2d3436;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ug-overlay-close:hover { background: rgba(255, 107, 53, 0.12); color: #FF6B35; }
                .ug-overlay-nav { display: flex; flex-direction: column; gap: 6px; margin-top: 34px; flex: 1; }
                .ug-overlay-link {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 15px 20px;
                    border-radius: 15px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #2d3436;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .ug-overlay-link i { font-size: 22px; color: #FF6B35; width: 30px; text-align: center; }
                .ug-overlay-link:hover { background: #f7f8fa; }
                .ug-overlay-link.active { background: rgba(255, 107, 53, 0.1); color: #FF6B35; }
                .ug-overlay-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding-top: 18px;
                    border-top: 1px solid #f0f0f0;
                }

                @media (max-width: 991.98px) {
                    .ug-nav { display: none; }
                    .ug-search { display: none; }
                    .ug-actions .ug-btn { display: none; }
                    .ug-burger { display: flex; }
                    .ug-actions { margin-left: auto; }
                }
            `}</style>

            <header className={`ug-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="ug-header-inner">
                    {/* Brand */}
                    <Link to="/" className="ug-brand" aria-label="Urban Grille home">
                        <span className="ug-brand-icon"><i className="bi bi-fire"></i></span>
                        <span className="ug-brand-text">
                            <span className="ug-brand-name">Urban</span>
                            <span className="ug-brand-accent">Grille</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="ug-nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`ug-nav-link ${isActive(link.path) ? 'active' : ''}`}
                            >
                                <i className={`bi ${link.icon}`}></i>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Search */}
                    <form className="ug-search" onSubmit={handleSearch}>
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search dishes..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                            <button type="button" className="ug-search-clear" onClick={() => setSearchValue('')} aria-label="Clear search">
                                <i className="bi bi-x"></i>
                            </button>
                        )}
                    </form>

                    {/* Right actions */}
                    <div className="ug-actions">
                        <Link to="/cart" className="ug-cart" aria-label="Cart">
                            <i className="bi bi-bag"></i>
                            {totalItems > 0 && (
                                <span className="ug-cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <Link
                                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                className="ug-btn ug-btn-primary"
                            >
                                <i className="bi bi-person-circle"></i>
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link to="/signin" className="ug-btn ug-btn-ghost">
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    <span>Sign In</span>
                                </Link>
                                <Link to="/signup" className="ug-btn ug-btn-primary">
                                    <i className="bi bi-person-plus"></i>
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}

                        <button className="ug-burger" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </div>

            </header>

            {/* Mobile overlay */}
            <div className={`ug-overlay ${isMenuOpen ? 'open' : ''}`}>
                    <div className="ug-overlay-top">
                        <Link to="/" className="ug-brand" onClick={() => setIsMenuOpen(false)}>
                            <span className="ug-brand-icon"><i className="bi bi-fire"></i></span>
                            <span className="ug-brand-text">
                                <span className="ug-brand-name">Urban</span>
                                <span className="ug-brand-accent">Grille</span>
                            </span>
                        </Link>
                        <button className="ug-overlay-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <nav className="ug-overlay-nav">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`ug-overlay-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className={`bi ${link.icon}`}></i>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="ug-overlay-actions">
                        {isAuthenticated ? (
                            <Link
                                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                className="ug-btn ug-btn-primary ug-btn-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <i className="bi bi-person-circle"></i>
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link to="/signin" className="ug-btn ug-btn-ghost ug-btn-lg" onClick={() => setIsMenuOpen(false)}>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    <span>Sign In</span>
                                </Link>
                                <Link to="/signup" className="ug-btn ug-btn-primary ug-btn-lg" onClick={() => setIsMenuOpen(false)}>
                                    <i className="bi bi-person-plus"></i>
                                    <span>Create Account</span>
                                </Link>
                            </>
                        )}
                    </div>
            </div>
        </>
    );
};

export default AppHeader;
