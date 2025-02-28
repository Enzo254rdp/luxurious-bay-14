
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Carousel slide data
const slides = [
  {
    id: 1,
    title: "Discover Luxury Redefined",
    subtitle: "Premium Shopping Experience",
    description: "Explore our curated collection of the finest products from around the world. Where quality meets elegance, and exclusivity is standard.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop",
    callout: {
      title: "Signature Gold Series",
      subtitle: "Featured Collection",
      price: "Starting from KSH 125,000",
      link: "/products/watches"
    }
  },
  {
    id: 2,
    title: "Elegance in Every Detail",
    subtitle: "Handcrafted Luxury",
    description: "Each product is meticulously crafted by artisans who have perfected their craft over generations. Experience true luxury.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
    callout: {
      title: "Premium Leather Collection",
      subtitle: "New Arrival",
      price: "Starting from KSH 68,000",
      link: "/products/bags"
    }
  },
  {
    id: 3,
    title: "Timeless Sophistication",
    subtitle: "Limited Edition",
    description: "Our exclusive collections combine timeless design with contemporary elegance. For those who appreciate the finer things in life.",
    image: "https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=2067&auto=format&fit=crop",
    callout: {
      title: "Diamond Collection",
      subtitle: "Exclusive Series",
      price: "Starting from KSH 215,000",
      link: "/products/jewelry"
    }
  }
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Automatic slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);
  
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

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Match this with transition duration
  };

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700); // Match this with transition duration
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-white to-enzobay-neutral-100"
    >
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-enzobay-orange/5 blur-3xl" />
      <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-enzobay-blue/5 blur-3xl" />
      
      {/* Carousel */}
      <div className="relative h-[600px] md:h-[650px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide || (currentSlide === 0 && index === slides.length - 1)
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 h-full relative z-10">
              <div className="flex items-center h-full">
                <div className="max-w-xl text-white space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-orange/80 text-white mb-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance animate-fade-in" style={{animationDelay: "0.5s"}}>
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/80 max-w-lg animate-fade-in" style={{animationDelay: "0.7s"}}>
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4 animate-fade-in" style={{animationDelay: "0.9s"}}>
                    <Link to="/products" className="btn-primary flex items-center gap-2">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/categories" className="border border-white/30 text-white font-medium py-2 px-6 rounded-md hover:bg-white/10 transition-colors duration-300">
                      View Categories
                    </Link>
                  </div>
                </div>
                
                {/* Product callout */}
                <div className="hidden md:block absolute right-8 bottom-8 w-64 animate-fade-in" style={{animationDelay: "1.1s"}}>
                  <div className="glass-card p-5 rounded-xl">
                    <div>
                      <p className="text-sm text-enzobay-blue">{slide.callout.subtitle}</p>
                      <h3 className="text-xl font-semibold text-enzobay-brown">{slide.callout.title}</h3>
                      <p className="text-enzobay-neutral-600 mb-3">{slide.callout.price}</p>
                      <Link 
                        to={slide.callout.link} 
                        className="inline-block btn-primary !py-1.5 !px-4"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white transition-all duration-300"
          disabled={isAnimating}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white transition-all duration-300"
          disabled={isAnimating}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-enzobay-orange w-8" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Quick Category Access */}
      <div className="bg-white border-b border-enzobay-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto py-4 gap-4 scrollbar-none">
            <Link to="/products/watches" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors">Watches</span>
            </Link>
            
            <Link to="/products/bags" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11V7C16 4.79086 14.2091 3 12 3V3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors">Bags</span>
            </Link>
            
            <Link to="/products/accessories" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7L4.62127 17.4633C4.72383 19.4309 6.36098 21 8.33078 21H15.6692C17.639 21 19.2762 19.4309 19.3787 17.4633L20 7M4 7H20M4 7L6.5 7M20 7L17.5 7M6.5 7V5C6.5 3.34315 7.84315 2 9.5 2H14.5C16.1569 2 17.5 3.34315 17.5 5V7M6.5 7H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors">Accessories</span>
            </Link>
            
            <Link to="/products/jewelry" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L17.5 7.5L12 12L6.5 7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 7.5L3 15L8.5 21L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 7.5L21 15L15.5 21L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors">Jewelry</span>
            </Link>
            
            <Link to="/products/clothing" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7L9 3M9 3V21M9 3H15M21 7L15 3M15 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors">Clothing</span>
            </Link>
            
            <Link to="/products/home" className="flex flex-col items-center min-w-[100px] group">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10.182V22H21V10.182L12 2L3 10.182Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14L9 22" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 14L15 22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-sm text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
