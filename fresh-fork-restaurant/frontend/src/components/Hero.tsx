import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundColor: '#6dafca',
      title: 'Fresh Food Available to Everyone',
      subtitle: '🔥 Free shipping - order over <strong>$50</strong>',
      buttonText: 'Order now',
      image: '/assets/img/home/grocery/hero-slider/01.jpg',
      colClass: 'col-9 col-sm-8 col-md-7 col-lg-6'
    },
    {
      id: 2,
      backgroundColor: '#5a7978',
      title: 'Organic eggs from home-grown chicken',
      subtitle: '🥚 Organic products to your table',
      buttonText: 'Order now',
      image: '/assets/img/home/grocery/hero-slider/02.jpg',
      colClass: 'col-12 col-sm-10 col-md-7 col-lg-6'
    },
    {
      id: 3,
      backgroundColor: '#f99c03',
      title: 'Enjoy refreshing summer drinks',
      subtitle: '🥝 Only natural ingredients',
      buttonText: 'Order now',
      image: '/assets/img/home/grocery/hero-slider/03.jpg',
      colClass: 'col-9 col-sm-8 col-md-7 col-lg-6'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="position-relative">
      {/* Hero Slider */}
      <div className="swiper position-absolute top-0 start-0 w-100 h-100" data-swiper='{
        "effect": "fade",
        "loop": true,
        "speed": 400,
        "pagination": {
          "el": ".swiper-pagination",
          "clickable": true
        },
        "autoplay": {
          "delay": 5500,
          "disableOnInteraction": false
        }
      }' data-bs-theme="dark">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`swiper-slide ${index === currentSlide ? 'swiper-slide-active' : ''}`}
              style={{ backgroundColor: slide.backgroundColor }}
            >
              <div className="position-absolute d-flex align-items-center w-100 h-100 z-2">
                <div className="container mt-lg-n4">
                  <div className="row">
                    <div className={slide.colClass}>
                      <p
                        className="fs-sm text-white mb-lg-4"
                        dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                      />
                      <h2 className="display-4 pb-2 pb-md-3 pb-lg-4 text-white">{slide.title}</h2>
                      <a className="btn btn-lg btn-outline-light rounded-pill" href="/menu">
                        {slide.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={slide.image}
                className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover rtl-flip"
                alt={slide.title}
              />
            </div>
          ))}
        </div>

        {/* Slider pagination (Bullets) */}
        <div className="swiper-pagination pb-sm-2"></div>
      </div>

      {/* Responsive height placeholders */}
      <div className="d-md-none" style={{ height: '380px' }}></div>
      <div className="d-none d-md-block d-lg-none" style={{ height: '420px' }}></div>
      <div className="d-none d-lg-block d-xl-none" style={{ height: '500px' }}></div>
      <div className="d-none d-xl-block d-xxl-none" style={{ height: '560px' }}></div>
      <div className="d-none d-xxl-block" style={{ height: '624px' }}></div>
    </section>
  );
};

export default Hero;
