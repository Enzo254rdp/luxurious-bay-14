
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        
        {/* Categories Section */}
        <section className="py-16 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-brown/10 text-enzobay-brown mb-2">
                Explore
              </span>
              <h2 className="text-3xl font-bold text-enzobay-brown">Shop by Category</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Card 1 */}
              <div className="group overflow-hidden rounded-xl shadow-sm border border-enzobay-neutral-200 bg-white hover:shadow-md transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop"
                    alt="Watches category"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-semibold text-white mb-1">Watches</h3>
                      <p className="text-white/80 text-sm mb-3">Luxury timepieces</p>
                      <a 
                        href="/products?category=watches" 
                        className="inline-block text-sm font-medium text-white hover:text-enzobay-orange transition-colors"
                      >
                        Explore Collection →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Card 2 */}
              <div className="group overflow-hidden rounded-xl shadow-sm border border-enzobay-neutral-200 bg-white hover:shadow-md transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop"
                    alt="Bags category"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-semibold text-white mb-1">Bags</h3>
                      <p className="text-white/80 text-sm mb-3">Premium leather collections</p>
                      <a 
                        href="/products?category=bags" 
                        className="inline-block text-sm font-medium text-white hover:text-enzobay-orange transition-colors"
                      >
                        Explore Collection →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Card 3 */}
              <div className="group overflow-hidden rounded-xl shadow-sm border border-enzobay-neutral-200 bg-white hover:shadow-md transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop"
                    alt="Accessories category"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-semibold text-white mb-1">Accessories</h3>
                      <p className="text-white/80 text-sm mb-3">Designer sunglasses & more</p>
                      <a 
                        href="/products?category=accessories" 
                        className="inline-block text-sm font-medium text-white hover:text-enzobay-orange transition-colors"
                      >
                        Explore Collection →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Category Card 4 */}
              <div className="group overflow-hidden rounded-xl shadow-sm border border-enzobay-neutral-200 bg-white hover:shadow-md transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
                    alt="Clothing category"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-xl font-semibold text-white mb-1">Clothing</h3>
                      <p className="text-white/80 text-sm mb-3">Elegant evening wear</p>
                      <a 
                        href="/products?category=clothing" 
                        className="inline-block text-sm font-medium text-white hover:text-enzobay-orange transition-colors"
                      >
                        Explore Collection →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Promotional Banner */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury promotional background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-enzobay-brown-light/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center text-white">
              <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-enzobay-orange text-white mb-6">
                New Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Elegance Redefined</h2>
              <p className="text-lg mb-8 text-white/90">
                Discover our exclusive new arrivals. Limited quantities crafted for those who appreciate the extraordinary.
              </p>
              <a 
                href="/products?collection=new" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Shop the Collection
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-enzobay-blue/10 text-enzobay-blue mb-2">
                Client Experiences
              </span>
              <h2 className="text-3xl font-bold text-enzobay-brown">What Our Customers Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-enzobay-neutral-50 p-6 rounded-xl border border-enzobay-neutral-100 animate-fade-in">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-enzobay-orange"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
              <div className="bg-enzobay-neutral-50 p-6 rounded-xl border border-enzobay-neutral-100 animate-fade-in" style={{animationDelay: "0.1s"}}>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-enzobay-orange"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
              <div className="bg-enzobay-neutral-50 p-6 rounded-xl border border-enzobay-neutral-100 animate-fade-in" style={{animationDelay: "0.2s"}}>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-enzobay-orange"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
