
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlistStore } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { Heart, ShoppingBag, Trash2, ChevronRight } from "lucide-react";
import AddToCartButton from "../components/AddToCartButton";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const isEmpty = items.length === 0;

  return (
    <div className="bg-enzobay-neutral-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-enzobay-neutral-200 pb-6">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-enzobay-neutral-500">
                  <li>
                    <Link to="/" className="hover:text-enzobay-blue">Home</Link>
                  </li>
                  <li>
                    <span className="mx-2">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </li>
                  <li className="text-enzobay-neutral-800 font-medium">Wishlist</li>
                </ol>
              </nav>
              <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl mt-2">
                My Wishlist
              </h1>
            </div>
            <Link to="/products" className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark mt-2 md:mt-0">
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          {isEmpty ? (
            <div className="py-16 px-4 text-center">
              <Heart className="mx-auto h-16 w-16 text-enzobay-neutral-400" />
              <h2 className="mt-6 text-xl font-medium text-enzobay-brown">Your wishlist is empty</h2>
              <p className="mt-2 text-enzobay-neutral-500">
                Save items you love for easy access later.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-enzobay-blue-dark"
                >
                  Discover Products
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {items.map((product) => {
                  // Calculate price with discount
                  const price = product.price;
                  const discountedPrice = product.discount 
                    ? price * (1 - product.discount / 100) 
                    : price;

                  return (
                    <div key={product.id} className="group bg-white rounded-lg overflow-hidden border border-enzobay-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-square">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity"
                          />
                        </Link>
                        
                        <div className="absolute top-0 right-0 pt-2 pr-2">
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white text-enzobay-neutral-700 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        
                        {product.discount && (
                          <div className="absolute top-2 left-2">
                            <div className="bg-enzobay-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                              {product.discount}% OFF
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-enzobay-brown line-clamp-2 mb-1">
                          <Link to={`/product/${product.id}`} className="hover:text-enzobay-blue">
                            {product.name}
                          </Link>
                        </h3>
                        
                        <div className="flex items-baseline mt-1">
                          <p className="text-base font-medium text-enzobay-brown">
                            {formatPrice(discountedPrice)}
                          </p>
                          {product.discount && (
                            <p className="ml-2 text-sm text-enzobay-neutral-500 line-through">
                              {formatPrice(price)}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <AddToCartButton product={product} variant="primary" size="full" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-sm text-enzobay-neutral-500 hover:text-enzobay-neutral-800 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Wishlist
                </button>
                <span className="text-sm text-enzobay-neutral-500">
                  {items.length} item{items.length !== 1 ? 's' : ''} in wishlist
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
