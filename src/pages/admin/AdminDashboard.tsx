
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-8">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-enzobay-blue">245</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Total Orders</h2>
            <p className="text-3xl font-bold text-enzobay-green">128</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold text-enzobay-orange">Ksh 458,600</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-2">Total Products</h2>
            <p className="text-3xl font-bold text-enzobay-neutral-700">86</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
            <h2 className="font-medium text-lg text-enzobay-brown mb-4">Recent Activity</h2>
            <p className="text-enzobay-neutral-600 text-center py-8">
              Activity dashboard coming soon.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-medium text-lg text-enzobay-brown mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link 
                to="/admin/banners"
                className="block w-full text-left px-4 py-2 rounded-md bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700"
              >
                Manage Banners
              </Link>
              <button 
                className="block w-full text-left px-4 py-2 rounded-md bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700"
              >
                Manage Products
              </button>
              <button 
                className="block w-full text-left px-4 py-2 rounded-md bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700"
              >
                Manage Categories
              </button>
              <button 
                className="block w-full text-left px-4 py-2 rounded-md bg-enzobay-neutral-100 hover:bg-enzobay-neutral-200 text-enzobay-neutral-700"
              >
                Manage Users
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-enzobay-neutral-50 p-4 rounded-md">
              <h3 className="font-medium text-enzobay-brown mb-2">Server Status</h3>
              <p className="text-green-600 flex items-center">
                <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                Online
              </p>
            </div>
            <div className="bg-enzobay-neutral-50 p-4 rounded-md">
              <h3 className="font-medium text-enzobay-brown mb-2">Payment Gateway</h3>
              <p className="text-green-600 flex items-center">
                <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                Operational
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
