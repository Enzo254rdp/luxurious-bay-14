
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown, ChevronUp, Share2, ShieldCheck, Truck, RotateCw, Maximize } from "lucide-react";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import { useRecentlyViewedStore, useCartStore, useWishlistStore } from "../lib/store";
import WishlistButton from "./WishlistButton";
import ImageModal from "./ImageModal";
import SimilarProducts from "./SimilarProducts";
import RecentlyViewed from "./RecentlyViewed";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  const { addItem } = useCartStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  // Add to recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const openImageModal = (index: number) => {
    setSelectedImage(index);
    setIsImageModalOpen(true);
  };

  // Calculate discount percentage
  const discountPercentage = product.discount || 0;
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm font-medium mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-enzobay-neutral-500 hover:text-enzobay-blue">Home</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li>
              <a href="/products" className="text-enzobay-neutral-500 hover:text-enzobay-blue">Products</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li>
              <a href={`/products/${product.category}`} className="text-enzobay-neutral-500 hover:text-enzobay-blue capitalize">{product.category}</a>
            </li>
            <li className="text-enzobay-neutral-500">/</li>
            <li className="text-enzobay-neutral-800 truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product gallery - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="aspect-h-3 aspect-w-3 overflow-hidden rounded-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="h-full w-full object-contain object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openImageModal(selectedImage)}
              />
              
              {/* Zoom button */}
              <button
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                onClick={() => openImageModal(selectedImage)}
              >
                <Maximize className="h-5 w-5 text-gray-700" />
              </button>
              
              {/* Product badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount && (
                  <span className="bg-enzobay-orange text-white text-xs font-bold px-2.5 py-1.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-enzobay-blue text-white text-xs font-bold px-2.5 py-1.5 rounded">
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`relative aspect-square overflow-hidden rounded-md cursor-pointer border-2 ${
                    selectedImage === idx 
                      ? 'border-enzobay-blue ring-2 ring-enzobay-blue/30' 
                      : 'border-transparent hover:border-enzobay-neutral-300'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${idx + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info - Takes 4 columns */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 lg:col-span-4">
            <div className="flex flex-col h-full">
              {/* Product header */}
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-enzobay-brown sm:text-3xl">
                  {product.name}
                </h1>
                
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? "text-enzobay-orange fill-enzobay-orange" 
                            : "text-enzobay-neutral-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-enzobay-neutral-600">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </p>
                </div>
                
                {/* Status badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.inStock ? (
                    <span className="inline-flex items-center bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded">
                      <Check className="mr-1 h-3.5 w-3.5" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-50 text-red-700 text-xs font-medium px-2.5 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                  {product.brand && (
                    <span className="inline-flex items-center bg-enzobay-neutral-100 text-enzobay-neutral-800 text-xs font-medium px-2.5 py-1 rounded">
                      {product.brand}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-end">
                    <p className="text-3xl font-bold text-enzobay-brown">
                      {formatPrice(discountedPrice)}
                    </p>
                    <p className="ml-2 text-lg text-enzobay-neutral-500 line-through">
                      {formatPrice(originalPrice)}
                    </p>
                    <p className="ml-2 text-sm font-medium text-green-600">
                      Save {formatPrice(originalPrice - discountedPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-enzobay-brown">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>
              
              {/* Product description */}
              <div className="mb-6">
                <p className="text-base text-enzobay-neutral-600">
                  {product.description}
                </p>
              </div>
              
              {/* Color options */}
              {product.options && product.options.colors && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-4">Color</h3>
                  <div className="flex items-center space-x-3">
                    {product.options.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      >
                        <span 
                          className="h-8 w-8 rounded-full border border-black border-opacity-10" 
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Size options */}
              {product.options && product.options.sizes && (
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-enzobay-neutral-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                      Size guide
                    </a>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
                    {product.options.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="flex items-center justify-center rounded-md border border-enzobay-neutral-300 py-3 px-3 text-sm font-medium hover:bg-enzobay-neutral-50"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity and action buttons */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="mb-5">
                  <label htmlFor="quantity" className="block text-sm font-medium text-enzobay-neutral-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex h-10 w-32">
                    <button
                      type="button"
                      className="bg-enzobay-neutral-100 rounded-l-md px-3 flex items-center justify-center hover:bg-enzobay-neutral-200"
                      onClick={decrementQuantity}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="h-full w-full border-y border-enzobay-neutral-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button
                      type="button"
                      className="bg-enzobay-neutral-100 rounded-r-md px-3 flex items-center justify-center hover:bg-enzobay-neutral-200"
                      onClick={incrementQuantity}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-8 py-3 text-base font-medium text-white hover:bg-enzobay-blue-dark focus:outline-none"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={toggleWishlist}
                    className={`flex items-center justify-center rounded-md border px-8 py-3 text-base font-medium ${
                      isInWishlist(product.id)
                        ? 'border-red-300 bg-red-50 text-red-500 hover:bg-red-100'
                        : 'border-enzobay-neutral-300 text-enzobay-neutral-700 hover:bg-enzobay-neutral-50'
                    }`}
                  >
                    <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                    {isInWishlist(product.id) ? 'Saved' : 'Add to Wishlist'}
                  </button>
                </div>
                
                {/* Product benefits */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center rounded-lg border border-enzobay-neutral-200 p-3">
                    <Truck className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                    <div className="ml-2 text-sm text-enzobay-neutral-600">
                      <p className="font-medium text-enzobay-neutral-900">Free Shipping</p>
                      <p>On orders over KSh 5,000</p>
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg border border-enzobay-neutral-200 p-3">
                    <RotateCw className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                    <div className="ml-2 text-sm text-enzobay-neutral-600">
                      <p className="font-medium text-enzobay-neutral-900">Easy Returns</p>
                      <p>30-day money back</p>
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg border border-enzobay-neutral-200 p-3">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                    <div className="ml-2 text-sm text-enzobay-neutral-600">
                      <p className="font-medium text-enzobay-neutral-900">Secure Payment</p>
                      <p>Encrypted transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-16 border-t border-enzobay-neutral-200 pt-10">
          <div className="flex space-x-8 border-b border-enzobay-neutral-200">
            <button
              type="button"
              className={`border-b-2 py-4 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-enzobay-blue text-enzobay-blue'
                  : 'border-transparent text-enzobay-neutral-600 hover:border-enzobay-neutral-300 hover:text-enzobay-neutral-800'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Product Details
            </button>
            <button
              type="button"
              className={`border-b-2 py-4 text-sm font-medium ${
                activeTab === 'specifications'
                  ? 'border-enzobay-blue text-enzobay-blue'
                  : 'border-transparent text-enzobay-neutral-600 hover:border-enzobay-neutral-300 hover:text-enzobay-neutral-800'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              type="button"
              className={`border-b-2 py-4 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-enzobay-blue text-enzobay-blue'
                  : 'border-transparent text-enzobay-neutral-600 hover:border-enzobay-neutral-300 hover:text-enzobay-neutral-800'
              }`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
            <button
              type="button"
              className={`border-b-2 py-4 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'border-enzobay-blue text-enzobay-blue'
                  : 'border-transparent text-enzobay-neutral-600 hover:border-enzobay-neutral-300 hover:text-enzobay-neutral-800'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>
          
          <div className="mt-8 flow-root">
            {activeTab === 'details' && (
              <div className="prose prose-enzobay max-w-3xl">
                <p>{product.description}</p>
                <ul>
                  <li>Premium quality materials and craftsmanship</li>
                  <li>Made with attention to detail</li>
                  <li>Perfect for daily use or special occasions</li>
                  <li>Elegant design that stands the test of time</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-4">Technical Specifications</h3>
                  <dl className="divide-y divide-enzobay-neutral-200">
                    {product.brand && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Brand</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.brand}</dd>
                      </div>
                    )}
                    {product.model && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Model</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.model}</dd>
                      </div>
                    )}
                    {product.material && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Material</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.material}</dd>
                      </div>
                    )}
                    {product.dimensions && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Dimensions</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.dimensions}</dd>
                      </div>
                    )}
                    {product.weight && (
                      <div className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-enzobay-neutral-600">Weight</dt>
                        <dd className="text-sm text-enzobay-neutral-900">{product.weight}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-4">Package Contents</h3>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">{product.name}</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">User Manual</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">Warranty Card</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue" />
                      <span className="ml-3">Care Instructions</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Shipping Information</h3>
                  <p className="text-enzobay-neutral-600 mb-4">
                    We offer several shipping options to meet your needs:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Standard Shipping:</span> 3-7 business days (KSH 300-500)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Express Shipping:</span> 1-3 business days (KSH 500-800)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Free Shipping:</span> On orders above KSH 5,000 (Standard delivery)
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Return Policy</h3>
                  <p className="text-enzobay-neutral-600 mb-4">
                    We want you to be completely satisfied with your purchase:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-600">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">30-Day Returns:</span> Return most items within 30 days of delivery for a full refund.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Condition:</span> Items must be unworn, unwashed, and in original packaging with tags attached.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 flex-shrink-0 text-enzobay-blue mt-0.5" />
                      <div className="ml-3">
                        <span className="font-medium text-enzobay-neutral-900">Process:</span> Initiate your return through your account or contact our customer service.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-enzobay-brown">Customer Reviews</h3>
                  <button className="rounded-md bg-enzobay-blue px-4 py-2 text-sm font-medium text-white hover:bg-enzobay-blue-dark">
                    Write a Review
                  </button>
                </div>
                
                <div className="mb-8 flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-enzobay-brown">{product.rating.toFixed(1)}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-enzobay-orange fill-enzobay-orange"
                              : "text-enzobay-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-enzobay-neutral-500">
                      Based on {product.reviews} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1 ml-6">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center mt-1">
                        <span className="text-sm text-enzobay-neutral-600 w-9">{star} star</span>
                        <div className="flex-1 h-2 mx-2 bg-enzobay-neutral-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-enzobay-orange rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample reviews */}
                <div className="border-t border-enzobay-neutral-200 pt-6 space-y-8">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b border-enzobay-neutral-200 pb-8 last:border-0">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="text-base font-medium text-enzobay-brown">John Doe</h4>
                          <div className="text-xs text-enzobay-neutral-500">Verified Purchase</div>
                        </div>
                        <div className="text-xs text-enzobay-neutral-500">3 months ago</div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < 4 + Math.floor(Math.random() * 2)
                                ? "text-enzobay-orange fill-enzobay-orange"
                                : "text-enzobay-neutral-200"
                            }`}
                          />
                        ))}
                      </div>
                      <h5 className="text-sm font-medium text-enzobay-brown mb-2">Excellent quality and fast delivery!</h5>
                      <p className="text-sm text-enzobay-neutral-600">
                        I'm extremely satisfied with this purchase. The quality is outstanding and it looks even better in person. The delivery was fast and the packaging was secure. Would definitely recommend!
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      <SimilarProducts product={product} />
      
      {/* Recently Viewed Section */}
      <RecentlyViewed />
      
      {/* Image Modal for fullscreen view */}
      <ImageModal 
        images={product.images}
        initialIndex={selectedImage}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  );
}
