import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Featured products - latest and most popular Apple products
  const featuredProducts = [
    {
      id: 'macbook-pro-14-m4-pro',
      name: 'MacBook Pro 14" (M4 Pro)',
      category: 'mac',
      price: 1999,
      description: 'The most powerful 14" MacBook Pro with M4 Pro chip.',
      isNew: true,
      inStock: true
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      category: 'iphone',
      price: 1199,
      description: 'The ultimate iPhone with innovative camera system.',
      isNew: true,
      inStock: true
    },
    {
      id: 'mac-studio',
      name: 'Mac Studio (2024)',
      category: 'mac',
      price: 1999,
      description: 'Breakthrough performance for pros.',
      isNew: true,
      inStock: true
    },
    {
      id: 'ipad-pro-13-m4',
      name: 'iPad Pro 13" (M4)',
      category: 'ipad',
      price: 1099,
      description: 'The most advanced iPad with M4 chip.',
      isNew: true,
      inStock: true
    },
    {
      id: 'apple-watch-series-10',
      name: 'Apple Watch Series 10',
      category: 'watch',
      price: 399,
      description: 'The most advanced Apple Watch yet.',
      isNew: true,
      inStock: true
    },
    {
      id: 'airpods-pro-2',
      name: 'AirPods Pro (2nd Gen)',
      category: 'airpods',
      price: 249,
      description: 'Next-level Active Noise Cancellation.',
      isNew: false,
      inStock: true
    }
  ];

  return (
    <section className="featured-products">
      <h2 className="section-title">Featured Products</h2>
      
      <div className="products-grid">
        {featuredProducts.map(product => (
          <div key={product.id} className="product-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .featured-products {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #1d1d1f;
          margin-bottom: 3rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .product-item {
          height: 100%;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;