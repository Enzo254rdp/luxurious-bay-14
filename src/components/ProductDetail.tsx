
import { useState } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "../lib/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="overflow-hidden rounded-xl border border-enzobay-neutral-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`relative min-w-[70px] aspect-square rounded-md overflow-hidden border ${
                    selectedImage === index
                      ? "border-enzobay-orange ring-2 ring-enzobay-orange/20"
                      : "border-enzobay-neutral-200 hover:border-enzobay-neutral-300"
                  } transition-all duration-200`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="blue-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
              {product.discount && (
                <span className="gold-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
                  {product.discount}% Off
                </span>
              )}
              {product.inStock && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" /> In Stock
                </span>
              )}
            </div>
            
            {/* Product Title & Rating */}
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-enzobay-orange fill-enzobay-orange"
                        : "text-enzobay-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-enzobay-neutral-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-enzobay-brown">
                {formatPrice(product.price)}
              </span>
              {product.discount && (
                <span className="ml-3 text-lg text-enzobay-neutral-500 line-through">
                  {formatPrice(product.price * (1 + product.discount / 100))}
                </span>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="text-sm text-enzobay-neutral-600 mb-2">Quantity</p>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="h-10 w-10 border border-enzobay-neutral-300 rounded-l-md flex items-center justify-center transition-colors hover:bg-enzobay-neutral-100"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-16 border-y border-enzobay-neutral-300 text-center"
                  min="1"
                />
                <button
                  onClick={incrementQuantity}
                  className="h-10 w-10 border border-enzobay-neutral-300 rounded-r-md flex items-center justify-center transition-colors hover:bg-enzobay-neutral-100"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="border border-enzobay-neutral-300 text-enzobay-brown rounded-md flex items-center justify-center gap-2 py-3 px-6 hover:bg-enzobay-neutral-100 transition-colors">
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
            </div>
            
            {/* Collapsible Sections */}
            <div className="space-y-4 border-t border-enzobay-neutral-200 pt-6">
              {/* Description */}
              <div>
                <button
                  className="flex justify-between items-center w-full py-3 text-left"
                  onClick={() => toggleSection("description")}
                >
                  <span className="font-medium">Description</span>
                  {expandedSection === "description" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                
                {expandedSection === "description" && (
                  <div className="pb-4 text-enzobay-neutral-700 animate-fade-in">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>
              
              {/* Shipping */}
              <div className="border-t border-enzobay-neutral-200">
                <button
                  className="flex justify-between items-center w-full py-3 text-left"
                  onClick={() => toggleSection("shipping")}
                >
                  <span className="font-medium">Shipping & Returns</span>
                  {expandedSection === "shipping" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                
                {expandedSection === "shipping" && (
                  <div className="pb-4 text-enzobay-neutral-700 animate-fade-in">
                    <p>Free standard shipping on all orders within Kenya.</p>
                    <p className="mt-2">International shipping available at competitive rates.</p>
                    <p className="mt-2">Easy returns within 30 days of purchase.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
