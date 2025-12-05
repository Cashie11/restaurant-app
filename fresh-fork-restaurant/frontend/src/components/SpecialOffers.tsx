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
            code: "WEEKEND20"
        },
        {
            id: 2,
            title: "Free Delivery",
            description: "Free delivery on orders above $30",
            discount: "FREE",
            emoji: "🚚",
            validUntil: "Limited Time",
            code: "FREESHIP"
        },
        {
            id: 3,
            title: "Combo Deal",
            description: "Buy 2 burgers get 1 free",
            discount: "BOGO",
            emoji: "🍔",
            validUntil: "This Week",
            code: "BOGO24"
        },
        {
            id: 4,
            title: "Student Discount",
            description: "15% off for students with valid ID",
            discount: "15% OFF",
            emoji: "🎓",
            validUntil: "Always",
            code: "STUDENT15"
        }
    ];

    return (
        <section className="bg-light py-5 py-lg-7">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">Special Offers</h2>
                    <p className="lead text-muted">Grab these amazing deals and save on your favorite meals</p>
                </div>

                <div className="row g-4">
                    {offers.map((offer) => (
                        <div key={offer.id} className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body text-center">
                                    <div className="text-center mb-3">
                                        <span className="display-4">{offer.emoji}</span>
                                    </div>
                                    <div className="badge bg-danger text-white rounded-pill mb-3 px-3 py-2">
                                        {offer.discount}
                                    </div>
                                    <h5 className="card-title fw-bold mb-2">{offer.title}</h5>
                                    <p className="card-text text-muted small mb-3">{offer.description}</p>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <small className="text-muted">Valid: {offer.validUntil}</small>
                                        <code className="bg-light text-dark px-2 py-1 rounded small">{offer.code}</code>
                                    </div>
                                    <button className="btn btn-fresh btn-sm w-100">
                                        <i className="ci-tag me-1"></i>Apply Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5">
                    <p className="text-muted mb-3">
                        <i className="ci-info-circle me-2"></i>
                        Terms and conditions apply. Offers cannot be combined.
                    </p>
                    <button className="btn btn-outline-fresh">
                        View All Offers <i className="ci-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
