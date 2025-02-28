
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, User, ShoppingCart, ChevronDown } from "lucide-react";
import { CartButton } from "./ui/cart-button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      {/* Top Bar */}
      <div className="bg-enzobay-brown text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>Free shipping on orders over KSH 5,000</p>
          <div className="hidden md:flex space-x-4">
            <Link to="/shipping" className="hover:text-enzobay-orange transition-colors">Shipping</Link>
            <Link to="/returns" className="hover:text-enzobay-orange transition-colors">Returns</Link>
            <Link to="/contact" className="hover:text-enzobay-orange transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-enzobay-brown">
            Enzo<span className="text-enzobay-orange">Bay</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-enzobay-orange' : 'text-enzobay-brown'}`}>
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-enzobay-brown group-hover:text-enzobay-orange transition-colors">
                Categories <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="py-2">
                  <Link to="/categories" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    All Categories
                  </Link>
                  <Link to="/products?category=watches" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    Watches
                  </Link>
                  <Link to="/products?category=bags" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    Bags
                  </Link>
                  <Link to="/products?category=accessories" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    Accessories
                  </Link>
                  <Link to="/products?category=clothing" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    Clothing
                  </Link>
                  <Link to="/products?category=electronics" className="block px-4 py-2 text-enzobay-neutral-800 hover:bg-enzobay-neutral-100">
                    Electronics
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'text-enzobay-orange' : 'text-enzobay-brown'}`}>
              Shop
            </Link>
            <Link to="/flash-sale" className={`nav-link ${location.pathname === '/flash-sale' ? 'text-enzobay-orange' : 'text-enzobay-brown'}`}>
              Flash Sale
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'text-enzobay-orange' : 'text-enzobay-brown'}`}>
              About
            </Link>
          </nav>
          
          {/* Search and Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-enzobay-neutral-100 py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-enzobay-orange/50 w-40 lg:w-56"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
            </form>
            
            {/* Action Icons */}
            <button className="p-2 text-enzobay-brown hover:text-enzobay-orange transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="p-2 text-enzobay-brown hover:text-enzobay-orange transition-colors relative">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-enzobay-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <CartButton itemCount={4} />
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-enzobay-brown hover:text-enzobay-orange transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="block md:hidden border-t border-enzobay-neutral-200">
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-enzobay-neutral-100 py-2 pl-10 pr-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-enzobay-orange/50 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
          </form>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-2xl font-bold text-enzobay-brown">
              Enzo<span className="text-enzobay-orange">Bay</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-enzobay-brown hover:text-enzobay-orange transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-4">
            <Link to="/" className="block py-2 text-lg text-enzobay-brown hover:text-enzobay-orange transition-colors">
              Home
            </Link>
            <div>
              <div className="py-2 text-lg text-enzobay-brown">Categories</div>
              <div className="pl-4 space-y-2">
                <Link to="/categories" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  All Categories
                </Link>
                <Link to="/products?category=watches" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  Watches
                </Link>
                <Link to="/products?category=bags" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  Bags
                </Link>
                <Link to="/products?category=accessories" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  Accessories
                </Link>
                <Link to="/products?category=clothing" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  Clothing
                </Link>
                <Link to="/products?category=electronics" className="block py-1 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                  Electronics
                </Link>
              </div>
            </div>
            <Link to="/products" className="block py-2 text-lg text-enzobay-brown hover:text-enzobay-orange transition-colors">
              Shop
            </Link>
            <Link to="/flash-sale" className="block py-2 text-lg text-enzobay-brown hover:text-enzobay-orange transition-colors">
              Flash Sale
            </Link>
            <Link to="/about" className="block py-2 text-lg text-enzobay-brown hover:text-enzobay-orange transition-colors">
              About
            </Link>
            
            <div className="border-t border-enzobay-neutral-200 pt-4 mt-4">
              <Link to="/shipping" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                Returns & Refunds
              </Link>
              <Link to="/contact" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                Contact Us
              </Link>
              <Link to="/faq" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors">
                FAQs
              </Link>
            </div>
            
            <div className="border-t border-enzobay-neutral-200 pt-4 mt-4">
              <Link to="/account" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </Link>
              <Link to="/wishlist" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
              </Link>
              <Link to="/cart" className="block py-2 text-enzobay-neutral-700 hover:text-enzobay-orange transition-colors flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
