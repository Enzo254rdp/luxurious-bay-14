
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Carousel slide data
const slides = [
  {
    id: 1,
    title: "Shop Smart, Save Big",
    subtitle: "Flash Sale Weekend",
    description: "Incredible deals on thousands of products. Limited time offers with free shipping on orders over KSH 5,000.",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop",
    callout: {
      title: "Up to 40% Off",
      subtitle: "Electronics",
      price: "Starting from KSH 999",
      link: "/flash-sale"
    }
  },
  {
    id: 2,
    title: "Premium Collection",
    subtitle: "Luxury Timepieces",
    description: "Discover our curated collection of the finest watches from around the world.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop",
    callout: {
      title: "Signature Gold Series",
      subtitle: "Featured Collection",
      price: "Starting from KSH 125,000",
      link: "/products/watches"
    }
  },
  {
    id: 3,
    title: "Back to School",
    subtitle: "Special Offers",
    description: "Everything students need for the new academic year. Backpacks, stationery, electronics and more.",
    image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=2070&auto=format&fit=crop",
    callout: {
      title: "Student Essentials",
      subtitle: "Limited Time",
      price: "Up to 25% off",
      link: "/products?tag=school"
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
      <div className="relative h-[500px] md:h-[550px]">
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
                <div className="max-w-xl text-white space-y-5">
                  <div>
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-orange/80 text-white mb-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
                      {slide.subtitle}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance animate-fade-in" style={{animationDelay: "0.5s"}}>
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/80 max-w-lg animate-fade-in" style={{animationDelay: "0.7s"}}>
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-3 animate-fade-in" style={{animationDelay: "0.9s"}}>
                    <Link to={slide.callout.link} className="btn-primary flex items-center gap-2">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link to="/categories" className="border border-white/30 text-white font-medium py-2 px-6 rounded-md hover:bg-white/10 transition-colors duration-300">
                      Browse Categories
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
          <div className="flex items-center justify-between overflow-x-auto py-4 gap-4 scrollbar-none snap-x">
            <Link to="/products/electronics" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors whitespace-nowrap">Electronics</span>
            </Link>
            
            <Link to="/products/fashion" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7L9 3M9 3V21M9 3H15M21 7L15 3M15 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors whitespace-nowrap">Fashion</span>
            </Link>
            
            <Link to="/products/home" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10.182V22H21V10.182L12 2L3 10.182Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14L9 22" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 14L15 22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors whitespace-nowrap">Home</span>
            </Link>
            
            <Link to="/products/beauty" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 21H16M12 3V17M12 17L16 13M12 17L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors whitespace-nowrap">Beauty</span>
            </Link>
            
            <Link to="/products/phones" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors whitespace-nowrap">Phones</span>
            </Link>
            
            <Link to="/products/sports" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 15C6 16.6569 8.68629 18 12 18C15.3137 18 18 16.6569 18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C4.44772 13 4 13.4477 4 14C4 14.5523 4.44772 15 5 15C5.55228 15 6 14.5523 6 14C6 13.4477 5.55228 13 5 13Z" fill="currentColor"/>
                  <path d="M19 13C18.4477 13 18 13.4477 18 14C18 14.5523 18.4477 15 19 15C19.5523 15 20 14.5523 20 14C20 13.4477 19.5523 13 19 13Z" fill="currentColor"/>
                  <path d="M5 20C4.44772 20 4 20.4477 4 21C4 21.5523 4.44772 22 5 22C5.55228 22 6 21.5523 6 21C6 20.4477 5.55228 20 5 20Z" fill="currentColor"/>
                  <path d="M19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors whitespace-nowrap">Sports</span>
            </Link>
            
            <Link to="/products/baby" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12H15M12 9V15M3 8L3 16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors whitespace-nowrap">Baby</span>
            </Link>
            
            <Link to="/products/toys" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-blue/10 flex items-center justify-center group-hover:bg-enzobay-blue/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 9C8.5 9 8.5 7 12 7C15.5 7 15.5 9 15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 15H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18L12 15L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-blue transition-colors whitespace-nowrap">Toys</span>
            </Link>
            
            <Link to="/products/grocery" className="flex flex-col items-center min-w-[80px] group snap-start">
              <div className="w-10 h-10 rounded-full bg-enzobay-orange/10 flex items-center justify-center group-hover:bg-enzobay-orange/20 transition-colors mb-1">
                <svg className="w-5 h-5 text-enzobay-orange" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H22L19 16H6L3 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 19C18 20.1046 17.1046 21 16 21C14.8954 21 14 20.1046 14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-enzobay-neutral-700 group-hover:text-enzobay-orange transition-colors whitespace-nowrap">Grocery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
