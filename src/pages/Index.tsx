
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS, CATEGORIES } from "../lib/types";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast notification
    const hasShownWelcome = sessionStorage.getItem("hasShownWelcome");
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: "Welcome to EnzoBay",
          description: "Experience luxury shopping at its finest",
          variant: "default",
        });
        sessionStorage.setItem("hasShownWelcome", "true");
      }, 1500);
    }
  }, [toast]);

  // Group products by category for Jumia-style sections
  const groupedProducts = CATEGORIES.map(category => ({
    category,
    products: PRODUCTS.filter(product => product.category === category.id.toLowerCase() || product.category === category.name.toLowerCase())
  })).filter(group => group.products.length > 0);

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      <main>
        {/* Featured Products Section - Displaying products immediately on load */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                Top Picks For You
              </h2>
              <Link 
                to="/products?sort=popular" 
                className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.slice(0, 6).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <Hero />
        
        {/* Top Deals - Jumia Style */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                Top Deals
              </h2>
              <Link 
                to="/products?sort=deals" 
                className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
              >
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.filter(p => p.discount).slice(0, 6).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Flash Sale Banner */}
        <section className="py-6 bg-enzobay-orange/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-white shadow-sm">
              <div className="flex items-center">
                <div className="w-14 h-14 flex items-center justify-center bg-enzobay-orange rounded-full text-white text-xl font-bold mr-4">
                  %
                </div>
                <div>
                  <h3 className="text-xl font-bold text-enzobay-brown">Flash Sale</h3>
                  <p className="text-enzobay-neutral-600">Limited time offers on premium products</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-enzobay-neutral-100 px-3 py-2 rounded-md text-center">
                  <span className="block text-enzobay-orange text-xl font-bold">12</span>
                  <span className="text-xs text-enzobay-neutral-600">Hours</span>
                </div>
                <div className="bg-enzobay-neutral-100 px-3 py-2 rounded-md text-center">
                  <span className="block text-enzobay-orange text-xl font-bold">45</span>
                  <span className="text-xs text-enzobay-neutral-600">Minutes</span>
                </div>
                <div className="bg-enzobay-neutral-100 px-3 py-2 rounded-md text-center">
                  <span className="block text-enzobay-orange text-xl font-bold">30</span>
                  <span className="text-xs text-enzobay-neutral-600">Seconds</span>
                </div>
              </div>
              <Link 
                to="/flash-sale" 
                className="bg-enzobay-orange text-white py-2 px-6 rounded-md hover:bg-enzobay-orange-dark transition-colors duration-300 whitespace-nowrap"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section with Jumia-style layout */}
        <FeaturedProducts />
        
        {/* Categories Grid - More Jumia-like */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-blue"></span>
                Shop By Category
              </h2>
              <Link 
                to="/categories" 
                className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((category, index) => (
                <Link 
                  key={category.id}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center p-4 group animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-center group-hover:text-enzobay-orange transition-colors">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Product Sections by Category - Jumia-style */}
        {groupedProducts.map((group, groupIndex) => (
          <section key={group.category.id} className={`py-10 ${groupIndex % 2 === 0 ? 'bg-enzobay-neutral-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                  <span className="mr-2 inline-block w-3 h-6 bg-enzobay-orange"></span>
                  {group.category.name}
                </h2>
                <Link 
                  to={`/products?category=${group.category.name.toLowerCase()}`} 
                  className="text-enzobay-orange hover:underline flex items-center text-sm font-medium"
                >
                  See All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        
        {/* Promotional Banner - Similar to existing but more Jumia-like */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury promotional background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-enzobay-brown-light/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white max-w-2xl mb-8 md:mb-0">
                <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-enzobay-orange text-white mb-4">
                  New Collection
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Elegance Redefined</h2>
                <p className="text-white/90 mb-6">
                  Discover our exclusive new arrivals. Limited quantities crafted for those who appreciate the extraordinary.
                </p>
                <Link 
                  to="/products?collection=new" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="w-full md:w-1/3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2025&auto=format&fit=crop" 
                  alt="Luxury collection preview" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Now Section - Jumia Style */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-enzobay-brown flex items-center">
                <span className="mr-2 inline-block w-3 h-6 bg-enzobay-blue"></span>
                Trending Now
              </h2>
              <Link 
                to="/products?sort=trending" 
                className="text-enzobay-blue hover:underline flex items-center text-sm font-medium"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 6).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section with improved animation */}
        <section className="py-16 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-blue/10 text-enzobay-blue mb-2">
                Client Experiences
              </span>
              <h2 className="text-3xl font-bold text-enzobay-brown">What Our Customers Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-xl border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 mb-4">
                  "The attention to detail in their products is outstanding. I've purchased multiple items, and each one exceeds my expectations in quality and elegance."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-enzobay-blue/20 flex items-center justify-center text-enzobay-blue font-semibold">
                    MK
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-enzobay-brown">Maria K.</h4>
                    <p className="text-sm text-enzobay-neutral-500">Loyal Customer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-xl border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1" style={{animationDelay: "0.1s"}}>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 mb-4">
                  "Their shipping is impressively fast, and the packaging is as luxurious as the products themselves. Every order feels like receiving a special gift."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-enzobay-orange/20 flex items-center justify-center text-enzobay-orange font-semibold">
                    JT
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-enzobay-brown">James T.</h4>
                    <p className="text-sm text-enzobay-neutral-500">Frequent Shopper</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-xl border border-enzobay-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1" style={{animationDelay: "0.2s"}}>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-enzobay-orange"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-enzobay-neutral-700 mb-4">
                  "I purchased a watch for my anniversary, and the customer service was exceptional. They helped me select the perfect piece and ensured it arrived on time."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-enzobay-blue/20 flex items-center justify-center text-enzobay-blue font-semibold">
                    SL
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-enzobay-brown">Sarah L.</h4>
                    <p className="text-sm text-enzobay-neutral-500">New Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-enzobay-blue/10 to-enzobay-orange/10 rounded-xl p-6 text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-enzobay-brown mb-3">Join Our Newsletter</h2>
              <p className="text-enzobay-neutral-700 mb-4">Get the latest updates on new products, special offers, and exclusive content.</p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 py-2 px-4 rounded-lg border border-enzobay-neutral-200 focus:outline-none focus:border-enzobay-blue focus:ring-2 focus:ring-enzobay-blue/20"
                />
                <button className="btn-primary whitespace-nowrap py-2 px-4">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-enzobay-neutral-500 mt-3">By subscribing, you agree to our Privacy Policy and consent to receive updates from EnzoBay.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
