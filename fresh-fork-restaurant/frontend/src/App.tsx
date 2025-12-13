import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularItems from './components/PopularItems';
import SpecialProducts from './components/SpecialProducts';
import SpecialOffers from './components/SpecialOffers';
import Signin from './components/Signin';
import Signup from './components/Signup';
import VerifyOTP from './components/VerifyOTP';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import Menu from './components/Menu';
import UserDashboard from './components/UserDashboard';

import Checkout from './components/Checkout';

function HomePage() {
    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            <Hero />

            <Features />

            {/* Popular Dishes Header */}
            <div className="container text-center mb-5 mt-5">
                <div style={{
                    animation: 'fadeInDown 0.6s ease-out'
                }}>
                    <div className="d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill mb-3" style={{
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        <i className="ci-fire text-danger me-2"></i>
                        <span className="text-uppercase fw-semibold" style={{ fontSize: '12px', letterSpacing: '1px', color: '#FF6B35' }}>
                            TRENDING NOW
                        </span>
                    </div>
                    <h2 className="display-6 fw-bold mb-3">Popular Dishes</h2>
                    <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Our customers' favorite picks - fresh, delicious, and always in demand
                    </p>
                    <a href="/menu" className="btn btn-primary" style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '10px 30px',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                        }}>
                        View All Dishes
                    </a>
                </div>
            </div>

            <div className="container mb-5">
                <div className="row">
                    <div className="col-lg-3 d-none d-lg-block">
                        <div className="sticky-top" style={{ top: '100px', zIndex: 10 }}>
                            <aside className="h-100">
                                <div
                                    className="rounded-4 p-4 h-100"
                                    style={{
                                        background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE5D9 100%)',
                                        border: '2px solid #FFD4C4',
                                        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.1)'
                                    }}
                                >
                                    <div className="text-center mb-4">
                                        <h6 className="fw-bold mb-2" style={{ color: '#2d3436', fontSize: '1.1rem' }}>
                                            🍴 Categories
                                        </h6>
                                        <p className="fs-xs mb-0" style={{ color: '#636e72' }}>Browse by type</p>
                                    </div>

                                    <nav className="d-flex flex-column gap-2">
                                        <a
                                            href="#popular"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🔥
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Trending</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>124 products</div>
                                            </div>
                                        </a>

                                        <a
                                            href="#vegetables"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🥬
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Vegetables</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>89 products</div>
                                            </div>
                                        </a>

                                        <a
                                            href="#fruits"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🍎
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Fresh Fruits</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>156 products</div>
                                            </div>
                                        </a>

                                        <a
                                            href="#dairy"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🥛
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Dairy & Eggs</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>146 products</div>
                                            </div>
                                        </a>

                                        <a
                                            href="#bakery"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🥖
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Bakery</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>97 products</div>
                                            </div>
                                        </a>

                                        <a
                                            href="#meat"
                                            className="text-decoration-none d-flex align-items-center p-3 rounded-3"
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                transition: 'all 0.3s ease',
                                                border: '1px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FF6B35';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                                e.currentTarget.style.borderColor = '#FF6B35';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#FFFFFF';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.querySelectorAll('.category-text').forEach(el => {
                                                    (el as HTMLElement).style.color = '#2d3436';
                                                });
                                                e.currentTarget.querySelectorAll('.category-count').forEach(el => {
                                                    (el as HTMLElement).style.color = '#b2bec3';
                                                });
                                                e.currentTarget.querySelectorAll('.category-icon').forEach(el => {
                                                    (el as HTMLElement).style.backgroundColor = '#FFF5F0';
                                                });
                                            }}
                                        >
                                            <span
                                                className="category-icon d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{
                                                    width: '45px',
                                                    height: '45px',
                                                    backgroundColor: '#FFF5F0',
                                                    fontSize: '1.3rem',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🥩
                                            </span>
                                            <div className="flex-grow-1">
                                                <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Meat & Seafood</div>
                                                <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>178 products</div>
                                            </div>
                                        </a>
                                    </nav>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <PopularItems />
                    </div>
                </div>
            </div>

            <SpecialProducts />
            <SpecialOffers />
            <FloatingCart />
        </div>
    );
}

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <CartProvider>
                    <Helmet>
                        <title>Fresh Fork | Restaurant Ordering</title>
                    </Helmet>
                    <Router>
                        <AppHeader />
                        <main style={{ minHeight: '80vh' }}>
                            <Routes>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/verify-email" element={<VerifyOTP />} />
                                <Route path="/admin/*" element={<AdminDashboard />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/dashboard/*" element={<UserDashboard />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/" element={<HomePage />} />
                                <Route path="*" element={<HomePage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </Router>
                </CartProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
