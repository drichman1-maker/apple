import React from 'react';
import { motion } from 'framer-motion';
import { getProductImage } from '../utils/productImages';

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    description,
    isNew,
    inStock
  } = product;

  return (
    <motion.div
      className="product-card"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-card-inner">
        {/* Image Container */}
        <div className="product-image-container">
          <img 
            src={getProductImage(id, category)}
            alt={name}
            className="product-image"
            loading="lazy"
          />
          {isNew && (
            <span className="new-badge">New</span>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <p className="product-description">{description}</p>
          
          <div className="product-footer">
            <span className="product-price">
              ${price.toLocaleString()}
            </span>
            <span className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .product-card-inner {
          padding: 1rem;
        }

        .product-image-container {
          position: relative;
          width: 100%;
          padding-top: 75%; /* 4:3 Aspect Ratio */
          background: #f8f9fa;
          border-radius: 12px;
          overflow: hidden;
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1rem;
          transition: transform 0.3s ease;
        }

        .new-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #007aff;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .product-info {
          padding: 1.5rem 1rem;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1d1d1f;
          margin: 0 0 0.5rem 0;
        }

        .product-description {
          font-size: 0.875rem;
          color: #86868b;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1d1d1f;
        }

        .stock-status {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
        }

        .in-stock {
          background: #e3f9e5;
          color: #198754;
        }

        .out-of-stock {
          background: #ffe3e3;
          color: #dc3545;
        }

        @media (hover: hover) {
          .product-card:hover .product-image {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .product-name {
            font-size: 1.125rem;
          }
          
          .product-price {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;