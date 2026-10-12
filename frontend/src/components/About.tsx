import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
    const values = [
        { icon: 'bi-fire', title: 'Original Flavor', text: 'No seasoning cubes, no shortcuts. Just natural spices, smoke, and soul — the way it should taste.' },
        { icon: 'bi-sunrise', title: 'Daily Fresh', text: "We hit the market every morning at 5AM sharp, so every plate is made from today's ingredients." },
        { icon: 'bi-people', title: 'Community', text: "We treat everyone like family. From Festac to the world — Akwaaba, you're home here." },
    ];

    const stats = [
        { num: '2020', lbl: 'Established' },
        { num: '50+', lbl: 'Fresh Dishes' },
        { num: '4.9', lbl: 'Avg. Rating' },
        { num: '30min', lbl: 'Avg. Delivery' },
    ];

    const team = [
        { name: 'Chef Mike', role: 'Head Chef', color: '#FF6B35' },
        { name: 'Sarah J.', role: 'Manager', color: '#16a34a' },
        { name: 'Tunde', role: 'Logistics', color: '#d97706' },
    ];

    return (
        <>
            <style>{`
                .ab-hero { position: relative; min-height: 460px; display: flex; align-items: center; overflow: hidden; background: #17130f; }
                .ab-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.45; }
                .ab-hero-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(23,19,15,0.55) 0%, rgba(23,19,15,0.85) 100%); }
                .ab-hero-body { position: relative; z-index: 2; color: #fff; padding: 80px 0; }
                .ab-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: #ffb088; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 18px; }
                .ab-hero-title { font-size: clamp(2.3rem, 5vw, 3.8rem); font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 18px; }
                .ab-hero-title em { font-style: normal; background: linear-gradient(120deg, #FF6B35, #F7931E); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
                .ab-hero-sub { color: rgba(255,255,255,0.78); font-size: 18px; max-width: 560px; line-height: 1.65; }

                .ab-stats { border-bottom: 1px solid #f0eae4; background: #fff; }
                .ab-stat { text-align: center; padding: 34px 16px; }
                .ab-stat .n { font-size: 34px; font-weight: 800; color: #1f1b16; letter-spacing: -1px; }
                .ab-stat .l { font-size: 13px; color: #8a8278; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

                .ab-section { padding: 80px 0; }
                .ab-section.alt { background: #fbf7f3; }
                .ab-kicker { color: #FF6B35; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; margin-bottom: 12px; }
                .ab-heading { font-weight: 800; letter-spacing: -1px; color: #1f1b16; }

                .ab-img { border-radius: 22px; overflow: hidden; box-shadow: 0 24px 48px rgba(31,27,22,0.12); }
                .ab-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

                .ab-value { background: #fff; border: 1px solid #f0eae4; border-radius: 20px; padding: 30px; height: 100%; transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .ab-value:hover { transform: translateY(-5px); box-shadow: 0 18px 36px rgba(31,27,22,0.08); }
                .ab-value-icon { width: 54px; height: 54px; border-radius: 15px; background: linear-gradient(135deg, #FF6B35, #F7931E); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 18px; }

                .ab-team-card { text-align: center; }
                .ab-avatar { width: 108px; height: 108px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 800; color: #fff; margin: 0 auto 16px; box-shadow: 0 12px 24px rgba(31,27,22,0.14); }

                .ab-cta { background: #17130f; border-radius: 24px; padding: 56px; position: relative; overflow: hidden; }
                .ab-cta h2 { color: #fff; font-weight: 800; letter-spacing: -1px; }
                .ab-cta p { color: rgba(255,255,255,0.7); }

                @media (max-width: 767.98px) {
                    .ab-cta { padding: 32px 20px; }
                    .ab-img { height: 260px !important; }
                }
            `}</style>

            {/* Hero */}
            <section className="ab-hero">
                <div className="ab-hero-bg" style={{ backgroundImage: 'url(/assets/img/about/v1/hero.jpg)' }} />
                <div className="ab-hero-shade" />
                <div className="container">
                    <div className="ab-hero-body">
                        <span className="ab-eyebrow"><i className="bi bi-geo-alt"></i> Est. 2020 &middot; Festac, Lagos</span>
                        <h1 className="ab-hero-title">Bringing <em>Naija Soul</em><br />to Your Plate</h1>
                        <p className="ab-hero-sub">
                            Urban Grille isn't just a restaurant — it's a celebration of our culture,
                            our spices, and our way of life. No shortcuts, just pure vibes and flavor.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="ab-stats">
                <div className="container">
                    <div className="row">
                        {stats.map((s) => (
                            <div className="col-6 col-md-3" key={s.lbl}>
                                <div className="ab-stat">
                                    <div className="n">{s.num}</div>
                                    <div className="l">{s.lbl}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story */}
            <section className="ab-section">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <div className="ab-img" style={{ height: 420 }}>
                                <img src="/assets/img/home/grocery/recipes/02.jpg" alt="Fresh ingredients" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="ab-kicker">Our Story</span>
                            <h2 className="ab-heading display-6 mb-4">From Mama's Pot to the City Center</h2>
                            <p className="text-muted mb-3" style={{ fontSize: '17px', lineHeight: 1.7 }}>
                                We didn't start in a fancy building. We started with passion and a small
                                kitchen in Surulere. The goal was simple: cook food that reminds people of home.
                            </p>
                            <p className="text-muted mb-4" style={{ fontSize: '17px', lineHeight: 1.7 }}>
                                Today the location has changed, but the taste remains exactly the same —
                                authentic, spicy, and full of love.
                            </p>
                            <Link to="/menu" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold">
                                Taste the Culture <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="ab-section alt">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="ab-kicker">What We Stand For</span>
                        <h2 className="ab-heading display-6">Three Things We Never Compromise</h2>
                    </div>
                    <div className="row g-4">
                        {values.map((v) => (
                            <div className="col-md-4" key={v.title}>
                                <div className="ab-value">
                                    <div className="ab-value-icon"><i className={`bi ${v.icon}`}></i></div>
                                    <h4 className="fw-bold mb-3">{v.title}</h4>
                                    <p className="text-muted mb-0">{v.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="ab-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="ab-kicker">The Squad</span>
                        <h2 className="ab-heading display-6">Meet the People Behind the Flavor</h2>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {team.map((m) => (
                            <div className="col-6 col-md-4 col-lg-3" key={m.name}>
                                <div className="ab-team-card">
                                    <div className="ab-avatar" style={{ background: m.color }}>
                                        {m.name.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <h5 className="fw-bold mb-1">{m.name}</h5>
                                    <p className="text-muted small text-uppercase mb-0" style={{ letterSpacing: '1px' }}>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="ab-section pt-0">
                <div className="container">
                    <div className="ab-cta">
                        <div className="row align-items-center g-4">
                            <div className="col-lg-8">
                                <h2 className="display-6 mb-2">Hungry for something real?</h2>
                                <p className="mb-0">Skip the noise. Order straight from the grill.</p>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <Link to="/menu" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold">
                                    <i className="bi bi-bag me-2"></i> Order Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
