
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-enzobay-neutral-900 text-enzobay-neutral-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img 
                src="/lovable-uploads/d698f888-e47d-47d9-b3be-ea5ea947932c.png" 
                alt="EnzoBay Logo" 
                className="h-12 w-auto object-contain brightness-200 contrast-200"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Premium luxury e-commerce platform offering exclusive products with exceptional 
              quality and unparalleled customer service.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-enzobay-neutral-800 flex items-center justify-center 
                text-enzobay-neutral-400 hover:bg-enzobay-orange hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-enzobay-neutral-800 flex items-center justify-center 
                text-enzobay-neutral-400 hover:bg-enzobay-orange hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-enzobay-neutral-800 flex items-center justify-center 
                text-enzobay-neutral-400 hover:bg-enzobay-orange hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-enzobay-orange transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-enzobay-orange transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-enzobay-orange transition-colors duration-200">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/sale" className="hover:text-enzobay-orange transition-colors duration-200">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-enzobay-orange transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="hover:text-enzobay-orange transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-enzobay-orange transition-colors duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-enzobay-orange transition-colors duration-200">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-enzobay-orange transition-colors duration-200">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-enzobay-orange transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-enzobay-orange shrink-0" />
                <span>123 Luxury Avenue, Nairobi, Kenya</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-enzobay-orange shrink-0" />
                <span>+254 700 123 456</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-enzobay-orange shrink-0" />
                <span>support@enzobay.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white text-sm mb-3">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="py-2 px-4 w-full bg-enzobay-neutral-800 rounded-l-md border-y border-l border-enzobay-neutral-700 focus:outline-none focus:border-enzobay-orange"
                />
                <button 
                  type="submit" 
                  className="btn-primary !rounded-l-none !py-2"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-enzobay-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {currentYear} EnzoBay. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm hover:text-enzobay-orange transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm hover:text-enzobay-orange transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
