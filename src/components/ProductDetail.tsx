
import { useState } from "react";
import { Heart, ShoppingBag, Check, Star, ChevronDown, ChevronUp, Share2, ShieldCheck, Truck, RotateCw } from "lucide-react";
import { Product } from "../lib/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  const [activeTab, setActiveTab] = useState("details");

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
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-enzobay-neutral-500">
          <ol className="flex items-center space-x-1">
            <li>
              <a href="/" className="hover:text-enzobay-blue transition-colors">Home</a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <a href="/products" className="hover:text-enzobay-blue transition-colors">Products</a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <a href={`/products/${product.category}`} className="hover:text-enzobay-blue transition-colors capitalize">{product.category}</a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="text-enzobay-neutral-700 font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-xl border border-enzobay-neutral-200 bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 gold-gradient text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  {product.discount}% OFF
                </div>
              )}
              <button 
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-enzobay-neutral-100 transition-colors"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5 text-enzobay-neutral-700" />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`relative min-w-[70px] w-20 aspect-square rounded-md overflow-hidden border snap-start ${
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

            {/* Product Benefits */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="flex flex-col items-center text-center p-3 rounded-lg border border-enzobay-neutral-200">
                <Truck className="h-5 w-5 text-enzobay-blue mb-2" />
                <span className="text-xs font-medium text-enzobay-neutral-700">Free Shipping</span>
                <span className="text-xs text-enzobay-neutral-500">On orders over KSH 5,000</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border border-enzobay-neutral-200">
                <RotateCw className="h-5 w-5 text-enzobay-blue mb-2" />
                <span className="text-xs font-medium text-enzobay-neutral-700">Easy Returns</span>
                <span className="text-xs text-enzobay-neutral-500">30-day return policy</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg border border-enzobay-neutral-200">
                <ShieldCheck className="h-5 w-5 text-enzobay-blue mb-2" />
                <span className="text-xs font-medium text-enzobay-neutral-700">Quality Guarantee</span>
                <span className="text-xs text-enzobay-neutral-500">Authentic products</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="blue-gradient text-white text-xs font-medium px-3 py-1 rounded-full">
                  New Arrival
                </span>
              )}
              {product.inStock && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" /> In Stock
                </span>
              )}
            </div>
            
            {/* Product Title & Rating */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3">
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
            </div>
            
            {/* Price */}
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-enzobay-brown mr-3">
                {formatPrice(product.price)}
              </span>
              {product.discount && (
                <span className="text-lg text-enzobay-neutral-500 line-through">
                  {formatPrice(product.price * (1 + product.discount / 100))}
                </span>
              )}
              {product.discount && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  Save {formatPrice(product.price * (product.discount / 100))}
                </span>
              )}
            </div>
            
            {/* Short Description */}
            <p className="text-enzobay-neutral-600">
              {product.description.split('.')[0]}.
            </p>
            
            {/* Color/Variant Options (if available) */}
            {product.options && product.options.colors && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-enzobay-neutral-700">Color:</span>
                  <span className="text-sm text-enzobay-blue">Color Guide</span>
                </div>
                <div className="flex gap-3">
                  {product.options.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-white outline outline-1 outline-enzobay-neutral-200 hover:outline-enzobay-blue transition-colors focus:outline-offset-2 focus:outline-enzobay-blue"
                      style={{ backgroundColor: color }}
                      aria-label={`Select ${color} color`}
                    ></button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Options (if available) */}
            {product.options && product.options.sizes && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-enzobay-neutral-700">Size:</span>
                  <span className="text-sm text-enzobay-blue">Size Guide</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((size, index) => (
                    <button
                      key={index}
                      className="min-w-[40px] h-10 px-3 rounded-md border border-enzobay-neutral-200 hover:border-enzobay-blue hover:bg-enzobay-blue/5 transition-colors focus:outline-none focus:ring-2 focus:ring-enzobay-blue"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-enzobay-neutral-700">Quantity:</label>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="sm:flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="border border-enzobay-neutral-300 text-enzobay-brown rounded-md flex items-center justify-center gap-2 py-3 px-6 hover:bg-enzobay-neutral-100 transition-colors">
                <Heart className="h-5 w-5" />
                Wishlist
              </button>
            </div>
            
            {/* Estimated Delivery */}
            <div className="flex items-start gap-3 p-4 bg-enzobay-neutral-50 rounded-lg">
              <Truck className="h-5 w-5 text-enzobay-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-enzobay-brown">Estimated Delivery:</p>
                <p className="text-sm text-enzobay-neutral-600">
                  {product.inStock 
                    ? "1-3 business days (Nairobi), 3-7 business days (Rest of Kenya)" 
                    : "Currently out of stock. Please check back later."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12 border-t border-enzobay-neutral-200 pt-8">
          <div className="border-b border-enzobay-neutral-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "details"
                    ? "text-enzobay-blue border-b-2 border-enzobay-blue"
                    : "text-enzobay-neutral-600 hover:text-enzobay-brown"
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "specifications"
                    ? "text-enzobay-blue border-b-2 border-enzobay-blue"
                    : "text-enzobay-neutral-600 hover:text-enzobay-brown"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "shipping"
                    ? "text-enzobay-blue border-b-2 border-enzobay-blue"
                    : "text-enzobay-neutral-600 hover:text-enzobay-brown"
                }`}
              >
                Shipping & Returns
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "text-enzobay-blue border-b-2 border-enzobay-blue"
                    : "text-enzobay-neutral-600 hover:text-enzobay-brown"
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
          </div>
          
          <div className="py-6">
            {activeTab === "details" && (
              <div className="max-w-3xl prose prose-enzobay">
                <p className="text-enzobay-neutral-700">{product.description}</p>
                <ul className="mt-4 space-y-2">
                  <li>Premium quality materials and craftsmanship</li>
                  <li>Designed for durability and everyday use</li>
                  <li>Ergonomic design for maximum comfort</li>
                  <li>Modern aesthetic that complements any style</li>
                </ul>
              </div>
            )}
            
            {activeTab === "specifications" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-4">Product Specifications</h3>
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-enzobay-neutral-200">
                        <tr>
                          <td className="py-3 text-enzobay-neutral-600 font-medium">Brand</td>
                          <td className="py-3 text-enzobay-brown">{product.brand || "EnzoBay"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-enzobay-neutral-600 font-medium">Model</td>
                          <td className="py-3 text-enzobay-brown">{product.model || "Premium"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-enzobay-neutral-600 font-medium">Material</td>
                          <td className="py-3 text-enzobay-brown">{product.material || "Premium Quality"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-enzobay-neutral-600 font-medium">Dimensions</td>
                          <td className="py-3 text-enzobay-brown">{product.dimensions || "Standard Size"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-enzobay-neutral-600 font-medium">Weight</td>
                          <td className="py-3 text-enzobay-brown">{product.weight || "Standard Weight"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown mb-4">Package Contents</h3>
                    <ul className="space-y-2 text-sm text-enzobay-neutral-700">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-enzobay-blue" />
                        <span>1 x {product.name}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-enzobay-blue" />
                        <span>User Manual</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-enzobay-blue" />
                        <span>Warranty Card</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-enzobay-blue" />
                        <span>Premium Packaging</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "shipping" && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Shipping Information</h3>
                  <p className="text-enzobay-neutral-700 mb-4">
                    We offer several shipping options to meet your needs:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-700">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">Standard Shipping:</span> 3-7 business days (KSH 300-500)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">Express Shipping:</span> 1-3 business days (KSH 500-800)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">Free Shipping:</span> On orders above KSH 5,000 (Standard delivery)
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Return Policy</h3>
                  <p className="text-enzobay-neutral-700 mb-4">
                    We want you to be completely satisfied with your purchase:
                  </p>
                  <ul className="space-y-3 text-sm text-enzobay-neutral-700">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">30-Day Returns:</span> Return most items within 30 days of delivery for a full refund.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">Condition:</span> Items must be unworn, unwashed, and in original packaging with tags attached.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-enzobay-blue mt-1" />
                      <div>
                        <span className="font-medium text-enzobay-brown">Process:</span> Initiate your return through your account or contact our customer service.
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-enzobay-brown mb-3">Warranty Information</h3>
                  <p className="text-enzobay-neutral-700">
                    This product comes with a 1-year manufacturer's warranty covering defects in materials and workmanship under normal use.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-enzobay-brown">Customer Reviews</h3>
                  <button className="text-sm font-medium text-white bg-enzobay-blue hover:bg-enzobay-blue-dark rounded-md px-4 py-2 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-enzobay-brown">{product.rating}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-enzobay-orange fill-enzobay-orange"
                                : "text-enzobay-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-enzobay-neutral-500 mt-1">{product.reviews} reviews</div>
                    </div>
                    
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2 mb-1">
                          <div className="text-xs text-enzobay-neutral-600 w-6">{star} ★</div>
                          <div className="flex-1 bg-enzobay-neutral-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-enzobay-orange h-2 rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b border-enzobay-neutral-200 pb-6 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-enzobay-brown">John Doe</div>
                          <div className="text-xs text-enzobay-neutral-500">Verified Buyer</div>
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
                                : "text-enzobay-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <h4 className="text-sm font-medium text-enzobay-brown mb-1">Excellent quality product</h4>
                      <p className="text-sm text-enzobay-neutral-600">
                        I'm extremely satisfied with this purchase. The quality is outstanding and it looks even better in person. The delivery was fast and the packaging was secure. Would definitely recommend!
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
