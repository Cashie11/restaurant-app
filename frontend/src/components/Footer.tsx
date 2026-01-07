import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <>
            <style>
                {`
                    .minimal-footer {
                        background: #f8f9fa;
                        border-top: 1px solid #e9ecef;
                        padding: 3rem 0 2rem;
                    }
                    
                    .footer-brand {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #FF6B35;
                        text-decoration: none;
                        margin-bottom: 1rem;
                        display: inline-block;
                    }
                    
                    .footer-brand:hover {
                        color: #F7931E;
                        text-decoration: none;
                    }
                    
                    .footer-links {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    
                    .footer-links li {
                        margin-bottom: 0.5rem;
                    }
                    
                    .footer-links a {
                        color: #666;
                        text-decoration: none;
                        font-size: 0.9rem;
                        transition: color 0.3s ease;
                    }
                    
                    .footer-links a:hover {
                        color: #FF6B35;
                        text-decoration: none;
                    }
                    
                    .footer-bottom {
                        border-top: 1px solid #e9ecef;
                        margin-top: 2rem;
                        padding-top: 1.5rem;
                        text-align: center;
                    }
                    
                    .footer-bottom p {
                        color: #666;
                        font-size: 0.85rem;
                        margin: 0;
                    }
                    
                    .social-links {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1rem;
                    }
                    
                    .social-links a {
                        width: 36px;
                        height: 36px;
                        background: #FF6B35;
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        font-size: 0.9rem;
                    }
                    
                    .social-links a:hover {
                        background: #F7931E;
                        color: white;
                        text-decoration: none;
                        transform: translateY(-2px);
                    }
                `}
            </style>

            <footer className="minimal-footer">
                <div className="container">
                    <div className="row">
                        {/* Brand */}
                        <div className="col-lg-4 mb-4">
                            <Link to="/" className="footer-brand">
                                Urban Grille
                            </Link>
                            <p className="text-muted mb-3">
                                Authentic Nigerian delicacies delivered to your doorstep.
                            </p>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook">
                                    <i className="ci-facebook"></i>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <i className="ci-instagram"></i>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <i className="ci-twitter"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-4 mb-4">
                            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
                            <ul className="footer-links">
                                <li><Link to="/menu">Menu</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/cart">Cart</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-lg-4 mb-4">
                            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
                            <ul className="footer-links">
                                <li>Plot 123, Admiralty Way</li>
                                <li>Lekki Phase 1, Lagos</li>
                                <li>+234 801 234 5678</li>
                                <li>info@urbangrille.com</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="footer-bottom">
                        <p>
                            © 2024 Urban Grille. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
