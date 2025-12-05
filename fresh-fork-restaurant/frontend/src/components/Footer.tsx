import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Newsletter Section - Minimalistic Design */}
      <section
        className="py-5"
        style={{
          background: 'linear-gradient(to right, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)',
          borderTop: '1px solid #e9ecef',
          borderBottom: '1px solid #e9ecef'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-2">
                <div
                  className="d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    borderRadius: '12px',
                    fontSize: '1.5rem'
                  }}
                >
                  📧
                </div>
                <div>
                  <h3 className="h5 mb-0 fw-bold" style={{ color: '#2d3436' }}>Stay Updated</h3>
                  <p className="mb-0 small" style={{ color: '#636e72' }}>Get exclusive deals & updates</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <form className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #e9ecef',
                    padding: '12px 20px',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn text-white fw-semibold px-4"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 107, 53, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer - Clean & Minimalistic */}
      <footer
        className="pt-5 pb-4"
        style={{
          background: '#ffffff',
          color: '#2d3436'
        }}
      >
        <div className="container">
          <div className="row gy-4 pb-4">
            {/* Brand Section */}
            <div className="col-lg-4">
              <div className="d-flex align-items-center mb-3">
                <span style={{ fontSize: '2rem' }}>🍴</span>
                <h3 className="h4 mb-0 ms-2 fw-bold" style={{ color: '#2d3436' }}>Fresh Fork</h3>
              </div>
              <p className="mb-4" style={{ color: '#636e72', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Your favorite restaurant delivering fresh, delicious meals straight to your door.
                Made with love and the finest ingredients.
              </p>

              {/* Social Media - Minimalistic */}
              <div className="d-flex gap-2 mb-4">
                <a
                  href="#facebook"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    color: '#636e72',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#636e72';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="Facebook"
                >
                  <i className="ci-facebook"></i>
                </a>
                <a
                  href="#instagram"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    color: '#636e72',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#636e72';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="Instagram"
                >
                  <i className="ci-instagram"></i>
                </a>
                <a
                  href="#twitter"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    color: '#636e72',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#636e72';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="Twitter"
                >
                  <i className="ci-twitter"></i>
                </a>
                <a
                  href="#youtube"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    color: '#636e72',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8f9fa';
                    e.currentTarget.style.color = '#636e72';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label="YouTube"
                >
                  <i className="ci-youtube"></i>
                </a>
              </div>

              {/* Payment Methods - Clean */}
              <div>
                <p className="small mb-2" style={{ color: '#b2bec3', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>We Accept</p>
                <div className="d-flex gap-2">
                  <span className="badge" style={{ background: '#f8f9fa', color: '#636e72', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600' }}>VISA</span>
                  <span className="badge" style={{ background: '#f8f9fa', color: '#636e72', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600' }}>MC</span>
                  <span className="badge" style={{ background: '#f8f9fa', color: '#636e72', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600' }}>AMEX</span>
                  <span className="badge" style={{ background: '#f8f9fa', color: '#636e72', padding: '6px 12px', fontSize: '0.75rem', fontWeight: '600' }}>PayPal</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="h6 mb-3 fw-bold" style={{ color: '#2d3436', fontSize: '0.9rem' }}>Menu</h5>
              <ul className="list-unstyled">
                {['Menu', 'About Us', 'Contact', 'Careers', 'Franchise'].map((link) => (
                  <li key={link} className="mb-2">
                    <a
                      href={`/${link.toLowerCase().replace(' ', '-')}`}
                      className="text-decoration-none"
                      style={{ color: '#636e72', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#636e72'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="h6 mb-3 fw-bold" style={{ color: '#2d3436', fontSize: '0.9rem' }}>Services</h5>
              <ul className="list-unstyled">
                {['Delivery', 'Catering', 'Gift Cards', 'Rewards', 'Corporate'].map((link) => (
                  <li key={link} className="mb-2">
                    <a
                      href={`/${link.toLowerCase().replace(' ', '-')}`}
                      className="text-decoration-none"
                      style={{ color: '#636e72', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#636e72'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="h6 mb-3 fw-bold" style={{ color: '#2d3436', fontSize: '0.9rem' }}>Support</h5>
              <ul className="list-unstyled">
                {['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((link) => (
                  <li key={link} className="mb-2">
                    <a
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-decoration-none"
                      style={{ color: '#636e72', fontSize: '0.9rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#636e72'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="h6 mb-3 fw-bold" style={{ color: '#2d3436', fontSize: '0.9rem' }}>Contact</h5>
              <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
                <li className="mb-3">
                  <div className="d-flex align-items-start">
                    <i className="ci-map-pin me-2 mt-1" style={{ color: '#FF6B35' }}></i>
                    <span style={{ color: '#636e72', lineHeight: '1.5' }}>123 Food Street<br />Culinary City, CC 12345</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-phone me-2" style={{ color: '#FF6B35' }}></i>
                    <span style={{ color: '#636e72' }}>(555) 123-4567</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-mail me-2" style={{ color: '#FF6B35' }}></i>
                    <span style={{ color: '#636e72' }}>info@freshfork.com</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-clock me-2" style={{ color: '#FF6B35' }}></i>
                    <span style={{ color: '#636e72' }}>Mon-Sun: 11am-10pm</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Ultra Clean */}
          <div
            className="pt-4 mt-4"
            style={{
              borderTop: '1px solid #e9ecef'
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <p className="small mb-2 mb-md-0" style={{ color: '#b2bec3', fontSize: '0.85rem' }}>
                  © 2024 Fresh Fork. All rights reserved.
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                  {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((link) => (
                    <a
                      key={link}
                      href={`/${link.toLowerCase()}`}
                      className="small text-decoration-none"
                      style={{ color: '#b2bec3', fontSize: '0.85rem', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#b2bec3'}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
