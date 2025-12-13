import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="container pt-4 mb-2 mb-sm-3 mb-lg-4 mb-xl-5">
      <div className="row">
        <div className="col-12">
          <div
            className="rounded-5 overflow-hidden position-relative"
            style={{
              backgroundColor: '#6dafca',
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Content Content - Left Side */}
            <div className="position-relative z-2 ps-4 ps-md-5 py-5" style={{ maxWidth: '600px' }}>
              <div className="d-flex align-items-center mb-3">
                <span className="fs-5 me-2">🔥</span>
                <span className="text-white fw-medium">Free shipping - order over $50</span>
              </div>

              <h1 className="display-3 fw-bold text-white mb-4" style={{ lineHeight: '1.2' }}>
                Fresh Food Available<br />to Everyone
              </h1>

              <button
                className="btn btn-lg rounded-pill px-5 py-3 fw-semibold"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#6dafca';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Order now <i className="ci-arrow-right ms-2"></i>
              </button>
            </div>

            {/* Image - Right Side */}
            <div
              className="position-absolute end-0 bottom-0 h-100 w-100 d-none d-md-block"
              style={{
                backgroundImage: 'url(/assets/img/home/grocery/hero-slider/01.jpg)',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',
                backgroundRepeat: 'no-repeat',
                opacity: 1
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
