
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../lib/types";

export default function FeaturedProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isInView, setIsInView] = useState(false);

  const featuredProducts = PRODUCTS.filter(product => product.isFeatured);
  
  useEffect(() => {
    setIsInView(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 delay-100 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-blue/10 text-enzobay-blue mb-2">
                Handpicked
              </span>
              <h2 className="text-3xl font-bold text-enzobay-brown">Featured Products</h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className={`p-2 rounded-full border border-enzobay-neutral-200 ${
                  showLeftArrow 
                    ? "text-enzobay-brown hover:bg-enzobay-neutral-100 hover:border-enzobay-neutral-300" 
                    : "text-enzobay-neutral-300 cursor-not-allowed"
                } transition-colors duration-300`}
                disabled={!showLeftArrow}
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={scrollRight}
                className={`p-2 rounded-full border border-enzobay-neutral-200 ${
                  showRightArrow 
                    ? "text-enzobay-brown hover:bg-enzobay-neutral-100 hover:border-enzobay-neutral-300" 
                    : "text-enzobay-neutral-300 cursor-not-allowed"
                } transition-colors duration-300`}
                disabled={!showRightArrow}
                aria-label="Scroll right"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 -mx-4 px-4 snap-x"
        >
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start transition-all duration-700 ${
                isInView 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${150 + index * 75}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
