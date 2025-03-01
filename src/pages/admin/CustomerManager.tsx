
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { 
  Users, 
  Search, 
  Download, 
  UserPlus,
  Eye,
  Edit2,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  X
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";

const CustomerManager = () => {
  useScrollToTop();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
  });

  // Mock customers data (would come from API/database)
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+254 712 345 678', orders: 8, spent: 32600, location: 'Nairobi' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+254 723 456 789', orders: 5, spent: 18400, location: 'Mombasa' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '+254 734 567 890', orders: 12, spent: 45800, location: 'Nairobi' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', phone: '+254 745 678 901', orders: 3, spent: 8900, location: 'Kisumu' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', phone: '+254 756 789 012', orders: 7, spent: 24500, location: 'Nairobi' },
    { id: 6, name: 'Michael Johnson', email: 'michael@example.com', phone: '+254 767 890 123', orders: 2, spent: 5600, location: 'Nakuru' },
    { id: 7, name: 'Sarah Davis', email: 'sarah@example.com', phone: '+254 778 901 234', orders: 9, spent: 36800, location: 'Mombasa' },
    { id: 8, name: 'David Wilson', email: 'david@example.com', phone: '+254 789 012 345', orders: 6, spent: 21500, location: 'Nairobi' },
  ];

  // Mock customer details (for the selected customer)
  const customerDetails = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi',
    address: '123 Main St, Nairobi, Kenya',
    joinDate: '2023-01-15',
    orders: 8,
    spent: 32600,
    lastOrder: '2023-09-28',
    recentOrders: [
      { id: 'ORD-1234', date: '2023-09-28', total: 5600, status: 'completed' },
      { id: 'ORD-1200', date: '2023-09-15', total: 3400, status: 'completed' },
      { id: 'ORD-1150', date: '2023-08-30', total: 8500, status: 'completed' },
    ],
  };

  // Mock locations
  const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

  const filteredCustomers = customers.filter(customer => {
    // Filter by search query
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.phone.includes(searchQuery);
    
    // Filter by location
    const matchesLocation = selectedLocation === "all" || customer.location === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Executed",
      description: `Searched for: ${searchQuery}`,
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Customers data is being exported to CSV.",
    });
  };

  const handleViewCustomer = (customerId: number) => {
    // In a real app, this would fetch customer details from the API
    setSelectedCustomer(customerDetails);
    setShowCustomerModal(true);
  };

  const handleSaveCustomer = () => {
    // Validation
    if (!newCustomer.name || !newCustomer.email) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call to save the customer
    toast({
      title: "Customer Added",
      description: `Customer "${newCustomer.name}" has been added.`,
    });
    
    setShowAddModal(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      location: "",
      address: "",
    });
  };

  const handleSendEmail = (customer: any) => {
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${customer.email}.`,
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

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-semibold text-enzobay-brown mb-4 md:mb-0">
              <span className="flex items-center">
                <Users className="mr-2 h-6 w-6" /> Customer Management
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex-grow relative">
                <input 
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-enzobay-neutral-200 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enzobay-neutral-500" />
              </form>
              
              <select 
                className="border rounded-md px-3 py-2 text-sm bg-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              
              <button 
                className="bg-enzobay-blue text-white px-4 py-2 rounded-md text-sm flex items-center"
                onClick={() => setShowAddModal(true)}
              >
                <UserPlus className="h-4 w-4 mr-1" /> Add Customer
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-2 md:mb-0">
              <p className="text-sm text-enzobay-neutral-600">
                Showing {filteredCustomers.length} customers
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-3 py-1.5 rounded-md text-sm flex items-center"
                onClick={handleExportCSV}
              >
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-enzobay-neutral-200">
              <thead>
                <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider">
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
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-enzobay-neutral-50">
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
                        <button 
                          className="text-enzobay-blue hover:text-enzobay-blue-dark"
                          onClick={() => handleViewCustomer(customer.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-enzobay-green hover:text-enzobay-green-dark"
                          onClick={() => handleSendEmail(customer)}
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-enzobay-neutral-600 hover:text-enzobay-neutral-800"
                          onClick={() => {
                            toast({
                              title: "Edit Customer",
                              description: `Editing customer: ${customer.name}`,
                            });
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentCustomers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-enzobay-neutral-600">
                      No customers found. Try a different search query or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-enzobay-neutral-600 mb-2 sm:mb-0">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
            </p>
            
            <div className="flex space-x-1">
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === 1 ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i + 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === i + 1 ? 'bg-enzobay-blue text-white' : 'text-enzobay-neutral-700'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages ? 'text-enzobay-neutral-400 cursor-not-allowed' : 'text-enzobay-neutral-700'}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-enzobay-brown">Customer Profile</h3>
              <button 
                className="text-enzobay-neutral-500 hover:text-enzobay-neutral-800"
                onClick={() => setShowCustomerModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <div className="md:w-1/3">
                  <div className="bg-enzobay-neutral-50 p-6 rounded-md text-center">
                    <div className="h-20 w-20 rounded-full bg-enzobay-blue-100 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-medium text-enzobay-blue">
                        {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-enzobay-neutral-900 mb-1">{selectedCustomer.name}</h3>
                    
                    <div className="flex items-center justify-center text-sm text-enzobay-neutral-700 mb-1">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-enzobay-neutral-700 mb-1">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-enzobay-neutral-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedCustomer.location}</span>
                    </div>
                    
                    <div className="border-t border-enzobay-neutral-200 my-4 pt-4">
                      <button 
                        className="bg-enzobay-blue text-white px-4 py-2 rounded-md text-sm w-full mb-2"
                        onClick={() => {
                          toast({
                            title: "Email Sent",
                            description: `Email has been sent to ${selectedCustomer.email}.`,
                          });
                        }}
                      >
                        Send Email
                      </button>
                      <button 
                        className="bg-enzobay-neutral-100 text-enzobay-neutral-700 px-4 py-2 rounded-md text-sm w-full"
                        onClick={() => {
                          toast({
                            title: "Editing Customer",
                            description: `Opening edit form for ${selectedCustomer.name}.`,
                          });
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                          <ShoppingBag className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-enzobay-neutral-700">Total Orders</span>
                      </div>
                      <p className="text-2xl font-bold text-enzobay-green">{selectedCustomer.orders}</p>
                    </div>
                    
                    <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-enzobay-neutral-700">Total Spent</span>
                      </div>
                      <p className="text-2xl font-bold text-enzobay-blue">{formatCurrency(selectedCustomer.spent)}</p>
                    </div>
                    
                    <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-enzobay-neutral-700">Join Date</span>
                      </div>
                      <p className="text-lg font-medium text-enzobay-neutral-900">{selectedCustomer.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-enzobay-neutral-500 mb-2">Customer Address</h4>
                    <div className="bg-enzobay-neutral-50 p-4 rounded-md">
                      <p className="text-sm">{selectedCustomer.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-enzobay-neutral-500">Recent Orders</h4>
                      <button 
                        className="text-sm text-enzobay-blue hover:underline"
                        onClick={() => {
                          toast({
                            title: "View All Orders",
                            description: `Viewing all orders for ${selectedCustomer.name}.`,
                          });
                        }}
                      >
                        View All
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-enzobay-neutral-200">
                        <thead>
                          <tr className="text-left text-xs font-medium text-enzobay-neutral-500 uppercase tracking-wider bg-enzobay-neutral-50">
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-enzobay-neutral-200">
                          {selectedCustomer.recentOrders.map((order: any) => (
                            <tr key={order.id} className="hover:bg-enzobay-neutral-50">
                              <td className="px-4 py-2 text-sm font-medium text-enzobay-blue">{order.id}</td>
                              <td className="px-4 py-2 text-sm">{order.date}</td>
                              <td className="px-4 py-2 text-sm font-medium">{formatCurrency(order.total)}</td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="px-4 py-2 bg-enzobay-blue text-white rounded-md"
                  onClick={() => setShowCustomerModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-enzobay-brown">Add New Customer</h3>
              <button 
                className="text-enzobay-neutral-500 hover:text-enzobay-neutral-800"
                onClick={() => setShowAddModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full border rounded-md px-3 py-2"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full border rounded-md px-3 py-2"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Location
                  </label>
                  <select 
                    className="w-full border rounded-md px-3 py-2"
                    value={newCustomer.location}
                    onChange={(e) => setNewCustomer({...newCustomer, location: e.target.value})}
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                    Address
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full border rounded-md px-3 py-2"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border rounded-md text-enzobay-neutral-700"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-enzobay-blue text-white rounded-md"
                  onClick={handleSaveCustomer}
                >
                  Save Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CustomerManager;
