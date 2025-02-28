
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
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
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-white to-enzobay-neutral-100"
    >
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-enzobay-orange/5 blur-3xl" />
      <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-enzobay-blue/5 blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-6 transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-orange/10 text-enzobay-orange mb-4">
                Premium Shopping Experience
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Discover Luxury <span className="text-gradient-gold">Redefined</span>
            </h1>
            <p className="text-lg text-enzobay-neutral-700 max-w-lg">
              Explore our curated collection of the finest products from around the world. 
              Where quality meets elegance, and exclusivity is standard.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="btn-primary flex items-center gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" className="border border-enzobay-neutral-300 text-enzobay-brown-light font-medium py-2 px-6 rounded-md hover:bg-enzobay-neutral-100 transition-colors duration-300">
                View Categories
              </Link>
            </div>
          </div>
          
          {/* Hero Image with Animation */}
          <div className={`relative transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop" 
                alt="Luxury watch display" 
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Product callout */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-5 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-enzobay-blue">Featured Collection</p>
                      <h3 className="text-xl font-semibold text-enzobay-brown">Signature Gold Series</h3>
                      <p className="text-enzobay-neutral-600">Starting from KSH 125,000</p>
                    </div>
                    <Link 
                      to="/products/watches" 
                      className="shrink-0 btn-primary !py-1.5 !px-4"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Animated accent elements */}
            <div className="absolute -left-6 top-1/3 w-12 h-12 rounded-full gold-gradient opacity-80 animate-float" />
            <div className="absolute -right-3 bottom-1/4 w-8 h-8 rounded-full blue-gradient opacity-80 animate-float" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
