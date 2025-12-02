import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Newsletter Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="h2 mb-2">🍴 Get Exclusive Deals!</h3>
              <p className="mb-0 opacity-90">Subscribe to our newsletter for special offers and new menu updates</p>
            </div>
            <div className="col-lg-6">
              <form className="row g-3">
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="col-sm-4">
                  <button type="submit" className="btn btn-light btn-lg w-100">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row gy-4">
            {/* Brand Section */}
            <div className="col-lg-4">
              <div className="d-flex align-items-center mb-3">
                <span className="fs-2 me-2">🍴</span>
                <h3 className="h2 mb-0">Fresh Fork</h3>
              </div>
              <p className="text-muted mb-4">
                Your favorite restaurant delivering fresh, delicious meals straight to your door.
                Made with love and the finest ingredients since 2024.
              </p>

              {/* Social Media */}
              <div className="d-flex gap-3 mb-4">
                <button className="btn btn-outline-light btn-sm rounded-circle" aria-label="Facebook">
                  <i className="ci-facebook"></i>
                </button>
                <button className="btn btn-outline-light btn-sm rounded-circle" aria-label="Instagram">
                  <i className="ci-instagram"></i>
                </button>
                <button className="btn btn-outline-light btn-sm rounded-circle" aria-label="Twitter">
                  <i className="ci-twitter"></i>
                </button>
                <button className="btn btn-outline-light btn-sm rounded-circle" aria-label="YouTube">
                  <i className="ci-youtube"></i>
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mb-3">
                <p className="small text-muted mb-2">We Accept:</p>
                <div className="d-flex gap-2">
                  <span className="badge bg-light text-dark">VISA</span>
                  <span className="badge bg-light text-dark">MC</span>
                  <span className="badge bg-light text-dark">AMEX</span>
                  <span className="badge bg-light text-dark">PayPal</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-4">
              <h5 className="h6 mb-3 text-uppercase">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/menu" className="text-muted text-decoration-none hover-primary">Menu</a>
                </li>
                <li className="mb-2">
                  <a href="/about" className="text-muted text-decoration-none hover-primary">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="text-muted text-decoration-none hover-primary">Contact</a>
                </li>
                <li className="mb-2">
                  <a href="/careers" className="text-muted text-decoration-none hover-primary">Careers</a>
                </li>
                <li className="mb-2">
                  <a href="/franchise" className="text-muted text-decoration-none hover-primary">Franchise</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-4">
              <h5 className="h6 mb-3 text-uppercase">Services</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/delivery" className="text-muted text-decoration-none hover-primary">Delivery</a>
                </li>
                <li className="mb-2">
                  <a href="/catering" className="text-muted text-decoration-none hover-primary">Catering</a>
                </li>
                <li className="mb-2">
                  <a href="/gift-cards" className="text-muted text-decoration-none hover-primary">Gift Cards</a>
                </li>
                <li className="mb-2">
                  <a href="/rewards" className="text-muted text-decoration-none hover-primary">Rewards</a>
                </li>
                <li className="mb-2">
                  <a href="/corporate" className="text-muted text-decoration-none hover-primary">Corporate</a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-lg-2 col-md-4">
              <h5 className="h6 mb-3 text-uppercase">Support</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="/help" className="text-muted text-decoration-none hover-primary">Help Center</a>
                </li>
                <li className="mb-2">
                  <a href="/faq" className="text-muted text-decoration-none hover-primary">FAQ</a>
                </li>
                <li className="mb-2">
                  <a href="/privacy" className="text-muted text-decoration-none hover-primary">Privacy Policy</a>
                </li>
                <li className="mb-2">
                  <a href="/terms" className="text-muted text-decoration-none hover-primary">Terms of Service</a>
                </li>
                <li className="mb-2">
                  <a href="/refund" className="text-muted text-decoration-none hover-primary">Refund Policy</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-2">
              <h5 className="h6 mb-3 text-uppercase">Contact</h5>
              <ul className="list-unstyled text-muted">
                <li className="mb-3">
                  <div className="d-flex align-items-start">
                    <i className="ci-map-pin me-2 mt-1"></i>
                    <span>123 Food Street<br />Culinary City, CC 12345</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-phone me-2"></i>
                    <span>(555) 123-4567</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-mail me-2"></i>
                    <span>info@freshfork.com</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <i className="ci-clock me-2"></i>
                    <span>Mon-Sun: 11am-10pm</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-top border-secondary mt-4 pt-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="small text-muted mb-2 mb-md-0">
                  © 2024 Fresh Fork. All rights reserved. Made with ❤️ and fresh ingredients.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-flex gap-3 justify-content-md-end">
                  <a href="/privacy" className="small text-muted text-decoration-none">Privacy</a>
                  <a href="/terms" className="small text-muted text-decoration-none">Terms</a>
                  <a href="/cookies" className="small text-muted text-decoration-none">Cookies</a>
                  <a href="/sitemap" className="small text-muted text-decoration-none">Sitemap</a>
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
