
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { Percent } from "lucide-react";

export default function SalePage() {
  const [discountProducts, setDiscountProducts] = useState(PRODUCTS.filter(p => p.discount));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState(discountProducts);
  
  // Filter products when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setVisibleProducts(discountProducts);
    } else {
      const filtered = discountProducts.filter(product => 
        product.category === selectedCategory.toLowerCase() || 
        product.tags.includes(selectedCategory.toLowerCase())
      );
      setVisibleProducts(filtered);
    }
  }, [selectedCategory, discountProducts]);
  
  // Group products by discount percentage for better display
  const discountGroups = [
    { label: "50% Off & More", min: 50, max: 100 },
    { label: "30-49% Off", min: 30, max: 49 },
    { label: "20-29% Off", min: 20, max: 29 },
    { label: "10-19% Off", min: 10, max: 19 },
    { label: "Under 10% Off", min: 1, max: 9 }
  ];

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 py-12 md:py-20 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Sale Season</h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
              Incredible deals on thousands of products. Hurry, while stocks last!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {discountGroups.map((group, index) => {
                const count = discountProducts.filter(p => 
                  (p.discount || 0) >= group.min && (p.discount || 0) <= group.max
                ).length;
                
                if (count === 0) return null;
                
                return (
                  <a 
                    key={index}
                    href={`#group-${group.min}`}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                  >
                    {group.label} ({count})
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="py-4 overflow-x-auto flex gap-2 scrollbar-none snap-x">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start ${
                  !selectedCategory 
                    ? "bg-enzobay-orange text-white" 
                    : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                }`}
              >
                All Categories
              </button>
              
              {CATEGORIES.filter(cat => 
                discountProducts.some(p => 
                  p.category === cat.name.toLowerCase() || 
                  p.tags.includes(cat.name.toLowerCase())
                )
              ).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors snap-start ${
                    selectedCategory === category.name 
                      ? "bg-enzobay-orange text-white" 
                      : "bg-enzobay-neutral-100 text-enzobay-neutral-700 hover:bg-enzobay-neutral-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Sections by Discount Groups */}
        {discountGroups.map((group, index) => {
          const groupProducts = visibleProducts.filter(p => 
            (p.discount || 0) >= group.min && (p.discount || 0) <= group.max
          );
          
          if (groupProducts.length === 0) return null;
          
          return (
            <section 
              key={index} 
              id={`group-${group.min}`} 
              className={`py-10 ${index % 2 === 0 ? 'bg-white' : 'bg-enzobay-neutral-50'}`}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Percent className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown">
                    {group.label}
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {groupProducts.map(product => (
                    <div key={product.id} className="animate-fade-in">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        
        {/* No Products Message */}
        {visibleProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Percent className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-enzobay-brown mb-2">No sale items found</h3>
            <p className="text-enzobay-neutral-600 max-w-md mx-auto mb-6">
              There are currently no sale items in the selected category. Please check back later or browse other categories.
            </p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="btn-primary"
            >
              View All Sale Items
            </button>
          </div>
        )}
        
        {/* Sale Countdown */}
        <section className="py-10 bg-red-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-3">Sale Ends In</h2>
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-center min-w-[80px]">
                <span className="block text-red-600 text-2xl font-bold">05</span>
                <span className="text-xs text-enzobay-neutral-600">Days</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-center min-w-[80px]">
                <span className="block text-red-600 text-2xl font-bold">12</span>
                <span className="text-xs text-enzobay-neutral-600">Hours</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-center min-w-[80px]">
                <span className="block text-red-600 text-2xl font-bold">45</span>
                <span className="text-xs text-enzobay-neutral-600">Minutes</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-lg shadow-sm text-center min-w-[80px]">
                <span className="block text-red-600 text-2xl font-bold">30</span>
                <span className="text-xs text-enzobay-neutral-600">Seconds</span>
              </div>
            </div>
            <p className="text-enzobay-neutral-600 max-w-2xl mx-auto">
              Don't miss out on these amazing deals! Our sale is for a limited time only. Shop now and save big on your favorite products.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
