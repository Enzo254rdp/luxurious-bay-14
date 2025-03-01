
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatPrice } from "../lib/utils";
import { ChevronRight, Package, ArrowLeft, Truck, CheckCircle, AlertTriangle } from "lucide-react";

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
        { date: "May 15, 2024", status: "Order Placed", completed: true },
        { date: "May 16, 2024", status: "Processing", completed: true },
        { date: "May 17, 2024", status: "Shipped", completed: true },
        { date: "May 19, 2024", status: "Out for Delivery", completed: true },
        { date: "May 19, 2024", status: "Delivered", completed: true }
      ]
    },
    payment: {
      method: "M-Pesa",
      reference: "QWE123456",
      subtotal: 24500,
      shipping: 0,
      tax: 3920,
      total: 28420
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
        { date: "April 30, 2024", status: "Order Placed", completed: true },
        { date: "May 1, 2024", status: "Processing", completed: true },
        { date: "May 2, 2024", status: "Shipped", completed: false },
        { date: "May 3, 2024", status: "Out for Delivery", completed: false },
        { date: "May 4, 2024", status: "Delivered", completed: false }
      ]
    },
    payment: {
      method: "Credit Card",
      reference: "ASD789012",
      subtotal: 15000,
      shipping: 800,
      tax: 2528,
      total: 18328
    }
  },
  {
    id: "order-3",
    date: "March 22, 2024",
    status: "Cancelled",
    total: 8500,
    items: [
      {
        id: "product-5",
        name: "Stylish Reading Lamp",
        price: 3500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1583305789889-44891eece139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: "product-6",
        name: "Decorative Wall Mirror",
        price: 5000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      }
    ],
    shipping: {
      address: "123 Main St, Apt 4B, Nairobi, 00100",
      method: "Standard Delivery",
      cost: 500,
      estimatedDelivery: "March 27 - April 1, 2024",
      trackingNumber: null,
      timeline: [
        { date: "March 22, 2024", status: "Order Placed", completed: true },
        { date: "March 23, 2024", status: "Cancelled", completed: true }
      ]
    },
    payment: {
      method: "M-Pesa",
      reference: "ZXC456789",
      subtotal: 8500,
      shipping: 500,
      tax: 1440,
      total: 10440,
      refunded: true
    }
  }
];

// Order Detail View
export function OrderDetail() {
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
              <li className="text-enzobay-neutral-800 font-medium">{order.id}</li>
            </ol>
          </nav>
          
          <div className="mb-6">
            <Link
              to="/orders"
              className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark text-sm font-medium"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Orders
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl">
              Order Details
            </h1>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-sm text-enzobay-neutral-500">
                Placed on <time dateTime={order.date}>{order.date}</time>
              </p>
              <div className="hidden sm:block h-1 w-1 rounded-full bg-enzobay-neutral-300"></div>
              <p className="text-sm text-enzobay-neutral-500">
                Order {order.id}
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
          
          {/* Order Tracking */}
          {order.shipping.trackingNumber && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-enzobay-brown mb-2">Delivery Status</h2>
                
                <div className="mt-6">
                  {order.status !== 'Cancelled' && (
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-enzobay-neutral-200"></div>
                      </div>
                      <div className="relative flex justify-between">
                        {order.shipping.timeline.map((event: any, idx: number) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                              event.completed 
                                ? 'bg-green-500' 
                                : 'border-2 border-enzobay-neutral-200 bg-white'
                            }`}>
                              {event.completed && <CheckCircle className="h-5 w-5 text-white" />}
                            </div>
                            <div className="mt-2 text-center">
                              <div className="text-xs text-enzobay-neutral-500">{event.date}</div>
                              <div className="mt-1 text-sm font-medium text-enzobay-neutral-900">{event.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {order.status === 'Cancelled' && (
                    <div className="flex flex-col items-center py-4">
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <p className="text-lg font-medium text-enzobay-neutral-900">Order Cancelled</p>
                      <p className="text-sm text-enzobay-neutral-500 mt-1">This order was cancelled on {order.shipping.timeline[1].date}</p>
                    </div>
                  )}
                </div>
                
                {order.shipping.trackingNumber && order.status !== 'Cancelled' && (
                  <div className="mt-6 bg-enzobay-neutral-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-enzobay-neutral-500 mr-2" />
                      <span className="text-sm font-medium text-enzobay-neutral-900">Tracking Number:</span>
                      <span className="ml-2 text-sm text-enzobay-neutral-700">{order.shipping.trackingNumber}</span>
                    </div>
                    <p className="mt-2 text-sm text-enzobay-neutral-500">
                      Estimated delivery: {order.shipping.estimatedDelivery}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Order Items and Summary */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Order Items</h2>
                  
                  <ul role="list" className="divide-y divide-enzobay-neutral-200">
                    {order.items.map((item: any) => (
                      <li key={item.id} className="flex py-6">
                        <div className="flex-shrink-0">
                          <div className="h-24 w-24 rounded-md border border-enzobay-neutral-200 bg-enzobay-neutral-50 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </div>
                        
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium text-enzobay-brown">
                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4 text-sm font-medium text-enzobay-neutral-900">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-1 items-end justify-between">
                            <p className="text-sm text-enzobay-neutral-500">Qty {item.quantity}</p>
                            
                            <div className="flex">
                              {order.status === 'Delivered' && (
                                <button
                                  type="button"
                                  className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark"
                                >
                                  Buy Again
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-enzobay-brown mb-4">Order Summary</h2>
                  
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-enzobay-neutral-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(order.payment.subtotal)}</dd>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-enzobay-neutral-600">Shipping</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">
                        {order.payment.shipping > 0 ? formatPrice(order.payment.shipping) : 'Free'}
                      </dd>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-enzobay-neutral-600">Tax</dt>
                      <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(order.payment.tax)}</dd>
                    </div>
                    
                    <div className="border-t border-enzobay-neutral-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-enzobay-neutral-900">Order total</dt>
                      <dd className="text-base font-medium text-enzobay-neutral-900">{formatPrice(order.payment.total)}</dd>
                    </div>
                    
                    {order.payment.refunded && (
                      <div className="border-t border-enzobay-neutral-200 pt-4 flex items-center justify-between text-red-500">
                        <dt className="text-sm font-medium">Refunded</dt>
                        <dd className="text-sm font-medium">-{formatPrice(order.payment.total)}</dd>
                      </div>
                    )}
                  </dl>
                  
                  <div className="mt-6 border-t border-enzobay-neutral-200 pt-4">
                    <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-2">Payment Information</h3>
                    <p className="text-sm text-enzobay-neutral-500">
                      <span className="font-medium text-enzobay-neutral-700">{order.payment.method}</span>
                      {order.payment.reference && <span> • {order.payment.reference}</span>}
                    </p>
                  </div>
                  
                  <div className="mt-6 border-t border-enzobay-neutral-200 pt-4">
                    <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-2">Shipping Information</h3>
                    <p className="text-sm text-enzobay-neutral-500">
                      <span className="font-medium text-enzobay-neutral-700">{order.shipping.method}</span>
                    </p>
                    <p className="mt-2 text-sm text-enzobay-neutral-500">
                      {order.shipping.address}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                    >
                      Need Help? Contact Us
                    </button>
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

// Orders List View
export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call to fetch orders
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);
  
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
              <li className="text-enzobay-neutral-800 font-medium">Orders</li>
            </ol>
          </nav>
          
          <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl mb-8">
            My Orders
          </h1>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white rounded-lg shadow-sm"></div>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="bg-enzobay-neutral-50 px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
                    <div>
                      <span className="text-sm text-enzobay-neutral-500">Order {order.id}</span>
                      <p className="text-sm font-medium text-enzobay-brown">{order.date}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                      
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex flex-wrap gap-3">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="w-12 h-12 bg-enzobay-neutral-100 rounded border border-enzobay-neutral-200 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm text-enzobay-neutral-500">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                        <p className="text-base font-medium text-enzobay-brown">{formatPrice(order.total)}</p>
                      </div>
                      
                      <div>
                        {order.shipping.trackingNumber && order.status !== 'Cancelled' && (
                          <div>
                            <p className="text-sm text-enzobay-neutral-500">Tracking Number</p>
                            <p className="text-sm font-medium text-enzobay-brown">{order.shipping.trackingNumber}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 items-center sm:justify-end">
                        {order.status === 'Delivered' && (
                          <button
                            type="button"
                            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-enzobay-neutral-700 shadow-sm ring-1 ring-inset ring-enzobay-neutral-300 hover:bg-enzobay-neutral-50"
                          >
                            Buy Again
                          </button>
                        )}
                        
                        {order.status !== 'Cancelled' && (
                          <Link
                            to={`/orders/${order.id}/track`}
                            className="rounded-md bg-enzobay-blue px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-enzobay-blue-dark"
                          >
                            Track Order
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-enzobay-neutral-100">
                <Package className="h-8 w-8 text-enzobay-neutral-400" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-enzobay-brown">No orders yet</h3>
              <p className="mt-2 text-enzobay-neutral-500">
                When you place your first order, it will appear here.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-md bg-enzobay-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
