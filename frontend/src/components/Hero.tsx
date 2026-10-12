import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <>
            <style>{`
                .ug-hero {
                    position: relative;
                    display: flex;
                    align-items: center;
                    min-height: 520px;
                    overflow: hidden;
                    background: #2b2118;
                }
                .ug-hero-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center right;
                }
                .ug-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(100deg, rgba(18, 13, 9, 0.92) 0%, rgba(24, 16, 10, 0.72) 45%, rgba(24, 16, 10, 0.25) 100%);
                }
                .ug-hero-inner {
                    position: relative;
                    z-index: 2;
                    padding: 80px 0;
                    max-width: 640px;
                }
                .ug-hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 999px;
                    background: rgba(255, 107, 53, 0.16);
                    border: 1px solid rgba(255, 107, 53, 0.4);
                    color: #ffb088;
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 22px;
                }
                .ug-hero-title {
                    font-size: clamp(2.2rem, 5vw, 3.6rem);
                    font-weight: 800;
                    line-height: 1.08;
                    color: #fff;
                    letter-spacing: -1px;
                    margin-bottom: 18px;
                }
                .ug-hero-title .grad {
                    background: linear-gradient(120deg, #FF6B35, #F7931E);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .ug-hero-sub {
                    color: rgba(255, 255, 255, 0.72);
                    font-size: 17px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                .ug-hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
                .ug-hero-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    border-radius: 999px;
                    font-size: 15px;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .ug-hero-btn-primary {
                    background: linear-gradient(135deg, #FF6B35, #F7931E);
                    color: #fff;
                    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.4);
                }
                .ug-hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(255, 107, 53, 0.5); color: #fff; }
                .ug-hero-btn-ghost {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                    border: 1.5px solid rgba(255, 255, 255, 0.35);
                    backdrop-filter: blur(6px);
                }
                .ug-hero-btn-ghost:hover { background: rgba(255, 255, 255, 0.16); color: #fff; border-color: #fff; }

                .ug-hero-stats {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 34px;
                    margin-top: 40px;
                }
                .ug-hero-stat { display: flex; flex-direction: column; }
                .ug-hero-stat .num { font-size: 24px; font-weight: 800; color: #fff; }
                .ug-hero-stat .lbl { font-size: 13px; color: rgba(255, 255, 255, 0.6); }

                @media (max-width: 767.98px) {
                    .ug-hero { min-height: 460px; }
                    .ug-hero-overlay { background: linear-gradient(160deg, rgba(18, 13, 9, 0.95) 0%, rgba(24, 16, 10, 0.7) 100%); }
                    .ug-hero-stats { gap: 24px; }
                }
            `}</style>

            <section className="ug-hero">
                <div className="ug-hero-bg" style={{ backgroundImage: 'url(/assets/img/home/grocery/hero-slider/01.jpg)' }} />
                <div className="ug-hero-overlay" />
                <div className="container">
                    <div className="ug-hero-inner">
                        <span className="ug-hero-badge">
                            <i className="bi bi-truck"></i> Free delivery for orders above ₦50,000
                        </span>
                        <h1 className="ug-hero-title">
                            Authentic Naija Flavors,<br />Delivered <span className="grad">Fresh</span>
                        </h1>
                        <p className="ug-hero-sub">
                            From smoky suya to rich jollof — real food, real spices, real vibes.
                            Order your favorites and have them delivered hot to your door.
                        </p>
                        <div className="ug-hero-actions">
                            <Link to="/menu" className="ug-hero-btn ug-hero-btn-primary">
                                <i className="bi bi-bag"></i> Order Now
                            </Link>
                            <Link to="/menu" className="ug-hero-btn ug-hero-btn-ghost">
                                View Menu <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="ug-hero-stats">
                            <div className="ug-hero-stat">
                                <span className="num">50+</span>
                                <span className="lbl">Fresh Dishes</span>
                            </div>
                            <div className="ug-hero-stat">
                                <span className="num">4.9</span>
                                <span className="lbl">Avg. Rating</span>
                            </div>
                            <div className="ug-hero-stat">
                                <span className="num">30min</span>
                                <span className="lbl">Avg. Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
