
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-enzobay-brown-light/80 to-enzobay-brown-light/30"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-xl">
          <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-enzobay-orange text-white mb-6 animate-fade-in">
            Summer Collection 2023
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
            Elevate Your <span className="text-enzobay-orange">Style</span> With Premium Pieces
          </h1>
          <p className="text-white/90 text-lg mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Discover our exclusive collection of luxury items handpicked for the discerning individual. Quality pieces that make a statement.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <Link 
              to="/products" 
              className="btn-primary flex items-center gap-2"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/flash-sale" 
              className="bg-white text-enzobay-brown hover:bg-white/90 py-2.5 px-6 rounded-md transition-colors font-medium"
            >
              Flash Sale
            </Link>
          </div>
        </div>
      </div>
      
      {/* Feature Boxes */}
      <div className="relative bg-white border-b border-enzobay-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="w-10 h-10 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-enzobay-brown">Secure Payment</h3>
                <p className="text-sm text-enzobay-neutral-600">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in" style={{animationDelay: "0.5s"}}>
              <div className="w-10 h-10 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-enzobay-brown">Premium Quality</h3>
                <p className="text-sm text-enzobay-neutral-600">Certified authentic products</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="w-10 h-10 bg-enzobay-orange/10 rounded-full flex items-center justify-center text-enzobay-orange flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-enzobay-brown">Free Shipping</h3>
                <p className="text-sm text-enzobay-neutral-600">On orders over KSH 5,000</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 animate-fade-in" style={{animationDelay: "0.7s"}}>
              <div className="w-10 h-10 bg-enzobay-blue/10 rounded-full flex items-center justify-center text-enzobay-blue flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-enzobay-brown">24/7 Support</h3>
                <p className="text-sm text-enzobay-neutral-600">Dedicated customer service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
