
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "../lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        
        {/* Hover Actions */}
        <div 
          className={`absolute inset-0 bg-black/5 flex items-end justify-center pb-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-3">
            <button 
              className="bg-white rounded-full p-2.5 shadow-md hover:bg-enzobay-orange hover:text-white transition-colors duration-300"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button 
              className="bg-white rounded-full p-2.5 shadow-md hover:bg-enzobay-orange hover:text-white transition-colors duration-300"
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="blue-gradient text-white text-xs font-medium px-2.5 py-1 rounded">New</span>
          )}
          {product.discount && (
            <span className="gold-gradient text-white text-xs font-medium px-2.5 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-enzobay-brown group-hover:text-enzobay-orange transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="font-semibold text-enzobay-brown">{formatPrice(product.price)}</p>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-enzobay-orange"
                      : "text-enzobay-neutral-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-enzobay-neutral-500">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
