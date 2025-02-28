
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollPosition } from "../hooks/use-mobile";
import { useWishlistStore, useCartStore } from "../lib/store";
import { Heart, ShoppingCart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import EnzoBayLogo from "./EnzoBayLogo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { pathname } = useLocation();
  const scrollPosition = useScrollPosition();
  
  const { items: cartItems, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    setIsScrolled(scrollPosition > 10);
  }, [scrollPosition]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 bg-white ${
        isScrolled ? "shadow-md" : ""
      } transition-shadow duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-enzobay-neutral-600 hover:text-enzobay-brown"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <EnzoBayLogo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/"
              className={`nav-link ${pathname === "/" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
            >
              Home
            </Link>
            <div className="relative group">
              <Link 
                to="/products"
                className={`nav-link flex items-center ${pathname === "/products" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
              >
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 hover:text-enzobay-blue"
                    role="menuitem"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/categories"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 hover:text-enzobay-blue"
                    role="menuitem"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/products?sort=popular"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 hover:text-enzobay-blue"
                    role="menuitem"
                  >
                    Most Popular
                  </Link>
                  <Link
                    to="/products?sort=newest"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 hover:text-enzobay-blue"
                    role="menuitem"
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/sale"
              className={`nav-link ${pathname === "/sale" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
            >
              Sale
            </Link>
            <Link 
              to="/about"
              className={`nav-link ${pathname === "/about" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className={`nav-link ${pathname === "/contact" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon and Form */}
            <div className="relative">
              <button
                type="button"
                className="text-enzobay-neutral-600 hover:text-enzobay-brown"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
              </button>
              
              {showSearch && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2 z-50">
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 border-enzobay-neutral-300 rounded-l-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-enzobay-blue text-white px-3 py-2 rounded-r-md"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* User menu */}
            <div className="relative group">
              <Link to="/login" className="text-enzobay-neutral-600 hover:text-enzobay-brown">
                <User className="h-5 w-5" />
              </Link>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    role="menuitem"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    role="menuitem"
                  >
                    Register
                  </Link>
                  <hr className="my-1 border-enzobay-neutral-200" />
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    role="menuitem"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    role="menuitem"
                  >
                    My Orders
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Wishlist Icon with Badge */}
            <Link 
              to="/wishlist" 
              className="text-enzobay-neutral-600 hover:text-enzobay-brown relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Icon with Badge */}
            <Link 
              to="/cart" 
              className="text-enzobay-neutral-600 hover:text-enzobay-brown relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Drawer panel */}
        <div 
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ease-in-out duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-enzobay-neutral-600 hover:text-enzobay-brown"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="pt-5 pb-4 px-4">
            <div className="flex items-center">
              <EnzoBayLogo />
            </div>
          </div>
          
          <div className="mt-5 px-4 border-t border-enzobay-neutral-200">
            <nav className="flex-1 mt-4 space-y-4">
              <Link 
                to="/"
                className={`block text-base font-medium ${pathname === "/" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products"
                className={`block text-base font-medium ${pathname === "/products" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/categories"
                className={`block text-base font-medium ${pathname === "/categories" ? "text-enzobay-orange" : "text-enzobay-neutral-700"} pl-4 border-l-2 border-enzobay-neutral-100`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/products?sort=newest"
                className={`block text-base font-medium text-enzobay-neutral-700 pl-4 border-l-2 border-enzobay-neutral-100`}
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                to="/products?sort=popular"
                className={`block text-base font-medium text-enzobay-neutral-700 pl-4 border-l-2 border-enzobay-neutral-100`}
                onClick={() => setIsMenuOpen(false)}
              >
                Most Popular
              </Link>
              <Link 
                to="/sale"
                className={`block text-base font-medium ${pathname === "/sale" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sale
              </Link>
              <Link 
                to="/about"
                className={`block text-base font-medium ${pathname === "/about" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact"
                className={`block text-base font-medium ${pathname === "/contact" ? "text-enzobay-orange" : "text-enzobay-neutral-700"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
          
          <div className="px-4 py-6 border-t border-enzobay-neutral-200">
            <div className="flex items-center justify-around">
              <Link 
                to="/login" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <User className="h-6 w-6" />
                  <span className="mt-1 text-xs">Account</span>
                </div>
              </Link>
              <Link 
                to="/wishlist" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <Heart className="h-6 w-6" />
                  <span className="mt-1 text-xs">Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-5 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart" 
                className="text-enzobay-blue hover:text-enzobay-blue-dark relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex flex-col items-center">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="mt-1 text-xs">Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-5 bg-enzobay-orange text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
