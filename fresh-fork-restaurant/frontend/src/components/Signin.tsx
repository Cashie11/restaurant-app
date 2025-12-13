import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Signin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const state = (location.state || {}) as { message?: string };
        if (state.message) {
            setSuccessMessage(state.message);
            // Clear the message from history state so it doesn't persist on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.signin({ email, password });
            await login(response.access_token, response.refresh_token);
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.detail || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="content-wrapper w-100 px-3 ps-lg-5 pe-lg-4 mx-auto" style={{
            maxWidth: '1920px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            minHeight: '100vh'
        }}>
            <div className="d-lg-flex">
                {/* Login form + Footer */}
                <div className="d-flex flex-column min-vh-100 w-100 py-4 mx-auto me-lg-5" style={{ maxWidth: '416px' }}>

                    {/* Navigation Bar */}
                    <header className="navbar navbar-expand-lg px-0 pb-4 mt-n2 mt-sm-0 mb-2 mb-md-3 mb-lg-4">
                        <Link to="/" className="navbar-brand pt-0 text-white">
                            <span className="d-flex flex-shrink-0 me-2" style={{ fontSize: '1.5rem' }}>
                                🍴
                            </span>
                            <span className="fw-bold">Fresh Fork</span>
                        </Link>

                        {/* Hamburger Menu Button */}
                        <button
                            className="navbar-toggler border-0 p-0 ms-auto d-sm-none"
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ boxShadow: 'none' }}
                        >
                            <div className="d-flex flex-column justify-content-center" style={{ width: '24px', height: '24px' }}>
                                <span style={{
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#fff',
                                    margin: '2px 0',
                                    transition: 'all 0.3s ease',
                                    transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0deg)'
                                }} />
                                <span style={{
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#fff',
                                    margin: '2px 0',
                                    transition: 'all 0.3s ease',
                                    opacity: isMenuOpen ? 0 : 1
                                }} />
                                <span style={{
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#fff',
                                    margin: '2px 0',
                                    transition: 'all 0.3s ease',
                                    transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0deg)'
                                }} />
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="ms-auto d-none d-sm-block">
                            <ul className="navbar-nav flex-row gap-3">
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium text-white" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium text-white" to="/menu">Menu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium text-white" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fw-medium text-white" to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    {/* Mobile Menu Dropdown */}
                    {isMenuOpen && (
                        <div className="d-sm-none mb-3" style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '12px',
                            padding: '16px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            <nav>
                                <ul className="navbar-nav gap-2">
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium" to="/" onClick={() => setIsMenuOpen(false)} style={{ color: '#FF6B35' }}>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium" to="/menu" onClick={() => setIsMenuOpen(false)} style={{ color: '#FF6B35' }}>Menu</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium" to="/about" onClick={() => setIsMenuOpen(false)} style={{ color: '#FF6B35' }}>About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium" to="/contact" onClick={() => setIsMenuOpen(false)} style={{ color: '#FF6B35' }}>Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="bg-white rounded-4 shadow-lg p-4 p-md-5 mt-auto mb-auto" style={{
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}>
                        <h1 className="h2 mb-2" style={{ color: '#2d3436' }}>Welcome back</h1>
                        <div className="mb-4" style={{ color: '#636e72' }}>
                            Don't have an account?
                            <Link className="text-decoration-none ms-2 fw-semibold" to="/signup" style={{ color: '#FF6B35' }}>Create an account</Link>
                        </div>

                        {successMessage && (
                            <div className="alert alert-success border-0 rounded-3 mb-4" role="alert">
                                <i className="ci-check-circle me-2"></i>{successMessage}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger border-0 rounded-3 mb-4" role="alert">
                                <i className="ci-close-circle me-2"></i>{error}
                            </div>
                        )}

                        {/* Form */}
                        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                            <div className="position-relative mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg border-0 shadow-sm"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '14px 18px'
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <div className="password-toggle">
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control form-control-lg border-0 shadow-sm"
                                            placeholder="Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '12px 0 0 12px',
                                                padding: '14px 18px'
                                            }}
                                        />
                                        <button
                                            className="btn border-0 shadow-sm"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '0 12px 12px 0',
                                                color: '#FF6B35'
                                            }}
                                        >
                                            <i className={`ci-${showPassword ? 'eye' : 'eye-off'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="form-check me-2">
                                    <input type="checkbox" className="form-check-input" id="remember-30" style={{ borderColor: '#dfe6e9' }} />
                                    <label htmlFor="remember-30" className="form-check-label" style={{ color: '#636e72', fontSize: '0.9rem' }}>Remember me</label>
                                </div>
                                <div className="nav">
                                    <a className="nav-link p-0" href="/forgot-password" style={{ color: '#FF6B35', textDecoration: 'none', fontSize: '0.9rem' }}>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-lg w-100 text-white fw-semibold shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    opacity: loading ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                                    }
                                }}
                            >
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <footer className="mt-auto pt-4 text-center text-white">
                        <div className="mb-3">
                            <a className="text-white text-decoration-none opacity-75 hover-opacity-100" href="/help">Need help?</a>
                        </div>
                        <p className="fs-xs mb-0 opacity-75">
                            &copy; All rights reserved. Made by Fresh Fork
                        </p>
                    </footer>
                </div>

                {/* Food Image Section - Desktop Only */}
                <div className="d-none d-lg-block w-100 py-4 ms-auto" style={{ maxWidth: '1034px' }}>
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 rounded-5 overflow-hidden position-relative" style={{ minHeight: '600px' }}>
                        <img
                            src="/assets/img/home/grocery/hero-slider/01.jpg"
                            alt="Fresh Food"
                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                            style={{ objectPosition: 'center' }}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(109, 175, 202, 0.85)' }}></div>
                        <div className="position-relative z-2 text-center text-white p-5">
                            <h2 className="display-5 fw-bold mb-4">🍴 Welcome Back!</h2>
                            <p className="fs-4 mb-3">Sign in to access your favorite dishes</p>
                            <p className="fs-5 opacity-75">Fresh ingredients delivered to your table</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signin;
