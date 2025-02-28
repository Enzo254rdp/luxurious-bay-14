
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";
import { CartButton } from "./ui/cart-button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-white/95 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Text Logo */}
        <Link to="/" className="relative z-50">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-gradient-gold">Enzo</span>
              <span className="text-gradient-blue">Bay</span>
            </h1>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link font-medium">Home</Link>
          <Link to="/products" className="nav-link font-medium">Products</Link>
          <Link to="/categories" className="nav-link font-medium">Categories</Link>
          <Link to="/sale" className="nav-link font-medium">Sale</Link>
        </nav>
        
        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Search">
            <Search className="h-5 w-5 text-enzobay-brown" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="My Account">
            <User className="h-5 w-5 text-enzobay-brown" />
          </button>
          <CartButton itemCount={3} />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-enzobay-brown relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col space-y-6 text-lg">
              <Link 
                to="/" 
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/categories" 
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/sale" 
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sale
              </Link>
            </nav>
            
            <div className="mt-auto mb-8 flex justify-around">
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Search">
                <Search className="h-6 w-6 text-enzobay-brown" />
              </button>
              <button className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="My Account">
                <User className="h-6 w-6 text-enzobay-brown" />
              </button>
              <CartButton itemCount={3} onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
