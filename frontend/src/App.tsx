import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import PageTransition from './components/PageTransition';
import PopularItems from './components/PopularItems';
import SpecialProducts from './components/SpecialProducts';
import SpecialOffers from './components/SpecialOffers';
import Signin from './components/Signin';
import Signup from './components/Signup';
import VerifyOTP from './components/VerifyOTP';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import Menu from './components/Menu';
import UserDashboard from './components/UserDashboard';

import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

function HomePage() {
    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            {/* Popular Dishes Header */}
            <div className="container text-center mb-5 mt-5 pt-5">
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
                <PopularItems />
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
            <Router>
                <AuthProvider>
                    <CartProvider>
                        <Helmet>
                            <title>Urban Grille | Restaurant Ordering</title>
                        </Helmet>
                        <Toaster position="top-center" />
                        <AppHeader />
                        <main style={{ minHeight: '80vh' }}>
                            <PageTransition>
                                <Routes>
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/signin" element={<Signin />} />
                                    <Route path="/verify-email" element={<VerifyOTP />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/admin/*" element={<AdminDashboard />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                                    <Route path="/dashboard/*" element={<UserDashboard />} />
                                    <Route path="/menu" element={<Menu />} />
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="*" element={<HomePage />} />
                                </Routes>
                            </PageTransition>
                        </main>
                        <FloatingCart />
                        <Footer />
                    </CartProvider>
                </AuthProvider>
            </Router>
        </HelmetProvider>
    );
}

export default App;
