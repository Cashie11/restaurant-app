import React from 'react';

const Features: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: 'Only fresh fish to your table',
      subtitle: '124 products',
      icon: '🐟',
      image: '/assets/img/home/grocery/features/01.png',
      bgColor: '#fff0f0' // Light pink
    },
    {
      id: 2,
      title: 'Products for Easter table',
      subtitle: '97 products',
      icon: '🐰',
      image: '/assets/img/home/grocery/features/02.png',
      bgColor: '#f1fcf0' // Light green
    },
    {
      id: 3,
      title: 'Organic vegetables from local farms',
      subtitle: '156 products',
      icon: '🥕',
      image: '/assets/img/home/grocery/features/03.png',
      bgColor: '#fbf7f0' // Light beige
    },
    {
      id: 4,
      title: 'Fresh bakery goods daily',
      subtitle: '89 products',
      icon: '🥖',
      image: '/assets/img/home/grocery/features/04.png',
      bgColor: '#f0f7ff' // Light blue
    }
  ];

  return (
    <section className="container pt-4 pb-5 mb-2 mb-sm-3 mb-lg-4 mb-xl-5">
      <div className="row g-4">
        {categories.map((category) => (
          <div key={category.id} className="col-md-6 col-lg-3">
            <div
              className="position-relative d-flex flex-column justify-content-between h-100 rounded-4 overflow-hidden p-4"
              style={{
                backgroundColor: category.bgColor,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                minHeight: '260px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="z-2">
                <span className="d-block fs-xs fw-medium text-muted mb-2 text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  {category.subtitle}
                </span>
                <h3 className="h5 fw-bold mb-3 text-dark-emphasis" style={{ maxWidth: '85%' }}>
                  {category.title}
                </h3>
                <a href="#!" className="btn-link text-decoration-none fw-semibold d-inline-flex align-items-center" style={{ color: '#2d3436' }}>
                  Shop now <i className="ci-arrow-right fs-sm ms-2"></i>
                </a>
              </div>

              <div
                className="position-absolute bottom-0 end-0 mb-3 me-3"
                style={{
                  fontSize: '3.5rem',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                  transform: 'rotate(-10deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {category.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
