
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, ArrowLeft, Truck, Package, CheckCircle, AlertTriangle, MapPin } from "lucide-react";
import { formatPrice } from "../lib/utils";

// Mock order data - in a real app, this would come from your API
const mockOrders = [
  {
    id: "order-1",
    date: "May 15, 2024",
    status: "Delivered",
    total: 24500,
    items: [
      {
        id: "product-1",
        name: "Modern Wooden Dining Table",
        price: 15000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      },
      {
        id: "product-2",
        name: "Ergonomic Office Chair",
        price: 8500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: "product-3",
        name: "Decorative Plant Pot",
        price: 1000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598880940639-7b381d79f3ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      }
    ],
    shipping: {
      address: "123 Main St, Apt 4B, Nairobi, 00100",
      method: "Standard Delivery",
      cost: 0,
      estimatedDelivery: "May 20 - May 25, 2024",
      trackingNumber: "KE12345678",
      timeline: [
        { date: "May 15, 2024", status: "Order Placed", completed: true, description: "Your order has been placed and is being prepared for processing.", icon: Package },
        { date: "May 16, 2024", status: "Processing", completed: true, description: "Your order is being processed and items are being picked from our warehouse.", icon: Package },
        { date: "May 17, 2024", status: "Shipped", completed: true, description: "Your order has been shipped and is on its way to you.", icon: Truck },
        { date: "May 19, 2024", status: "Out for Delivery", completed: true, description: "Your order is out for delivery and will be delivered today.", icon: Truck },
        { date: "May 19, 2024", status: "Delivered", completed: true, description: "Your order has been delivered. Thank you for shopping with EnzoBay!", icon: CheckCircle }
      ],
      currentLocation: "Delivered to your address",
      updates: [
        { date: "May 19, 2024 - 16:25", text: "Package delivered to recipient's address" },
        { date: "May 19, 2024 - 09:30", text: "Package out for delivery" },
        { date: "May 18, 2024 - 18:45", text: "Package arrived at local courier facility" },
        { date: "May 17, 2024 - 14:20", text: "Package departed from regional shipping facility" },
        { date: "May 17, 2024 - 08:15", text: "Package processed at regional shipping facility" },
        { date: "May 16, 2024 - 15:30", text: "Shipping label created" }
      ]
    }
  },
  {
    id: "order-2",
    date: "April 30, 2024",
    status: "Processing",
    total: 15000,
    items: [
      {
        id: "product-4",
        name: "Modern Coffee Table",
        price: 15000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      }
    ],
    shipping: {
      address: "123 Main St, Apt 4B, Nairobi, 00100",
      method: "Express Delivery",
      cost: 800,
      estimatedDelivery: "May 2 - May 4, 2024",
      trackingNumber: "KE87654321",
      timeline: [
        { date: "April 30, 2024", status: "Order Placed", completed: true, description: "Your order has been placed and is being prepared for processing.", icon: Package },
        { date: "May 1, 2024", status: "Processing", completed: true, description: "Your order is being processed and items are being picked from our warehouse.", icon: Package },
        { date: "May 2, 2024", status: "Shipped", completed: false, description: "Your order will be shipped soon.", icon: Truck },
        { date: "May 3, 2024", status: "Out for Delivery", completed: false, description: "Your order will be out for delivery soon.", icon: Truck },
        { date: "May 4, 2024", status: "Delivered", completed: false, description: "Your order will be delivered soon.", icon: CheckCircle }
      ],
      currentLocation: "EnzoBay Warehouse, Nairobi",
      updates: [
        { date: "May 1, 2024 - 14:30", text: "Order processing started" },
        { date: "April 30, 2024 - 16:45", text: "Order received" }
      ]
    }
  }
];

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call to fetch order details
    setLoading(true);
    setTimeout(() => {
      const foundOrder = mockOrders.find(o => o.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
        <Navbar />
        <main className="flex-grow py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-6 bg-enzobay-neutral-200 rounded w-1/3 mb-8"></div>
              <div className="h-64 bg-white rounded-lg shadow-sm mb-8"></div>
              <div className="h-96 bg-white rounded-lg shadow-sm"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
        <Navbar />
        <main className="flex-grow py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-lg p-8 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
              <h2 className="mt-4 text-lg font-medium text-enzobay-brown">Order not found</h2>
              <p className="mt-2 text-enzobay-neutral-500">
                We couldn't find the order you're looking for.
              </p>
              <div className="mt-6">
                <Link
                  to="/orders"
                  className="inline-flex items-center rounded-md bg-enzobay-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Orders
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-enzobay-neutral-500">
              <li>
                <Link to="/" className="hover:text-enzobay-blue">Home</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li>
                <Link to="/account" className="hover:text-enzobay-blue">Account</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li>
                <Link to="/orders" className="hover:text-enzobay-blue">Orders</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li>
                <Link to={`/orders/${order.id}`} className="hover:text-enzobay-blue">{order.id}</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li className="text-enzobay-neutral-800 font-medium">Tracking</li>
            </ol>
          </nav>
          
          <div className="mb-6">
            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark text-sm font-medium"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Order Details
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
              Track Your Order
            </h1>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-sm text-enzobay-neutral-500">
                Tracking Number: <span className="font-semibold">{order.shipping.trackingNumber}</span>
              </p>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-enzobay-neutral-300"></div>
              <p className="text-sm text-enzobay-neutral-500">
                Order Total: <span className="font-semibold">{formatPrice(order.total)}</span>
              </p>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-enzobay-neutral-300"></div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main tracking information */}
            <div className="lg:col-span-2">
              {/* Status Timeline */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-6">Delivery Progress</h2>
                  
                  <div className="relative">
                    {order.shipping.timeline.map((step: any, idx: number) => (
                      <div key={idx} className={`flex items-start mb-8 ${idx === order.shipping.timeline.length - 1 ? '' : 'pb-8'}`}>
                        <div className="relative flex-shrink-0">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                            step.completed ? 'bg-green-100' : 'bg-enzobay-neutral-100'
                          }`}>
                            {React.createElement(step.icon, {
                              className: `h-6 w-6 ${step.completed ? 'text-green-600' : 'text-enzobay-neutral-400'}`
                            })}
                          </div>
                          {idx !== order.shipping.timeline.length - 1 && (
                            <div className={`absolute top-12 left-6 -ml-px h-full w-0.5 ${
                              step.completed && order.shipping.timeline[idx + 1].completed 
                                ? 'bg-green-500' : 'bg-enzobay-neutral-200'
                            }`}></div>
                          )}
                        </div>
                        <div className="ml-6">
                          <h3 className={`text-base font-semibold ${step.completed ? 'text-green-600' : 'text-enzobay-neutral-500'}`}>
                            {step.status}
                          </h3>
                          <p className="mt-1 text-sm text-enzobay-neutral-600">{step.description}</p>
                          <p className="mt-1 text-sm text-enzobay-neutral-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Detailed Tracking Updates */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Tracking Updates</h2>
                  
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {order.shipping.updates.map((update: any, idx: number) => (
                        <li key={idx}>
                          <div className="relative pb-8">
                            {idx !== order.shipping.updates.length - 1 ? (
                              <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-enzobay-neutral-200" aria-hidden="true"></span>
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                              <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-enzobay-blue-light flex items-center justify-center ring-4 ring-white">
                                  <MapPin className="h-5 w-5 text-enzobay-blue" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div>
                                  <div className="text-sm text-enzobay-neutral-500">{update.date}</div>
                                </div>
                                <div className="mt-1 text-sm text-enzobay-neutral-700">
                                  <p>{update.text}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order and Delivery Information */}
            <div className="lg:col-span-1">
              {/* Current Status */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Current Status</h2>
                  
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                      order.status === 'Delivered' ? 'bg-green-100' : 
                      order.status === 'Processing' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {order.status === 'Delivered' ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : order.status === 'Processing' ? (
                        <Package className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Truck className="h-6 w-6 text-yellow-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-enzobay-neutral-900">{order.status}</h3>
                      <p className="text-sm text-enzobay-neutral-500">
                        {order.shipping.currentLocation}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-enzobay-neutral-50 rounded-md p-4">
                    <h3 className="text-sm font-medium text-enzobay-neutral-900">Estimated Delivery</h3>
                    <p className="mt-1 text-base font-medium text-enzobay-brown">
                      {order.shipping.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-enzobay-neutral-900">Order Number</h3>
                      <p className="mt-1 text-sm text-enzobay-neutral-500">{order.id}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-enzobay-neutral-900">Order Date</h3>
                      <p className="mt-1 text-sm text-enzobay-neutral-500">{order.date}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-enzobay-neutral-900">Items</h3>
                      <p className="mt-1 text-sm text-enzobay-neutral-500">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-enzobay-neutral-900">Total</h3>
                      <p className="mt-1 text-sm text-enzobay-neutral-500">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Delivery Address */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Delivery Address</h2>
                  
                  <p className="text-sm text-enzobay-neutral-700">
                    {order.shipping.address}
                  </p>
                  
                  <div className="mt-6">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark"
                    >
                      View Order Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
