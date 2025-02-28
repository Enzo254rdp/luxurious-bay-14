
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Star, Clock } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="pt-10 bg-white sm:pt-16 lg:pt-8 lg:pb-14">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
                <div className="text-center lg:text-left">
                  <span className="inline-block bg-enzobay-orange/10 text-enzobay-orange text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                    Limited Time Sale • Up to 50% Off
                  </span>
                  <h1 className="text-4xl tracking-tight font-extrabold text-enzobay-brown sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <span className="block">Premium Quality</span>
                    <span className="block text-enzobay-blue">Luxury Products</span>
                  </h1>
                  <p className="mt-3 text-base text-enzobay-neutral-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Discover our exclusive collection of luxury items at unbeatable prices. Refined elegance for the discerning customer.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/flash-sale"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-enzobay-orange hover:bg-enzobay-orange-dark md:py-4 md:text-lg md:px-10"
                      >
                        Shop Sale
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/products"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-enzobay-blue bg-enzobay-blue-50 hover:bg-enzobay-blue-100 md:py-4 md:text-lg md:px-10"
                      >
                        Browse Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Shopping"
          />
        </div>
      </section>
      
      {/* Featured Categories Showcase */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-enzobay-brown">Shop by Category</h2>
            <p className="mt-4 text-lg text-enzobay-neutral-600">Explore our wide range of premium products</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {/* Category 1 */}
            <Link to="/products?category=watches" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop"
                  alt="Watches"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-semibold text-white">Watches</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 2 */}
            <Link to="/products?category=bags" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop"
                  alt="Bags"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-semibold text-white">Bags</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 3 */}
            <Link to="/products?category=clothing" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
                  alt="Clothing"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-semibold text-white">Clothing</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            
            {/* Category 4 */}
            <Link to="/products?category=electronics" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop"
                  alt="Electronics"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-semibold text-white">Electronics</h3>
                  <span className="inline-flex items-center text-sm text-white/90 mt-1">
                    Shop Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark font-medium"
            >
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-enzobay-neutral-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <ShoppingBag className="h-8 w-8 text-enzobay-blue" />
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Free Shipping</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">On all orders over KSh 5,000</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-enzobay-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Quality Guarantee</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">100% authentic products</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-enzobay-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">Secure Payments</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">Multiple payment methods</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-enzobay-blue-50 mb-4">
                <Clock className="h-8 w-8 text-enzobay-blue" />
              </div>
              <h3 className="text-lg font-semibold text-enzobay-brown">24/7 Support</h3>
              <p className="mt-2 text-sm text-enzobay-neutral-600">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sale Banner */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" 
                alt="Sale background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-enzobay-blue/80 to-enzobay-blue/40"></div>
            </div>
            
            <div className="relative py-16 px-6 sm:py-24 sm:px-12 lg:px-16">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Summer Sale
                </h2>
                <p className="mt-4 text-xl text-white">
                  Get up to 50% off on selected items. Limited time offer.
                </p>
                <Link
                  to="/flash-sale"
                  className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-enzobay-blue bg-white hover:bg-enzobay-neutral-100"
                >
                  Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
