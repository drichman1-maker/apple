import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const {
    name,
    image,
    description,
    price,
    rating,
    reviews,
    inStock
  } = product;

  return (
    <motion.div
      className="health-product-card"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-inner">
        {/* Image Section */}
        <div className="image-container">
          <img 
            src={image} 
            alt={name}
            className="product-image"
            loading="lazy"
          />
          {inStock ? (
            <span className="status-badge in-stock">In Stock</span>
          ) : (
            <span className="status-badge out-of-stock">Out of Stock</span>
          )}
        </div>

        {/* Content Section */}
        <div className="content">
          <h3 className="product-name">{name}</h3>
          
          {/* Rating */}
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="reviews">({reviews} reviews)</span>
          </div>

          <p className="description">{description}</p>

          <div className="footer">
            <span className="price">${price.toLocaleString()}</span>
            <button className="view-details">
              View Details
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .health-product-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          height: 100%;
        }

        .card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .image-container {
          position: relative;
          padding-top: 75%;
          background: #f9fafb;
          overflow: hidden;
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1.5rem;
          transition: transform 0.3s ease;
        }

        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .in-stock {
          background: #dcfce7;
          color: #15803d;
        }

        .out-of-stock {
          background: #fee2e2;
          color: #b91c1c;
        }

        .content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.75rem 0;
          line-height: 1.2;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .stars {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          color: #d1d5db;
          font-size: 1rem;
        }

        .star.filled {
          color: #fbbf24;
        }

        .reviews {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .description {
          color: #4b5563;
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .price {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
        }

        .view-details {
          background: #4f46e5;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .view-details:hover {
          background: #4338ca;
        }

        @media (hover: hover) {
          .product-card:hover .product-image {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .content {
            padding: 1.25rem;
          }

          .product-name {
            font-size: 1.125rem;
          }

          .price {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;