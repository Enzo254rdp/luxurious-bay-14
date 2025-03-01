
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useScrollToTop } from "../hooks/use-scroll";

const OrderTrackingPage = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [trackingId, setTrackingId] = useState(orderNumber || "");
  const [orderStatus, setOrderStatus] = useState<null | {
    status: string;
    date: string;
    items: number;
    total: string;
    address: string;
    stages: { name: string; completed: boolean; date: string }[];
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      setError("Please enter a valid tracking ID");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      // Mock data for demonstration
      if (trackingId === "ABC123" || trackingId === "123456") {
        setOrderStatus({
          status: "In Transit",
          date: "March 1, 2025",
          items: 3,
          total: "Ksh 12,500",
          address: "123 Mombasa Road, Nairobi, Kenya",
          stages: [
            { name: "Order Placed", completed: true, date: "March 1, 2025" },
            { name: "Processing", completed: true, date: "March 2, 2025" },
            { name: "In Transit", completed: true, date: "March 3, 2025" },
            { name: "Out for Delivery", completed: false, date: "" },
            { name: "Delivered", completed: false, date: "" }
          ]
        });
      } else {
        setError("No order found with this tracking ID. Please check and try again.");
        setOrderStatus(null);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-8 text-center">
          Track Your Order
        </h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleTrackOrder} className="mb-8">
            <div className="mb-4">
              <label htmlFor="tracking-id" className="block text-enzobay-neutral-700 mb-2">
                Order/Tracking Number
              </label>
              <input
                type="text"
                id="tracking-id"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your order or tracking number"
                className="w-full border border-enzobay-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
              />
            </div>
            
            {error && (
              <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-enzobay-blue hover:bg-enzobay-blue-dark text-white font-medium rounded-md px-4 py-3 transition-colors duration-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Track Order"
              )}
            </button>
          </form>
          
          {orderStatus && (
            <div className="border-t border-enzobay-neutral-200 pt-6">
              <div className="flex justify-between items-start mb-6 flex-wrap">
                <div>
                  <h2 className="font-semibold text-lg text-enzobay-brown">Order Status: <span className="text-enzobay-blue">{orderStatus.status}</span></h2>
                  <p className="text-enzobay-neutral-600">Order Date: {orderStatus.date}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-enzobay-neutral-600">Items: {orderStatus.items}</p>
                  <p className="text-enzobay-neutral-600">Total: {orderStatus.total}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-enzobay-neutral-800 mb-2">Shipping Address:</h3>
                <p className="text-enzobay-neutral-600">{orderStatus.address}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-enzobay-neutral-800 mb-4">Tracking Timeline:</h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-0 left-3 bottom-0 w-0.5 bg-enzobay-neutral-200"></div>
                  
                  {/* Timeline stages */}
                  <div className="space-y-6">
                    {orderStatus.stages.map((stage, index) => (
                      <div key={index} className="relative pl-10">
                        {/* Stage indicator */}
                        <div className={`absolute left-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          stage.completed ? "bg-enzobay-green-light border-2 border-enzobay-green" : "bg-white border-2 border-enzobay-neutral-300"
                        }`}>
                          {stage.completed && (
                            <svg className="h-3 w-3 text-enzobay-green" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Stage content */}
                        <div>
                          <h4 className={`font-medium ${stage.completed ? "text-enzobay-brown" : "text-enzobay-neutral-500"}`}>
                            {stage.name}
                          </h4>
                          {stage.date && (
                            <p className="text-sm text-enzobay-neutral-500">{stage.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-enzobay-neutral-600 mb-4">
                  Need help with your order?
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-800 px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
          
          {!orderStatus && !isLoading && (
            <div className="text-center py-6 text-enzobay-neutral-600">
              <p>Enter your order number or tracking ID to view its current status.</p>
              <p className="mt-2 text-sm">
                Need help? <a href="/contact" className="text-enzobay-blue hover:underline">Contact our support team</a>
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;
