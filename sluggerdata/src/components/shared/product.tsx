export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  retailer?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  affiliateUrl?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-4 hover:border-primary/50 transition-colors">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="font-medium text-white line-clamp-2">{product.name}</h3>
      
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xl font-bold text-white">${product.price}</span>
        {hasDiscount && (
          <>
            <span className="text-gray-500 line-through">${product.originalPrice}</span>
            <span className="text-emerald-400 text-sm">-{discountPercent}%</span>
          </>
        )}
      </div>
      
      {product.rating && (
        <div className="flex items-center gap-1 mt-2">
          <span className="text-amber-400">★</span>
          <span className="text-gray-300 text-sm">{product.rating}</span>
          {product.reviewCount && (
            <span className="text-gray-500 text-sm">({product.reviewCount})</span>
          )}
        </div>
      )}
      
      {product.retailer && (
        <span className="inline-block mt-2 text-xs text-gray-500">{product.retailer}</span>
      )}
      
      {!product.inStock && (
        <span className="inline-block mt-2 text-xs text-red-400">Out of Stock</span>
      )}
    </div>
  );
}

export function PriceDisplay({ 
  price, 
  originalPrice,
  size = 'md'
}: { 
  price: number; 
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - price / originalPrice!) * 100)
    : 0;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`${sizeClasses[size]} font-bold text-white`}>
        ${price.toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-gray-500 line-through">${originalPrice?.toFixed(2)}</span>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        </>
      )}
    </div>
  );
}