import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-warm)', minHeight: '100vh', color: 'var(--secondary)' }}>
            <style>
                {`
                    .hero-pattern-bg {
                        background-color: var(--bg-warm);
                        position: relative;
                        overflow: hidden;
                    }
                    .text-gradient {
                        background: linear-gradient(135deg, var(--brand-green) 0%, var(--primary) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    .svg-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    .minimal-card {
                        background: var(--bg-surface);
                        border: 1px solid rgba(0,0,0,0.05);
                        border-radius: 24px;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    .minimal-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(0, 107, 60, 0.08); /* Green shadow tint */
                        border-color: var(--brand-green);
                    }
                    .icon-box {
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        background: rgba(0, 107, 60, 0.1);
                        color: var(--brand-green);
                        margin-bottom: 1.5rem;
                    }
                    .team-avatar-wrapper {
                        position: relative;
                        width: 120px;
                        height: 120px;
                        margin: 0 auto;
                    }
                `}
            </style>

            {/* Hero Section */}
            <section className="hero-pattern-bg py-5">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h5 className="text-uppercase fw-bold letter-spacing-2 mb-3" style={{ color: 'var(--brand-green)' }}>
                                Est. 2020 • Lagos
                            </h5>
                            <h1 className="display-2 fw-bold mb-4" style={{ color: 'var(--secondary)' }}>
                                Bringing <span className="text-gradient">Naija Soul</span><br />
                                to Your Plate.
                            </h1>
                            <p className="lead mb-5" style={{ color: '#666', maxWidth: '500px' }}>
                                Urban Grille is more than a restaurant. It is a celebration of our culture, our spices, and our way of life. No shortcuts, just pure vibes and flavor.
                            </p>
                            <Link to="/menu" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
                                Taste the Culture
                            </Link>
                        </div>
                        <div className="col-lg-6 position-relative">
                            {/* Abstract Hero SVG */}
                            <svg viewBox="0 0 600 500" className="img-fluid svg-float" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#006B3C', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#FF5722', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                {/* Background Blob */}
                                <path fill="#FFEFD5" d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,77.3,-41.3C85.5,-27.1,91.7,-12.3,89.5,1.3C87.3,14.8,76.6,27.2,65.8,37.8C54.9,48.4,43.9,57.2,31.8,63.6C19.7,70,6.5,74,-5.4,72.2C-17.3,70.5,-27.9,62.9,-38.7,55.1C-49.5,47.3,-60.5,39.3,-68.8,28.6C-77.1,17.9,-82.7,4.5,-81.2,-8.1C-79.6,-20.7,-70.9,-32.5,-60.7,-41.9C-50.5,-51.3,-38.8,-58.3,-26.9,-66C-15,-73.7,-3,-82.1,10.2,-85.4C23.4,-88.7,43,-87,51.8,-80.1" transform="translate(300 250) scale(3)" opacity="0.5" />

                                {/* Abstract Pot/Bowl Shape */}
                                <path d="M150 280 Q 300 450 450 280" stroke="var(--brand-green)" strokeWidth="8" fill="none" strokeLinecap="round" />
                                <path d="M150 280 L 450 280" stroke="var(--brand-green)" strokeWidth="8" fill="none" strokeLinecap="round" />

                                {/* Steam Elements using gradient */}
                                <path d="M220 250 Q 240 150 220 100" stroke="url(#grad1)" strokeWidth="6" fill="none" strokeDasharray="20 10" opacity="0.6">
                                    <animate attributeName="d" values="M220 250 Q 240 150 220 100; M220 250 Q 200 150 220 100; M220 250 Q 240 150 220 100" dur="4s" repeatCount="indefinite" />
                                </path>
                                <path d="M300 250 Q 320 140 300 90" stroke="url(#grad1)" strokeWidth="6" fill="none" strokeDasharray="20 10" opacity="0.8">
                                    <animate attributeName="d" values="M300 250 Q 320 140 300 90; M300 250 Q 280 140 300 90; M300 250 Q 320 140 300 90" dur="3.5s" repeatCount="indefinite" />
                                </path>
                                <path d="M380 250 Q 400 150 380 100" stroke="url(#grad1)" strokeWidth="6" fill="none" strokeDasharray="20 10" opacity="0.6">
                                    <animate attributeName="d" values="M380 250 Q 400 150 380 100; M380 250 Q 360 150 380 100; M380 250 Q 400 150 380 100" dur="4.5s" repeatCount="indefinite" />
                                </path>

                                {/* Decorative Dots */}
                                <circle cx="500" cy="100" r="10" fill="#FFC107" />
                                <circle cx="100" cy="400" r="15" fill="#FF5722" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section - SVG Timeline */}
            <section className="py-5 position-relative">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-8 text-center">
                            <h2 className="fw-bold mb-4">Our Journey</h2>
                            <p className="text-muted">No dull moment. See how we started.</p>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            {/* Abstract Path SVG */}
                            <svg viewBox="0 0 500 400" className="img-fluid" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 350 C 150 350, 150 50, 250 50 C 350 50, 350 350, 450 350" stroke="var(--primary)" strokeWidth="4" fill="none" strokeDasharray="10 10" />
                                <circle cx="50" cy="350" r="8" fill="var(--brand-green)" />
                                <circle cx="250" cy="50" r="8" fill="var(--brand-green)" />
                                <circle cx="450" cy="350" r="8" fill="var(--brand-green)" />

                                <text x="50" y="380" fontFamily="sans-serif" fontSize="14" fill="#666" textAnchor="middle">2020: The Start</text>
                                <text x="250" y="30" fontFamily="sans-serif" fontSize="14" fill="#666" textAnchor="middle">2022: We Blow</text>
                                <text x="450" y="380" fontFamily="sans-serif" fontSize="14" fill="#666" textAnchor="middle">Now: We Move</text>
                            </svg>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <h3 className="fw-bold mb-4">From Mama's Pot to City Center</h3>
                            <p className="text-muted mb-4">
                                We didn't start in a fancy building. We started with passion and a small kitchen in Surulere.
                                The goal was simple: cook food that reminds people of home.
                            </p>
                            <p className="text-muted">
                                Today, the location has changed, but the taste remains exactly the same.
                                Authentic, spicy, and full of love.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {[
                            { title: "Original Flavor", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", text: "No seasoning cubes. Just natural spices." },
                            { title: "Daily Fresh", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z", text: "Market runs every morning. 5AM sharp." },
                            { title: "Community", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z", text: "We treat everyone like family. Akwaaba." }
                        ].map((item, i) => (
                            <div className="col-md-4" key={i}>
                                <div className="minimal-card p-5 h-100 text-center">
                                    <div className="icon-box mx-auto">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                            <path d={item.icon} />
                                        </svg>
                                    </div>
                                    <h4 className="fw-bold mb-3">{item.title}</h4>
                                    <p className="text-muted">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team - Abstract Avatars */}
            <section className="py-5 mb-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">The Squad</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {[
                            { name: "Chef Mike", role: "Head Chef", color: "#FF5722" },
                            { name: "Sarah J.", role: "Manager", color: "#006B3C" },
                            { name: "Tunde", role: "Logistics", color: "#FFC107" }
                        ].map((member, i) => (
                            <div className="col-md-4 col-lg-3" key={i}>
                                <div className="text-center">
                                    <div className="team-avatar-wrapper mb-3">
                                        <svg viewBox="0 0 100 100" className="img-fluid">
                                            <circle cx="50" cy="50" r="45" fill={member.color} opacity="0.1" />
                                            <circle cx="50" cy="40" r="15" fill={member.color} />
                                            <path d="M25 80 Q 50 50 75 80" fill={member.color} />
                                        </svg>
                                    </div>
                                    <h5 className="fw-bold mb-1">{member.name}</h5>
                                    <p className="text-muted small text-uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
