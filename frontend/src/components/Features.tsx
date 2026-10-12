import React from 'react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
    const categories = [
        { id: 1, title: 'Fresh Fish to Your Table', subtitle: '124 products', icon: 'bi-water', tint: '#fff0f0', accent: '#e74c3c' },
        { id: 2, title: 'Festive Specials', subtitle: '97 products', icon: 'bi-gift', tint: '#f1fcf0', accent: '#16a34a' },
        { id: 3, title: 'Organic Local Vegetables', subtitle: '156 products', icon: 'bi-flower1', tint: '#fbf7f0', accent: '#d97706' },
        { id: 4, title: 'Fresh Bakery Daily', subtitle: '89 products', icon: 'bi-egg-fried', tint: '#f0f7ff', accent: '#2563eb' },
    ];

    return (
        <>
            <style>{`
                .ug-feature-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    min-height: 240px;
                    border-radius: 20px;
                    padding: 26px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.04);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .ug-feature-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px rgba(0,0,0,0.08); }
                .ug-feature-icon {
                    width: 52px;
                    height: 52px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 16px;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
                }
                .ug-feature-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #2d3436;
                    text-decoration: none;
                }
                .ug-feature-link:hover { color: #FF6B35; }
            `}</style>

            <section className="container pt-4 pb-4 mb-2">
                <div className="row g-4">
                    {categories.map((category) => (
                        <div key={category.id} className="col-sm-6 col-lg-3">
                            <div className="ug-feature-card" style={{ backgroundColor: category.tint }}>
                                <div>
                                    <div className="ug-feature-icon" style={{ background: category.accent }}>
                                        <i className={`bi ${category.icon}`}></i>
                                    </div>
                                    <span className="d-block text-uppercase fw-semibold mb-2" style={{ fontSize: '12px', letterSpacing: '0.5px', color: '#8a8f94' }}>
                                        {category.subtitle}
                                    </span>
                                    <h3 className="h5 fw-bold mb-3" style={{ maxWidth: '85%', color: '#2d3436' }}>
                                        {category.title}
                                    </h3>
                                </div>
                                <Link to="/menu" className="ug-feature-link">
                                    Shop now <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Features;
