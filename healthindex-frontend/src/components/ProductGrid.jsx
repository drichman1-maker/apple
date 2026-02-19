import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-grid-item">
          <ProductCard product={product} />
        </div>
      ))}

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Ensure 2-3 items per row based on container width */
        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .product-grid-item {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ProductGrid;