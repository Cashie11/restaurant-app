import React from 'react';

const Features: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: 'Only fresh fish to your table',
      subtitle: '124 products',
      emoji: '🐟',
      bgColor: 'bg-primary-subtle',
      link: '#'
    },
    {
      id: 2,
      title: 'Products for Easter table',
      subtitle: '97 products',
      emoji: '🐰',
      bgColor: 'bg-success-subtle',
      link: '#'
    },
    {
      id: 3,
      title: 'Organic vegetables from local farms',
      subtitle: '156 products',
      emoji: '🥕',
      bgColor: 'bg-warning-subtle',
      link: '#'
    },
    {
      id: 4,
      title: 'Fresh bakery goods daily',
      subtitle: '89 products',
      emoji: '🥖',
      bgColor: 'bg-info-subtle',
      link: '#'
    }
  ];

  return (
    <section className="container pt-4 pb-5 mb-2 mb-sm-3 mb-lg-4 mb-xl-5">
      <div className="row g-4">
        {categories.map((category) => (
          <div key={category.id} className="col-md-6 col-lg-3">
            <div className={`position-relative d-flex justify-content-between align-items-center h-100 ${category.bgColor} rounded-5 overflow-hidden ps-3 pe-2`}>
              <div className="d-flex flex-column pt-4 px-2 pb-3">
                <p className="fs-xs pb-2 mb-1 text-muted">{category.subtitle}</p>
                <h2 className="h5 mb-2 mb-xxl-3">{category.title}</h2>
                <div className="nav">
                  <a className="nav-link animate-underline stretched-link text-body-emphasis text-nowrap px-0" href={category.link}>
                    <span className="animate-target">Shop now</span>
                    <i className="ci-chevron-right fs-base ms-1"></i>
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center" style={{ minWidth: '80px', fontSize: '3rem' }}>
                {category.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
