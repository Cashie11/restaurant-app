import React from 'react';

const PopularItems: React.FC = () => {
  const popularItems = [
    {
      id: 1,
      name: 'Muesli Fitness Energy, gluten free',
      price: 2.15,
      image: '/assets/img/shop/grocery/01.png',
      badge: null,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Fresh orange Klementina, Spain',
      price: 3.12,
      image: '/assets/img/shop/grocery/02.png',
      badge: 'Popular',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: 'Pesto sauce Barilla with basil, Italy',
      price: 3.95,
      image: '/assets/img/shop/grocery/03.png',
      badge: null,
      rating: 4.7,
      reviews: 56
    },
    {
      id: 4,
      name: 'Organic eggs from home-grown chicken',
      price: 4.28,
      image: '/assets/img/shop/grocery/04.png',
      badge: 'New',
      rating: 5.0,
      reviews: 23
    },
    {
      id: 5,
      name: 'Fresh salmon fillet, Norway',
      price: 12.99,
      image: '/assets/img/shop/grocery/05.png',
      badge: 'Bestseller',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 6,
      name: 'Artisan bread, whole grain',
      price: 3.45,
      image: '/assets/img/shop/grocery/06.png',
      badge: null,
      rating: 4.6,
      reviews: 78
    },
    {
      id: 7,
      name: 'Greek yogurt, natural',
      price: 2.88,
      image: '/assets/img/shop/grocery/07.png',
      badge: null,
      rating: 4.8,
      reviews: 92
    },
    {
      id: 8,
      name: 'Extra virgin olive oil, Italy',
      price: 8.75,
      image: '/assets/img/shop/grocery/08.png',
      badge: 'Premium',
      rating: 5.0,
      reviews: 203
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ci-star-fill" style={{ color: '#FF6B35', fontSize: '0.85rem' }}></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ci-star-half" style={{ color: '#FF6B35', fontSize: '0.85rem' }}></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ci-star" style={{ color: '#FFD4C4', fontSize: '0.85rem' }}></i>);
    }

    return stars;
  };

  return (
    <div
      className="h-100"
      style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFF5F0 100%)',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #FFE5D9'
      }}
    >

      {/* Product Cards Grid */}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-3 row-cols-xl-4 g-4">
        {popularItems.map((item) => (
          <div key={item.id} className="col">
            <div
              className="card h-100 border-0"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 107, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
            >
              {/* Image Section */}
              <div className="position-relative" style={{ backgroundColor: '#FFF5F0', padding: '1.5rem' }}>
                {/* Wishlist Button */}
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-0 end-0 z-2 mt-2 me-2"
                  aria-label="Add to Wishlist"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF6B35';
                    e.currentTarget.querySelector('i')?.setAttribute('style', 'color: white');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.querySelector('i')?.setAttribute('style', 'color: #FF6B35');
                  }}
                >
                  <i className="ci-heart" style={{ color: '#FF6B35' }}></i>
                </button>

                {/* Badge */}
                {item.badge && (
                  <span
                    className="badge position-absolute top-0 start-0 mt-2 ms-2"
                    style={{
                      background: item.badge === 'Popular' || item.badge === 'Bestseller'
                        ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                        : item.badge === 'New'
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : item.badge === 'Premium'
                            ? 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)'
                            : '#FF6B35',
                      color: '#FFFFFF',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontWeight: '600',
                      fontSize: '0.7rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Product Image */}
                <a href={`/product/${item.id}`} className="d-block">
                  <div className="ratio" style={{ '--cz-aspect-ratio': 'calc(160 / 191 * 100%)' } as React.CSSProperties}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                </a>

                {/* Add to Cart Button */}
                <button
                  className="btn w-100 mt-3 text-white fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '8px',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 107, 53, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="ci-cart me-1"></i>Add to Cart
                </button>
              </div>

              {/* Card Body */}
              <div className="card-body p-3">
                {/* Price and Rating Row */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="h5 mb-0 fw-bold" style={{ color: '#FF6B35' }}>
                    ${item.price}
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    {renderStars(item.rating)}
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="fs-6 mb-2" style={{
                  color: '#2d3436',
                  lineHeight: '1.4',
                  minHeight: '2.8rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  <a
                    href={`/product/${item.id}`}
                    className="text-decoration-none"
                    style={{ color: '#2d3436', transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FF6B35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#2d3436';
                    }}
                  >
                    {item.name}
                  </a>
                </h3>

                {/* Reviews */}
                <div className="d-flex align-items-center">
                  <span className="fs-xs fw-semibold" style={{ color: '#FF6B35' }}>
                    {item.rating}
                  </span>
                  <span className="fs-xs ms-2" style={{ color: '#b2bec3' }}>
                    ({item.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
