
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { Link, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu, 
  Home,
  ChevronDown,
  Search,
  Bell,
  PieChart,
  Tag,
  Image,
  LayoutGrid
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const AdminDashboard = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Simulated admin data that would come from an API/database
  const dashboardData = {
    totalUsers: 245,
    totalOrders: 128,
    totalRevenue: 458600,
    totalProducts: 86,
    recentOrders: [
      { id: 'ORD-1234', customer: 'John Doe', date: '2023-09-28', amount: 5600, status: 'completed' },
      { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-09-27', amount: 3200, status: 'processing' },
      { id: 'ORD-1236', customer: 'Alice Johnson', date: '2023-09-26', amount: 8750, status: 'completed' },
      { id: 'ORD-1237', customer: 'Bob Brown', date: '2023-09-25', amount: 1450, status: 'pending' },
      { id: 'ORD-1238', customer: 'Eve Wilson', date: '2023-09-24', amount: 2800, status: 'completed' },
    ],
    topProducts: [
      { id: 'PRD-001', name: 'Wireless Earbuds', sales: 42, revenue: 58800 },
      { id: 'PRD-002', name: 'Smart Watch', sales: 36, revenue: 86400 },
      { id: 'PRD-003', name: 'Bluetooth Speaker', sales: 28, revenue: 42000 },
      { id: 'PRD-004', name: 'Phone Charger', sales: 23, revenue: 13800 },
    ],
    notifications: [
      { id: 1, type: 'order', message: 'New order #ORD-1239 received', time: '10 minutes ago' },
      { id: 2, type: 'user', message: 'New user registered: Emily Davis', time: '1 hour ago' },
      { id: 3, type: 'stock', message: 'Product "Wireless Earbuds" low in stock', time: '3 hours ago' },
      { id: 4, type: 'system', message: 'System maintenance scheduled for tonight', time: '5 hours ago' },
    ]
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const handleLogout = () => {
    // This would integrate with your authentication system
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };
  
  // These functions would be connected to actual API endpoints later
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search",
      description: "Search functionality will be connected to the database.",
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderDashboardContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-medium text-sm text-enzobay-neutral-600 mb-1">Total Users</h2>
              <p className="text-2xl font-bold text-enzobay-blue">{dashboardData.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-medium text-sm text-enzobay-neutral-600 mb-1">Total Orders</h2>
              <p className="text-2xl font-bold text-enzobay-green">{dashboardData.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="font-medium text-sm text-enzobay-neutral-600 mb-1">Total Revenue</h2>
              <p className="text-2xl font-bold text-enzobay-orange">
                {formatCurrency(dashboardData.totalRevenue)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="font-medium text-sm text-enzobay-neutral-600 mb-1">Total Products</h2>
              <p className="text-2xl font-bold text-enzobay-neutral-700">{dashboardData.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-enzobay-blue hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-enzobay-neutral-200">
              <thead>
                <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-enzobay-neutral-200">
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-enzobay-neutral-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {order.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Top Products</h2>
            <Link to="/admin/products" className="text-sm text-enzobay-blue hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardData.topProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium text-enzobay-neutral-800">{product.name}</h3>
                  <p className="text-sm text-enzobay-neutral-600">{product.sales} units sold</p>
                </div>
                <p className="font-semibold text-enzobay-green">
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            ))}
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
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="font-medium text-enzobay-brown mb-2">Database</h3>
            <p className="text-green-600 flex items-center">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
              Connected
            </p>
          </div>
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="font-medium text-enzobay-brown mb-2">API Services</h3>
            <p className="text-green-600 flex items-center">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
              Operational
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
  const renderProductsContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg text-enzobay-brown">Products Management</h2>
        <button className="bg-enzobay-blue text-white px-3 py-1.5 rounded-md text-sm flex items-center">
          <ChevronRight className="h-4 w-4 mr-1" /> Add Product
        </button>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <button className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm">
            All Products (86)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Active (72)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Draft (14)
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search products" 
            className="border rounded-md px-3 py-1.5 text-sm"
          />
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Kitchen</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-enzobay-neutral-200">
          <thead>
            <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
              <th className="px-4 py-3">
                <input type="checkbox" className="rounded border-enzobay-neutral-300" />
              </th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enzobay-neutral-200">
            {[
              { id: 1, name: 'Wireless Earbuds', image: 'https://via.placeholder.com/40', sku: 'PRD-001', price: 1400, stock: 25, category: 'Electronics', status: 'active' },
              { id: 2, name: 'Smart Watch', image: 'https://via.placeholder.com/40', sku: 'PRD-002', price: 2400, stock: 18, category: 'Electronics', status: 'active' },
              { id: 3, name: 'Bluetooth Speaker', image: 'https://via.placeholder.com/40', sku: 'PRD-003', price: 1500, stock: 12, category: 'Electronics', status: 'active' },
              { id: 4, name: 'Cotton T-Shirt', image: 'https://via.placeholder.com/40', sku: 'PRD-004', price: 600, stock: 45, category: 'Clothing', status: 'active' },
              { id: 5, name: 'Denim Jeans', image: 'https://via.placeholder.com/40', sku: 'PRD-005', price: 1200, stock: 30, category: 'Clothing', status: 'draft' },
            ].map((product) => (
              <tr key={product.id} className="hover:bg-enzobay-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-enzobay-neutral-300" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover mr-3"
                    />
                    <span className="font-medium text-enzobay-neutral-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {product.sku}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {product.stock}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {product.category}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-enzobay-neutral-100 text-enzobay-neutral-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  <div className="flex space-x-2">
                    <button className="text-enzobay-blue hover:text-enzobay-blue-dark">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-enzobay-neutral-600">
          Showing 1 to 5 of 86 entries
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded border text-sm">Previous</button>
          <button className="px-3 py-1 rounded border bg-enzobay-blue text-white text-sm">1</button>
          <button className="px-3 py-1 rounded border text-sm">2</button>
          <button className="px-3 py-1 rounded border text-sm">3</button>
          <button className="px-3 py-1 rounded border text-sm">Next</button>
        </div>
      </div>
    </div>
  );
  
  const renderOrdersContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg text-enzobay-brown">Orders Management</h2>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm">
            Export CSV
          </button>
          <button className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm">
            Print
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <button className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm">
            All Orders (128)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Completed (85)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Processing (32)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Pending (11)
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search orders" 
            className="border rounded-md px-3 py-1.5 text-sm"
          />
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Today</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-enzobay-neutral-200">
          <thead>
            <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enzobay-neutral-200">
            {[
              { id: 'ORD-1234', customer: 'John Doe', email: 'john@example.com', date: '2023-09-28', items: 3, total: 5600, payment: 'M-Pesa', status: 'completed' },
              { id: 'ORD-1235', customer: 'Jane Smith', email: 'jane@example.com', date: '2023-09-27', items: 2, total: 3200, payment: 'Card', status: 'processing' },
              { id: 'ORD-1236', customer: 'Alice Johnson', email: 'alice@example.com', date: '2023-09-26', items: 5, total: 8750, payment: 'M-Pesa', status: 'completed' },
              { id: 'ORD-1237', customer: 'Bob Brown', email: 'bob@example.com', date: '2023-09-25', items: 1, total: 1450, payment: 'Card', status: 'pending' },
              { id: 'ORD-1238', customer: 'Eve Wilson', email: 'eve@example.com', date: '2023-09-24', items: 2, total: 2800, payment: 'M-Pesa', status: 'completed' },
            ].map((order) => (
              <tr key={order.id} className="hover:bg-enzobay-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                  {order.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-enzobay-neutral-900">{order.customer}</div>
                    <div className="text-xs text-enzobay-neutral-500">{order.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {order.date}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {order.items}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {order.payment}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  <div className="flex space-x-2">
                    <button className="text-enzobay-blue hover:text-enzobay-blue-dark">
                      View
                    </button>
                    <button className="text-enzobay-neutral-600 hover:text-enzobay-neutral-800">
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-enzobay-neutral-600">
          Showing 1 to 5 of 128 entries
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded border text-sm">Previous</button>
          <button className="px-3 py-1 rounded border bg-enzobay-blue text-white text-sm">1</button>
          <button className="px-3 py-1 rounded border text-sm">2</button>
          <button className="px-3 py-1 rounded border text-sm">3</button>
          <button className="px-3 py-1 rounded border text-sm">Next</button>
        </div>
      </div>
    </div>
  );
  
  const renderCustomersContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg text-enzobay-brown">Customers Management</h2>
        <button className="bg-enzobay-blue text-white px-3 py-1.5 rounded-md text-sm flex items-center">
          <ChevronRight className="h-4 w-4 mr-1" /> Add Customer
        </button>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <button className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm">
            All Customers (245)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            Active (220)
          </button>
          <button className="text-enzobay-neutral-600 px-3 py-1.5 rounded-md text-sm">
            New (25)
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search customers" 
            className="border rounded-md px-3 py-1.5 text-sm"
          />
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>All Locations</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-enzobay-neutral-200">
          <thead>
            <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
              <th className="px-4 py-3">
                <input type="checkbox" className="rounded border-enzobay-neutral-300" />
              </th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Spent</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-enzobay-neutral-200">
            {[
              { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254 712 345 678', orders: 8, spent: 32600, location: 'Nairobi' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+254 723 456 789', orders: 5, spent: 18400, location: 'Mombasa' },
              { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+254 734 567 890', orders: 12, spent: 45800, location: 'Nairobi' },
              { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '+254 745 678 901', orders: 3, spent: 8900, location: 'Kisumu' },
              { id: 5, name: 'Eve Wilson', email: 'eve@example.com', phone: '+254 756 789 012', orders: 7, spent: 24500, location: 'Nairobi' },
            ].map((customer) => (
              <tr key={customer.id} className="hover:bg-enzobay-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-enzobay-neutral-300" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-enzobay-blue-100 flex items-center justify-center">
                      <span className="font-medium text-enzobay-blue">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-enzobay-neutral-900">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {customer.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {customer.phone}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {customer.orders}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-enzobay-neutral-900">
                  {formatCurrency(customer.spent)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  {customer.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-enzobay-neutral-700">
                  <div className="flex space-x-2">
                    <button className="text-enzobay-blue hover:text-enzobay-blue-dark">
                      View
                    </button>
                    <button className="text-enzobay-neutral-600 hover:text-enzobay-neutral-800">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-enzobay-neutral-600">
          Showing 1 to 5 of 245 entries
        </p>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded border text-sm">Previous</button>
          <button className="px-3 py-1 rounded border bg-enzobay-blue text-white text-sm">1</button>
          <button className="px-3 py-1 rounded border text-sm">2</button>
          <button className="px-3 py-1 rounded border text-sm">3</button>
          <button className="px-3 py-1 rounded border text-sm">Next</button>
        </div>
      </div>
    </div>
  );
  
  const renderReportsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-lg text-enzobay-brown">Sales Overview</h2>
          <select className="border rounded-md px-3 py-1.5 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>This year</option>
          </select>
        </div>
        
        <div className="h-64 bg-enzobay-neutral-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-10 w-10 text-enzobay-neutral-400 mx-auto mb-2" />
            <p className="text-enzobay-neutral-600">Sales chart will be integrated with the database</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-enzobay-neutral-600 mb-1">Total Sales</h3>
            <p className="text-xl font-bold text-enzobay-blue">{formatCurrency(458600)}</p>
          </div>
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-enzobay-neutral-600 mb-1">Orders</h3>
            <p className="text-xl font-bold text-enzobay-green">128</p>
          </div>
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-enzobay-neutral-600 mb-1">Average Order</h3>
            <p className="text-xl font-bold text-enzobay-orange">{formatCurrency(3583)}</p>
          </div>
          <div className="bg-enzobay-neutral-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-enzobay-neutral-600 mb-1">Conversion Rate</h3>
            <p className="text-xl font-bold text-enzobay-neutral-700">3.2%</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Top Categories</h2>
            <button className="text-sm text-enzobay-blue hover:underline">
              Download Report
            </button>
          </div>
          
          <div className="h-64 bg-enzobay-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-10 w-10 text-enzobay-neutral-400 mx-auto mb-2" />
              <p className="text-enzobay-neutral-600">Category chart will be integrated with the database</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Electronics</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">42%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Clothing</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Home & Kitchen</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">16%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Beauty & Personal Care</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Others</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">6%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-lg text-enzobay-brown">Payment Methods</h2>
            <button className="text-sm text-enzobay-blue hover:underline">
              Download Report
            </button>
          </div>
          
          <div className="h-64 bg-enzobay-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-10 w-10 text-enzobay-neutral-400 mx-auto mb-2" />
              <p className="text-enzobay-neutral-600">Payment methods chart will be integrated with the database</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">M-Pesa</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Credit/Debit Card</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Bank Transfer</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-enzobay-neutral-700">Others</span>
              <span className="text-sm font-medium text-enzobay-neutral-900">2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderBannersContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium text-lg text-enzobay-brown">Banner Management</h2>
        <Link to="/admin/banners" className="bg-enzobay-blue text-white px-3 py-1.5 rounded-md text-sm flex items-center">
          Manage Banners <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-enzobay-neutral-700 mb-3">Active Banners</h3>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Summer Sale', position: 'home_top', status: 'active' },
              { id: 2, title: 'New Arrivals', position: 'category_top', status: 'active' },
              { id: 3, title: 'Free Shipping', position: 'site_wide', status: 'active' },
            ].map((banner) => (
              <div key={banner.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-enzobay-neutral-800">{banner.title}</h4>
                  <p className="text-xs text-enzobay-neutral-600">{banner.position.replace(/_/g, ' ')}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-enzobay-neutral-700 hover:text-enzobay-neutral-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Deactivate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-enzobay-neutral-700 mb-3">Banner Preview</h3>
          <div className="border rounded-lg p-4 h-48 bg-enzobay-neutral-50 flex items-center justify-center">
            <div className="text-center">
              <Image className="h-10 w-10 text-enzobay-neutral-400 mx-auto mb-2" />
              <p className="text-enzobay-neutral-600">Select a banner to preview</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-enzobay-blue text-white px-3 py-1.5 rounded-md text-sm w-full">
              Create New Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSettingsContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Store Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                Store Name
              </label>
              <input 
                type="text" 
                value="EnzoBay Store" 
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                Store Email
              </label>
              <input 
                type="email" 
                value="contact@enzobay.com" 
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                Store Phone
              </label>
              <input 
                type="text" 
                value="+254 712 345 678" 
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                Store Address
              </label>
              <textarea 
                rows={3}
                value="123 Moi Avenue, Nairobi, Kenya"
                className="w-full border rounded-md px-3 py-2"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                Currency
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>KES (Ksh)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            
            <div className="pt-4">
              <button className="bg-enzobay-blue text-white px-4 py-2 rounded-md">
                Save Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Payment Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-green-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-enzobay-neutral-800">M-Pesa</h3>
                  <p className="text-xs text-enzobay-neutral-600">Payment via M-Pesa mobile money</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-enzobay-neutral-800">Credit/Debit Card</h3>
                  <p className="text-xs text-enzobay-neutral-600">Payment via credit or debit card</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">B</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-enzobay-neutral-800">Bank Transfer</h3>
                  <p className="text-xs text-enzobay-neutral-600">Direct payment via bank transfer</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="pt-4">
              <button className="bg-enzobay-blue text-white px-4 py-2 rounded-md">
                Save Payment Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Shipping Settings</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="text-sm font-medium text-enzobay-neutral-800">Free Shipping</h3>
                <p className="text-xs text-enzobay-neutral-600">For orders over Ksh 10,000</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="text-sm font-medium text-enzobay-neutral-800">Standard Shipping</h3>
                <p className="text-xs text-enzobay-neutral-600">Ksh 500 flat rate</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="text-sm font-medium text-enzobay-neutral-800">Express Shipping</h3>
                <p className="text-xs text-enzobay-neutral-600">Ksh 1,200 flat rate</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-enzobay-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-enzobay-blue"></div>
              </label>
            </div>
            
            <div className="pt-3">
              <button className="bg-enzobay-blue text-white px-4 py-2 rounded-md w-full">
                Save Shipping Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="font-medium text-lg text-enzobay-brown mb-4">Tax Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                VAT/Tax Rate (%)
              </label>
              <input 
                type="number" 
                value="16" 
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="taxIncluded"
                type="checkbox"
                checked
                className="h-4 w-4 rounded border-gray-300 text-enzobay-blue focus:ring-enzobay-blue"
              />
              <label htmlFor="taxIncluded" className="ml-2 text-sm text-gray-700">
                Price includes tax
              </label>
            </div>
            
            <div className="pt-2">
              <button className="bg-enzobay-blue text-white px-4 py-2 rounded-md w-full">
                Save Tax Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboardContent();
      case 'products':
        return renderProductsContent();
      case 'orders':
        return renderOrdersContent();
      case 'customers':
        return renderCustomersContent();
      case 'reports':
        return renderReportsContent();
      case 'banners':
        return renderBannersContent();
      case 'settings':
        return renderSettingsContent();
      default:
        return renderDashboardContent();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-enzobay-neutral-200 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } shadow-md z-10 fixed h-full pt-16`}>
          <div className="p-4 flex justify-between items-center border-b border-enzobay-neutral-100">
            <div className={`${collapsed ? 'hidden' : 'block'}`}>
              <h2 className="text-lg font-bold text-enzobay-brown">Admin Panel</h2>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-md text-enzobay-neutral-500 hover:bg-enzobay-neutral-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="mt-4 px-2">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`flex items-center ${
                    activeSection === 'dashboard' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <Home className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('products')}
                  className={`flex items-center ${
                    activeSection === 'products' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <Package className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('orders')}
                  className={`flex items-center ${
                    activeSection === 'orders' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Orders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('customers')}
                  className={`flex items-center ${
                    activeSection === 'customers' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <Users className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Customers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('banners')}
                  className={`flex items-center ${
                    activeSection === 'banners' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <LayoutGrid className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Banners</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('reports')}
                  className={`flex items-center ${
                    activeSection === 'reports' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <BarChart3 className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Reports</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`flex items-center ${
                    activeSection === 'settings' 
                      ? 'bg-enzobay-blue-50 text-enzobay-blue' 
                      : 'text-enzobay-neutral-700 hover:bg-enzobay-neutral-100'
                  } rounded-md w-full px-3 py-2`}
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t border-enzobay-neutral-100">
            <button
              onClick={handleLogout}
              className="flex items-center text-enzobay-neutral-700 hover:bg-enzobay-neutral-100 rounded-md w-full px-3 py-2"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="bg-white border-b border-enzobay-neutral-200 py-3 px-6 flex justify-between items-center sticky top-16 z-10">
            <h1 className="text-xl font-semibold text-enzobay-brown">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-1.5 rounded-md border border-enzobay-neutral-200 text-sm w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
              </form>
              
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1.5 bg-enzobay-neutral-100 rounded-full relative"
                >
                  <Bell className="h-5 w-5 text-enzobay-neutral-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-enzobay-neutral-200">
                    <div className="px-4 py-2 border-b border-enzobay-neutral-100">
                      <h3 className="font-medium text-enzobay-neutral-800">Notifications</h3>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {dashboardData.notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-2 hover:bg-enzobay-neutral-50">
                          <p className="text-sm text-enzobay-neutral-800">{notification.message}</p>
                          <p className="text-xs text-enzobay-neutral-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-enzobay-neutral-100 text-center">
                      <button className="text-sm text-enzobay-blue hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-enzobay-blue flex items-center justify-center text-white">
                    A
                  </div>
                  <span className="hidden md:block ml-2 font-medium text-enzobay-neutral-800">Admin</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-enzobay-neutral-500" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-enzobay-neutral-200">
                    <a href="#" className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-50">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-50">
                      Settings
                    </a>
                    <div className="border-t border-enzobay-neutral-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-enzobay-neutral-700 hover:bg-enzobay-neutral-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {renderSectionContent()}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
