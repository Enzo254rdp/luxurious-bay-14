
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";

const SellerDashboard = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-8">
          Seller Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Products</h2>
            <p className="text-3xl font-bold text-enzobay-blue">12</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Orders</h2>
            <p className="text-3xl font-bold text-enzobay-green">8</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Revenue</h2>
            <p className="text-3xl font-bold text-enzobay-orange">Ksh 45,600</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Recent Orders</h2>
          <p className="text-enzobay-neutral-600 text-center py-8">
            Complete seller dashboard functionality coming soon.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Manage Products</h2>
          <p className="text-enzobay-neutral-600 text-center py-8">
            Product management functionality coming soon.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
