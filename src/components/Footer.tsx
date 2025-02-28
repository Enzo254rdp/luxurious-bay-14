
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-enzobay-brown text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">EnzoBay</h3>
            <p className="text-enzobay-neutral-300 mb-6">
              Your premier destination for luxury products. We offer a curated selection of high-quality items that bring elegance and style to your life.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-enzobay-neutral-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-enzobay-neutral-300 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="text-enzobay-neutral-300 hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/flash-sale" className="text-enzobay-neutral-300 hover:text-white transition-colors">Flash Sale</Link>
              </li>
              <li>
                <Link to="/about" className="text-enzobay-neutral-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-enzobay-neutral-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-enzobay-neutral-300 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-enzobay-neutral-300 hover:text-white transition-colors">Shipping Information</Link>
              </li>
              <li>
                <Link to="/returns" className="text-enzobay-neutral-300 hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-enzobay-neutral-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-enzobay-neutral-300 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-enzobay-orange mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-enzobay-neutral-300">
                  123 Luxury Avenue, Westlands<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-enzobay-orange mr-3 flex-shrink-0" />
                <a href="tel:+254700123456" className="text-enzobay-neutral-300 hover:text-white transition-colors">
                  +254 700 123 456
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-enzobay-orange mr-3 flex-shrink-0" />
                <a href="mailto:info@enzobay.com" className="text-enzobay-neutral-300 hover:text-white transition-colors">
                  info@enzobay.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-enzobay-neutral-300">
                Stay updated with our latest offers and promotions.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full md:w-64 bg-white/10 border border-white/20 py-2 px-4 rounded-l-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-enzobay-orange/50"
              />
              <button className="bg-enzobay-orange hover:bg-enzobay-orange-dark py-2 px-4 rounded-r-md font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-enzobay-brown-dark py-4 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-enzobay-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} EnzoBay. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6 w-auto" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6 w-auto" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-6 w-auto" />
              <img src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png" alt="M-Pesa" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
