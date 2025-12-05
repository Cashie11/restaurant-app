import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularItems from './components/PopularItems';
import SpecialProducts from './components/SpecialProducts';
import SpecialOffers from './components/SpecialOffers';
import Menu from './components/Menu';
import Signup from './components/Signup';
import Signin from './components/Signin';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Modern Header component with working mobile menu
const AppHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showCategoryBar, setShowCategoryBar] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, user, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      // Clear any pending timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Throttle the scroll detection
      scrollTimeoutRef.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);

        // Only trigger if scroll difference is significant (reduces twitching)
        if (scrollDifference > 10) {
          // Hide category bar when scrolling down past 150px
          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setShowCategoryBar(false);
          }
          // Show when scrolling up
          else if (currentScrollY < lastScrollY) {
            setShowCategoryBar(true);
          }

          setLastScrollY(currentScrollY);
        }
      }, 50); // 50ms throttle for smooth performance
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-white sticky-top" style={{ top: 0, zIndex: 1030 }}>
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold fresh-orange" href="/">
            🍴 Fresh Fork
          </a>

          {/* Modern Hamburger Menu Button */}
          <button
            className="navbar-toggler border-0 p-2"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            style={{ boxShadow: 'none' }}
          >
            <div className="d-flex flex-column justify-content-center" style={{ width: '24px', height: '24px' }}>
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#2d3436',
                  margin: '2px 0',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0deg)'
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#2d3436',
                  margin: '2px 0',
                  transition: 'all 0.3s ease',
                  opacity: isMenuOpen ? 0 : 1
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#2d3436',
                  margin: '2px 0',
                  transition: 'all 0.3s ease',
                  transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0deg)'
                }}
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse d-lg-block" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/menu">
                  <i className="ci-utensils me-1"></i>Menu
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-medium" href="/contact">Contact</a>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <div className="input-group me-3 d-none d-md-flex" style={{ width: '300px' }}>
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Search dishes..."
                  style={{ fontSize: '0.9rem' }}
                />
                <button className="btn btn-outline-secondary border-0 bg-light" type="button">
                  🔍
                </button>
              </div>

              <button className="btn btn-outline-secondary me-2 d-none d-md-flex align-items-center">
                🛒 <span className="badge bg-primary ms-1">0</span>
              </button>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn btn-fresh d-none d-md-flex align-items-center gap-2 text-decoration-none"
                >
                  <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {user?.first_name?.charAt(0) || 'U'}
                  </div>
                  <span>{user?.first_name}</span>
                </Link>
              ) : (
                <Link className="btn btn-fresh d-none d-md-block" to="/signup">Sign Up</Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed-top d-lg-none ${isMenuOpen ? 'show' : ''}`}
        style={{
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="container py-4">
          <div className="row">
            <div className="col-12">
              {/* Mobile Navigation */}
              <ul className="navbar-nav">
                <li className="nav-item mb-3">
                  <a
                    className="nav-link d-flex align-items-center p-3 rounded-3 bg-light hover-bg-primary hover-text-white"
                    href="/"
                    onClick={toggleMenu}
                    style={{ fontSize: '1.1rem', fontWeight: '500' }}
                  >
                    <span className="me-3 fs-5">🏠</span>
                    Home
                  </a>
                </li>
                <li className="nav-item mb-3">
                  <a
                    className="nav-link d-flex align-items-center p-3 rounded-3 bg-light hover-bg-primary hover-text-white"
                    href="/menu"
                    onClick={toggleMenu}
                    style={{ fontSize: '1.1rem', fontWeight: '500' }}
                  >
                    <span className="me-3 fs-5">📋</span>
                    Menu
                  </a>
                </li>
                <li className="nav-item mb-3">
                  <a
                    className="nav-link d-flex align-items-center p-3 rounded-3 bg-light hover-bg-primary hover-text-white"
                    href="/about"
                    onClick={toggleMenu}
                    style={{ fontSize: '1.1rem', fontWeight: '500' }}
                  >
                    <span className="me-3 fs-5">ℹ️</span>
                    About
                  </a>
                </li>
                <li className="nav-item mb-4">
                  <a
                    className="nav-link d-flex align-items-center p-3 rounded-3 bg-light hover-bg-primary hover-text-white"
                    href="/contact"
                    onClick={toggleMenu}
                    style={{ fontSize: '1.1rem', fontWeight: '500' }}
                  >
                    <span className="me-3 fs-5">📞</span>
                    Contact
                  </a>
                </li>
              </ul>

              {/* Mobile Search */}
              <div className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search dishes..."
                    style={{ fontSize: '1rem' }}
                  />
                  <button className="btn btn-outline-secondary border-0 bg-light" type="button">
                    🔍
                  </button>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="d-grid gap-3">
                <button className="btn btn-primary d-flex align-items-center justify-content-center py-3">
                  🛒 Cart <span className="badge bg-light text-primary ms-2">0</span>
                </button>
                {isAuthenticated ? (
                  <>
                    <div className="bg-light rounded-3 p-3 mb-2">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                          {user?.first_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="fw-bold">{user?.first_name} {user?.last_name}</div>
                          <small className="text-muted">{user?.email}</small>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <Link className="btn btn-outline-primary btn-sm" to="/dashboard" onClick={toggleMenu}>
                          <i className="ci-user me-2"></i>Dashboard
                        </Link>
                        {user?.role === 'admin' && (
                          <Link className="btn btn-outline-primary btn-sm" to="/admin" onClick={toggleMenu}>
                            <i className="ci-settings me-2"></i>Admin Panel
                          </Link>
                        )}
                        <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); toggleMenu(); }}>
                          <i className="ci-sign-out me-2"></i>Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-outline-primary py-3" to="/signin" onClick={toggleMenu}>Sign In</Link>
                    <Link className="btn btn-fresh py-3" to="/signup" onClick={toggleMenu}>Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar - Auto-hide on scroll */}
      {!isMenuOpen && (
        <div
          className="bg-white border-bottom sticky-top category-nav"
          style={{
            top: '70px',
            zIndex: 1020,
            transform: showCategoryBar ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
            opacity: showCategoryBar ? 1 : 0,
            visibility: showCategoryBar ? 'visible' : 'hidden'
          }}
        >
          <div className="container">
            <div className="d-flex align-items-center overflow-auto py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <a href="#popular" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-danger me-2">🔥</span>
                  <span className="fw-medium text-dark">Popular</span>
                </div>
              </a>
              <a href="#vegetables" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2">🥬</span>
                  <span className="fw-medium text-dark">Vegetables</span>
                </div>
              </a>
              <a href="#fruits" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning me-2">🍎</span>
                  <span className="fw-medium text-dark">Fruits</span>
                </div>
              </a>
              <a href="#dairy" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-info me-2">🥛</span>
                  <span className="fw-medium text-dark">Dairy</span>
                </div>
              </a>
              <a href="#bakery" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-secondary me-2">🥖</span>
                  <span className="fw-medium text-dark">Bakery</span>
                </div>
              </a>
              <a href="#meat" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">🥩</span>
                  <span className="fw-medium text-dark">Meat</span>
                </div>
              </a>
              <a href="#seafood" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-2">🐟</span>
                  <span className="fw-medium text-dark">Seafood</span>
                </div>
              </a>
              <a href="#beverages" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-dark me-2">🥤</span>
                  <span className="fw-medium text-dark">Beverages</span>
                </div>
              </a>
              <a href="#desserts" className="text-decoration-none me-4 flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-pink me-2">🍰</span>
                  <span className="fw-medium text-dark">Desserts</span>
                </div>
              </a>
              <a href="#specials" className="text-decoration-none flex-shrink-0">
                <div className="d-flex align-items-center">
                  <span className="badge bg-gradient me-2">⭐</span>
                  <span className="fw-medium text-dark">Specials</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function HomePage() {
  return (
    <div className="container pt-md-4 pb-5 mt-md-2 mt-lg-3 mb-2 mb-sm-3 mb-lg-4 mb-xl-5">
      <Hero />
      <Features />

      {/* Popular Dishes Header */}
      <div className="text-center mb-5">
        <div className="d-inline-block mb-3" style={{
          background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5F0 100%)',
          padding: '12px 24px',
          borderRadius: '50px',
          border: '2px solid #FFD4C4'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🔥</span>
          <span className="ms-2 fw-bold" style={{ color: '#FF6B35' }}>TRENDING NOW</span>
        </div>
        <h2 className="display-5 fw-bold mb-3" style={{ color: '#2d3436' }}>Popular Dishes</h2>
        <p className="lead" style={{ color: '#636e72', maxWidth: '600px', margin: '0 auto' }}>
          Our customers' favorite picks - fresh, delicious, and always in demand
        </p>
        <a
          href="/menu"
          className="btn mt-3 px-4 py-2 fw-semibold text-white"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            border: 'none',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View All Dishes <i className="ci-chevron-right ms-1"></i>
        </a>
      </div>

      {/* Popular Items with Category Sidebar */}
      <div className="row g-4">
        {/* Category Sidebar - Modern Design */}
        <aside className="col-lg-3 d-none d-lg-block">
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
                href="#weekly-sale"
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
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Weekly sale</div>
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
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Fresh fruits</div>
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
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Dairy and eggs</div>
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
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Bakery & bread</div>
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
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Meat products</div>
                  <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>178 products</div>
                </div>
              </a>

              <a
                href="#beverages"
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
                  🥤
                </span>
                <div className="flex-grow-1">
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Beverages</div>
                  <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>372 products</div>
                </div>
              </a>

              <a
                href="#desserts"
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
                  🍰
                </span>
                <div className="flex-grow-1">
                  <div className="category-text fw-semibold" style={{ color: '#2d3436', transition: 'color 0.3s ease' }}>Desserts</div>
                  <div className="category-count fs-xs" style={{ color: '#b2bec3', transition: 'color 0.3s ease' }}>213 products</div>
                </div>
              </a>
            </nav>
          </div>
        </aside>

        {/* Popular Items */}
        <div className="col-lg-9">
          <PopularItems />
        </div>
      </div>

      {/* Special Products Section */}
      <SpecialProducts />

      {/* Special Offers Section */}
      <SpecialOffers />
    </div>
  );
}



function App() {
  return (
    <AuthProvider>
      <Helmet>
        <link rel="stylesheet" href="/assets/css/theme.min.css" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard/*" element={
            <div>
              <AppHeader />
              <UserDashboard />
              <Footer />
            </div>
          } />
          <Route path="*" element={
            <div>
              <AppHeader />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<Menu />} />
              </Routes>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
