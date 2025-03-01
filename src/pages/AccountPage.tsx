
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, CreditCard, LogOut, Settings, Heart } from "lucide-react";

// Mock user data - in a real app, this would come from your auth system
const mockUser = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+254 712 345 678",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  address: {
    street: "123 Main St",
    apartment: "Apt 4B",
    city: "Nairobi",
    region: "Nairobi",
    postalCode: "00100",
  },
  memberSince: "January 2023",
};

// Mock orders data - in a real app, this would come from your API
const mockOrders = [
  {
    id: "order-1",
    date: "May 15, 2024",
    status: "Delivered",
    total: 24500,
    items: 3,
    trackingNumber: "KE12345678"
  },
  {
    id: "order-2",
    date: "April 30, 2024",
    status: "Processing",
    total: 15000,
    items: 1,
    trackingNumber: "KE87654321"
  },
  {
    id: "order-3",
    date: "March 22, 2024",
    status: "Cancelled",
    total: 8500,
    items: 2,
    trackingNumber: null
  }
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([mockUser.address]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "payment-1", type: "mpesa", number: "+254 712 345 678", isDefault: true },
    { id: "payment-2", type: "card", number: "**** **** **** 4242", isDefault: false }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
  });

  const handleSaveProfile = () => {
    // In a real app, this would send data to your API
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated."
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 space-y-1 flex-shrink-0">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden border border-enzobay-neutral-200">
                    <img src={mockUser.avatar} alt="User avatar" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-enzobay-brown">{mockUser.name}</h3>
                    <p className="text-sm text-enzobay-neutral-500">Member since {mockUser.memberSince}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm rounded-md ${
                      activeTab === "profile" 
                        ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                        : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm rounded-md ${
                      activeTab === "orders" 
                        ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                        : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    }`}
                  >
                    <Package className="mr-3 h-5 w-5" />
                    My Orders
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm rounded-md ${
                      activeTab === "wishlist" 
                        ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                        : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    }`}
                  >
                    <Heart className="mr-3 h-5 w-5" />
                    Wishlist
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm rounded-md ${
                      activeTab === "addresses" 
                        ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                        : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    }`}
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    Addresses & Payments
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm rounded-md ${
                      activeTab === "settings" 
                        ? "bg-enzobay-blue-light text-enzobay-blue font-medium" 
                        : "text-enzobay-neutral-700 hover:bg-enzobay-neutral-100"
                    }`}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-enzobay-brown mb-4">Profile Information</h2>
                    
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-enzobay-neutral-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="mt-1 block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-enzobay-neutral-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="mt-1 block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                          />
                        </div>
                        
                        <div className="flex space-x-3 pt-4">
                          <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                          >
                            Save Changes
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setProfileData({
                                name: mockUser.name,
                                email: mockUser.email,
                                phone: mockUser.phone,
                              });
                              setIsEditing(false);
                            }}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-enzobay-neutral-700 shadow-sm ring-1 ring-inset ring-enzobay-neutral-300 hover:bg-enzobay-neutral-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <h3 className="text-sm font-medium text-enzobay-neutral-500">Full name</h3>
                            <p className="mt-1 text-sm text-enzobay-neutral-900">{profileData.name}</p>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <h3 className="text-sm font-medium text-enzobay-neutral-500">Email address</h3>
                            <p className="mt-1 text-sm text-enzobay-neutral-900">{profileData.email}</p>
                          </div>
                          
                          <div className="sm:col-span-3">
                            <h3 className="text-sm font-medium text-enzobay-neutral-500">Phone number</h3>
                            <p className="mt-1 text-sm text-enzobay-neutral-900">{profileData.phone}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-enzobay-brown mb-4">My Orders</h2>
                    
                    {mockOrders.length > 0 ? (
                      <div className="space-y-6">
                        {mockOrders.map((order) => (
                          <div key={order.id} className="border border-enzobay-neutral-200 rounded-lg overflow-hidden">
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
                            
                            <div className="px-4 py-3 border-t border-enzobay-neutral-200">
                              <div className="flex flex-wrap justify-between gap-y-2">
                                <div>
                                  <p className="text-sm text-enzobay-neutral-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                                  <p className="text-base font-medium text-enzobay-brown">{formatPrice(order.total)}</p>
                                </div>
                                
                                {order.trackingNumber && (
                                  <div>
                                    <p className="text-sm text-enzobay-neutral-500">Tracking Number</p>
                                    <p className="text-sm font-medium text-enzobay-brown">{order.trackingNumber}</p>
                                  </div>
                                )}
                                
                                <div className="w-full sm:w-auto flex space-x-2 mt-2 sm:mt-0">
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
                      <div className="text-center py-8">
                        <Package className="mx-auto h-12 w-12 text-enzobay-neutral-400" />
                        <h3 className="mt-2 text-sm font-medium text-enzobay-neutral-900">No orders yet</h3>
                        <p className="mt-1 text-sm text-enzobay-neutral-500">Get started by browsing our products.</p>
                        <div className="mt-6">
                          <Link
                            to="/products"
                            className="inline-flex items-center rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark"
                          >
                            Browse Products
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Addresses & Payments Tab */}
              {activeTab === "addresses" && (
                <div>
                  <Tabs defaultValue="addresses" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
                      <TabsTrigger value="payments">Payment Methods</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="addresses">
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-enzobay-brown">Saved Addresses</h2>
                            <button
                              type="button"
                              className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark"
                            >
                              + Add New Address
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {savedAddresses.map((address, index) => (
                              <div key={index} className="border border-enzobay-neutral-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm font-medium text-enzobay-brown">{mockUser.name}</p>
                                    <p className="text-sm text-enzobay-neutral-700 mt-1">
                                      {address.street}, {address.apartment}<br />
                                      {address.city}, {address.region} {address.postalCode}
                                    </p>
                                    <p className="text-sm text-enzobay-neutral-700 mt-1">{mockUser.phone}</p>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <button className="text-sm text-enzobay-blue hover:text-enzobay-blue-dark">Edit</button>
                                    <button className="text-sm text-red-500 hover:text-red-700">Delete</button>
                                  </div>
                                </div>
                                
                                {index === 0 && (
                                  <div className="mt-3 pt-3 border-t border-enzobay-neutral-200">
                                    <p className="text-sm text-enzobay-orange font-medium">Default Shipping Address</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payments">
                      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium text-enzobay-brown">Payment Methods</h2>
                            <button
                              type="button"
                              className="text-sm font-medium text-enzobay-blue hover:text-enzobay-blue-dark"
                            >
                              + Add Payment Method
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {paymentMethods.map((method) => (
                              <div key={method.id} className="border border-enzobay-neutral-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm font-medium text-enzobay-brown">
                                      {method.type === 'mpesa' ? 'M-Pesa' : 'Credit Card'}
                                    </p>
                                    <p className="text-sm text-enzobay-neutral-700 mt-1">{method.number}</p>
                                  </div>
                                  
                                  <div className="flex space-x-2">
                                    <button className="text-sm text-enzobay-blue hover:text-enzobay-blue-dark">Edit</button>
                                    <button className="text-sm text-red-500 hover:text-red-700">Delete</button>
                                  </div>
                                </div>
                                
                                {method.isDefault && (
                                  <div className="mt-3 pt-3 border-t border-enzobay-neutral-200">
                                    <p className="text-sm text-enzobay-orange font-medium">Default Payment Method</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-enzobay-brown mb-4">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-enzobay-neutral-900">Email Notifications</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="order-updates"
                                name="order-updates"
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-enzobay-neutral-300 text-enzobay-blue focus:ring-enzobay-blue"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="order-updates" className="font-medium text-enzobay-neutral-700">Order updates</label>
                              <p className="text-enzobay-neutral-500">Get notified about your order status changes.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="promotions"
                                name="promotions"
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-enzobay-neutral-300 text-enzobay-blue focus:ring-enzobay-blue"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="promotions" className="font-medium text-enzobay-neutral-700">Promotions and deals</label>
                              <p className="text-enzobay-neutral-500">Receive information about deals and promotions.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="newsletter"
                                name="newsletter"
                                type="checkbox"
                                className="h-4 w-4 rounded border-enzobay-neutral-300 text-enzobay-blue focus:ring-enzobay-blue"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="newsletter" className="font-medium text-enzobay-neutral-700">Newsletter</label>
                              <p className="text-enzobay-neutral-500">Receive our weekly newsletter.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-enzobay-neutral-200">
                        <h3 className="text-sm font-medium text-enzobay-neutral-900">Password</h3>
                        <div className="mt-2">
                          <button
                            type="button"
                            className="rounded-md bg-enzobay-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark focus:outline-none"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-enzobay-neutral-200">
                        <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-2">Delete Account</h3>
                        <p className="text-sm text-enzobay-neutral-500 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                          type="button"
                          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Wishlist Tab - Link to the actual wishlist page */}
              {activeTab === "wishlist" && (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6 text-center">
                    <Heart className="mx-auto h-12 w-12 text-enzobay-neutral-400" />
                    <h3 className="mt-2 text-lg font-medium text-enzobay-brown">Your Wishlist</h3>
                    <p className="mt-1 text-enzobay-neutral-500">
                      View all your saved items in one place.
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/wishlist"
                        className="inline-flex items-center rounded-md bg-enzobay-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-enzobay-blue-dark"
                      >
                        Go to Wishlist
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
