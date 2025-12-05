import React from 'react';

const SpecialOffers: React.FC = () => {
    const offers = [
        {
            id: 1,
            title: "Weekend Special",
            description: "Get 20% off on all family meals this weekend",
            discount: "20% OFF",
            emoji: "🍽️",
            validUntil: "Sunday",
            code: "WEEKEND20",
            gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
        },
        {
            id: 2,
            title: "Free Delivery",
            description: "Free delivery on orders above $30",
            discount: "FREE",
            emoji: "🚚",
            validUntil: "Limited Time",
            code: "FREESHIP",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 3,
            title: "Combo Deal",
            description: "Buy 2 burgers get 1 free",
            discount: "BOGO",
            emoji: "🍔",
            validUntil: "This Week",
            code: "BOGO24",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 4,
            title: "Student Discount",
            description: "15% off for students with valid ID",
            discount: "15% OFF",
            emoji: "🎓",
            validUntil: "Always",
            code: "STUDENT15",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        }
    ];

    return (
        <section
            className="py-5 py-lg-7"
            style={{
                background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF5F0 50%, #FFFFFF 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(247, 147, 30, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
            }}></div>

            <div className="container position-relative">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <div className="d-inline-block mb-3" style={{
                        background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5F0 100%)',
                        padding: '8px 20px',
                        borderRadius: '50px',
                        border: '2px solid #FFD4C4'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>🎉</span>
                        <span className="ms-2 fw-bold" style={{ color: '#FF6B35', fontSize: '0.9rem' }}>LIMITED TIME</span>
                    </div>
                    <h2 className="h3 h2-md fw-bold mb-3" style={{ color: '#2d3436' }}>Special Offers</h2>
                    <p className="mb-0" style={{ color: '#636e72', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
                        Grab these amazing deals and save on your favorite meals
                    </p>
                </div>

                {/* Offers Grid */}
                <div className="row g-4 mb-5">
                    {offers.map((offer) => (
                        <div key={offer.id} className="col-sm-6 col-lg-3">
                            <div
                                className="card border-0 h-100"
                                style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                    background: '#FFFFFF'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                }}
                            >
                                {/* Gradient Header */}
                                <div
                                    className="text-center py-4"
                                    style={{
                                        background: offer.gradient,
                                        position: 'relative'
                                    }}
                                >
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center mb-2"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            borderRadius: '50%',
                                            fontSize: '2.5rem',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {offer.emoji}
                                    </div>
                                    <div
                                        className="badge text-white rounded-pill px-3 py-2"
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                            fontWeight: '700',
                                            fontSize: '0.85rem',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {offer.discount}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-2" style={{ color: '#2d3436' }}>
                                        {offer.title}
                                    </h5>
                                    <p className="small mb-3" style={{ color: '#636e72', lineHeight: '1.6' }}>
                                        {offer.description}
                                    </p>

                                    {/* Validity and Code */}
                                    <div className="d-flex justify-content-between align-items-center mb-3 p-2 rounded" style={{ background: '#FFF5F0' }}>
                                        <div>
                                            <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Valid</small>
                                            <small className="fw-semibold" style={{ color: '#FF6B35', fontSize: '0.8rem' }}>
                                                {offer.validUntil}
                                            </small>
                                        </div>
                                        <div className="text-end">
                                            <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Code</small>
                                            <code
                                                className="px-2 py-1 rounded"
                                                style={{
                                                    background: '#FFFFFF',
                                                    color: '#FF6B35',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    border: '1px dashed #FFD4C4'
                                                }}
                                            >
                                                {offer.code}
                                            </code>
                                        </div>
                                    </div>

                                    {/* Apply Button */}
                                    <button
                                        className="btn w-100 text-white fw-semibold"
                                        style={{
                                            background: offer.gradient,
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '10px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <i className="ci-tag me-2"></i>Apply Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Section */}
                <div
                    className="text-center p-4 rounded-4"
                    style={{
                        background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5F0 100%)',
                        border: '2px solid #FFD4C4'
                    }}
                >
                    <p className="mb-3" style={{ color: '#636e72', fontSize: '0.9rem' }}>
                        <i className="ci-info-circle me-2" style={{ color: '#FF6B35' }}></i>
                        Terms and conditions apply. Offers cannot be combined.
                    </p>
                    <button
                        className="btn px-4 py-2 fw-semibold"
                        style={{
                            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                            color: 'white',
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
                        View All Offers <i className="ci-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
