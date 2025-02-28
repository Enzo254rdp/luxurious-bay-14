
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, getItemCount, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  
  const isEmpty = items.length === 0;
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 5000 ? 0 : 500;
  const discountAmount = discountApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal + shippingCost - discountAmount;
  
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setDiscountApplied(true);
    }
  };
  
  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      navigate("/checkout");
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="bg-enzobay-neutral-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-enzobay-neutral-200 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
              Shopping Cart
            </h1>
            <Link to="/products" className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          {isEmpty ? (
            <div className="py-16 px-4 text-center">
              <ShoppingBag className="mx-auto h-16 w-16 text-enzobay-neutral-400" />
              <h2 className="mt-6 text-xl font-medium text-enzobay-brown">Your cart is empty</h2>
              <p className="mt-2 text-enzobay-neutral-500">
                Looks like you haven't added any products to your cart yet.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-enzobay-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-enzobay-blue-dark"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <div className="lg:col-span-7">
                <div className="border-t border-b border-enzobay-neutral-200 divide-y divide-enzobay-neutral-200">
                  {items.map((item) => {
                    // Calculate discounted price if applicable
                    const price = item.price;
                    const discountedPrice = item.discount 
                      ? price * (1 - item.discount / 100) 
                      : price;
                    
                    return (
                      <div key={item.id} className="py-6 sm:py-8 flex">
                        <div className="flex-shrink-0 relative">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-24 w-24 sm:h-32 sm:w-32 rounded-md object-cover object-center"
                          />
                          {item.discount && (
                            <span className="absolute top-0 left-0 bg-enzobay-orange text-white text-xs font-bold px-1.5 py-0.5 rounded">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>

                        <div className="ml-4 sm:ml-6 flex-1 flex flex-col justify-between">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link to={`/product/${item.id}`} className="font-medium text-enzobay-brown hover:text-enzobay-blue">
                                    {item.name}
                                  </Link>
                                </h3>
                              </div>
                              <div className="flex mt-1 text-sm">
                                {item.options?.colors && (
                                  <p className="text-enzobay-neutral-500">Color: {item.options.colors[0]}</p>
                                )}
                                {item.options?.sizes && (
                                  <p className="text-enzobay-neutral-500 ml-4 border-l border-enzobay-neutral-200 pl-4">
                                    Size: {item.options.sizes[0]}
                                  </p>
                                )}
                              </div>
                              <div className="flex mt-1 text-sm">
                                <p className="text-enzobay-neutral-500">{item.brand || 'EnzoBay'}</p>
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-sm font-medium text-enzobay-brown">
                                  {formatPrice(discountedPrice)}
                                </p>
                                {item.discount && (
                                  <p className="text-xs text-enzobay-neutral-500 line-through ml-2">
                                    {formatPrice(price)}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9 flex flex-col items-end">
                              <div className="flex items-center border border-enzobay-neutral-300 rounded-md">
                                <button
                                  type="button"
                                  className="p-2 text-enzobay-neutral-600 hover:text-enzobay-neutral-800"
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-2 py-1 text-sm text-center w-10">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="p-2 text-enzobay-neutral-600 hover:text-enzobay-neutral-800"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <button
                                type="button"
                                className="mt-4 text-sm font-medium text-enzobay-neutral-500 hover:text-enzobay-neutral-800 flex items-center"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>

                          <p className="mt-4 flex text-sm text-enzobay-neutral-700">
                            <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                            <span className="ml-2">In stock and ready to ship</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="text-sm text-enzobay-neutral-500 hover:text-enzobay-neutral-800 flex items-center"
                    onClick={() => clearCart()}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear Cart
                  </button>
                  <Link
                    to="/products"
                    className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark flex items-center"
                  >
                    Continue Shopping
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-16 rounded-lg bg-white border border-enzobay-neutral-200 lg:mt-0 lg:col-span-5">
                <div className="px-4 py-6 sm:p-6 lg:p-8">
                  <h2 className="text-lg font-medium text-enzobay-brown">Order Summary</h2>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-enzobay-neutral-600">Subtotal ({getItemCount()} items)</p>
                      <p className="text-sm font-medium text-enzobay-brown">{formatPrice(cartTotal)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-enzobay-neutral-600">Shipping</p>
                      <p className="text-sm font-medium text-enzobay-brown">
                        {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                      </p>
                    </div>
                    
                    {discountApplied && (
                      <div className="flex items-center justify-between text-green-600">
                        <p className="text-sm">Discount (10%)</p>
                        <p className="text-sm font-medium">- {formatPrice(discountAmount)}</p>
                      </div>
                    )}
                    
                    <div className="border-t border-enzobay-neutral-200 pt-4 flex items-center justify-between">
                      <p className="text-base font-medium text-enzobay-brown">Order Total</p>
                      <p className="text-base font-medium text-enzobay-brown">{formatPrice(finalTotal)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon Code"
                        className="block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="rounded-md border border-enzobay-neutral-300 px-4 py-2 text-sm font-medium text-enzobay-brown hover:bg-enzobay-neutral-50"
                      >
                        Apply
                      </button>
                    </div>
                    {discountApplied && (
                      <p className="mt-2 text-sm text-green-600">Coupon applied successfully!</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full rounded-md border border-transparent bg-enzobay-orange py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-enzobay-orange-dark focus:outline-none focus:ring-2 focus:ring-enzobay-orange focus:ring-offset-2 focus:ring-offset-enzobay-neutral-50 flex items-center justify-center disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Proceed to Checkout'
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 text-sm text-enzobay-neutral-500 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-enzobay-neutral-400 mr-2" />
                    <p>Secure checkout powered by EnzoBay</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Helper icon component since we don't have this specific icon from lucide-react
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
