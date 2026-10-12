import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <>
            <style>{`
                .ug-footer {
                    background: #17130f;
                    color: rgba(255, 255, 255, 0.72);
                    margin-top: 60px;
                }
                .ug-footer-top {
                    padding: 56px 0 40px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .ug-footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    margin-bottom: 16px;
                }
                .ug-footer-brand-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 11px;
                    background: linear-gradient(135deg, #FF6B35, #F7931E);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 19px;
                }
                .ug-footer-brand-text { line-height: 1.05; }
                .ug-footer-brand-name { font-weight: 700; font-size: 16px; color: #fff; }
                .ug-footer-brand-accent { font-weight: 800; font-size: 11px; color: #FF6B35; text-transform: uppercase; letter-spacing: 2px; }

                .ug-footer h6 {
                    color: #fff;
                    font-weight: 700;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 18px;
                }
                .ug-footer-links { list-style: none; padding: 0; margin: 0; }
                .ug-footer-links li { margin-bottom: 11px; }
                .ug-footer-links a {
                    color: rgba(255, 255, 255, 0.72);
                    text-decoration: none;
                    font-size: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: color 0.2s ease;
                }
                .ug-footer-links a:hover { color: #FF6B35; }
                .ug-footer-links i { font-size: 14px; color: #FF6B35; }

                .ug-footer-social { display: flex; gap: 10px; margin-top: 18px; }
                .ug-footer-social a {
                    width: 38px;
                    height: 38px;
                    border-radius: 11px;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    font-size: 16px;
                    transition: all 0.2s ease;
                }
                .ug-footer-social a:hover { background: linear-gradient(135deg, #FF6B35, #F7931E); border-color: transparent; transform: translateY(-2px); }

                .ug-footer-bottom {
                    padding: 20px 0;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    font-size: 13px;
                }
                .ug-footer-bottom .links a { color: rgba(255, 255, 255, 0.5); text-decoration: none; margin-left: 18px; }
                .ug-footer-bottom .links a:hover { color: #FF6B35; }
            `}</style>

            <footer className="ug-footer">
                <div className="container">
                    <div className="ug-footer-top">
                        <div className="row g-4">
                            {/* Brand */}
                            <div className="col-lg-4">
                                <Link to="/" className="ug-footer-brand">
                                    <span className="ug-footer-brand-icon"><i className="bi bi-fire"></i></span>
                                    <span className="ug-footer-brand-text">
                                        <span className="ug-footer-brand-name d-block">Urban</span>
                                        <span className="ug-footer-brand-accent d-block">Grille</span>
                                    </span>
                                </Link>
                                <p className="mb-3" style={{ maxWidth: '320px' }}>
                                    Authentic Nigerian delicacies delivered hot to your doorstep.
                                    Real spices, real flavor, real vibes.
                                </p>
                                <div className="ug-footer-social">
                                    <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                                    <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-6 col-lg-2">
                                <h6>Explore</h6>
                                <ul className="ug-footer-links">
                                    <li><Link to="/"><i className="bi bi-house-door"></i> Home</Link></li>
                                    <li><Link to="/menu"><i className="bi bi-grid"></i> Menu</Link></li>
                                    <li><Link to="/about"><i className="bi bi-info-circle"></i> About</Link></li>
                                    <li><Link to="/contact"><i className="bi bi-envelope"></i> Contact</Link></li>
                                </ul>
                            </div>

                            {/* Account */}
                            <div className="col-6 col-lg-3">
                                <h6>Account</h6>
                                <ul className="ug-footer-links">
                                    <li><Link to="/signin"><i className="bi bi-box-arrow-in-right"></i> Sign In</Link></li>
                                    <li><Link to="/signup"><i className="bi bi-person-plus"></i> Sign Up</Link></li>
                                    <li><Link to="/cart"><i className="bi bi-bag"></i> My Cart</Link></li>
                                    <li><Link to="/dashboard"><i className="bi bi-person"></i> Dashboard</Link></li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div className="col-lg-3">
                                <h6>Get in Touch</h6>
                                <ul className="ug-footer-links">
                                    <li><i className="bi bi-geo-alt"></i> Festac, Lagos, Nigeria</li>
                                    <li><a href="tel:+2349092039570"><i className="bi bi-telephone"></i> +234 909 203 9570</a></li>
                                    <li><a href="mailto:frankizuchukwu094@gmail.com"><i className="bi bi-envelope"></i> frankizuchukwu094@gmail.com</a></li>
                                    <li><i className="bi bi-clock"></i> Mon–Sun: 11AM – 11PM</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="ug-footer-bottom">
                        <span>© {new Date().getFullYear()} Urban Grille. All rights reserved.</span>
                        <span className="links">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                        </span>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
