
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useScrollToTop } from "../../hooks/use-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { 
  PlusCircle, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Tag, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowUpRight,
  Search,
  ChevronDown,
  Download
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const SellerDashboard = () => {
  useScrollToTop();
  const { toast } = useToast();
  
  // State for products
  const [products, setProducts] = useState([
    { id: 1, name: "Handmade Ceramic Pot", price: 2500, inventory: 15, status: "active" },
    { id: 2, name: "Beaded Necklace", price: 1800, inventory: 8, status: "active" },
    { id: 3, name: "Wooden Wall Art", price: 3200, inventory: 6, status: "active" },
    { id: 4, name: "Organic Face Scrub", price: 850, inventory: 24, status: "active" },
    { id: 5, name: "Leather Journal", price: 1200, inventory: 0, status: "out_of_stock" },
  ]);
  
  // State for orders
  const [orders, setOrders] = useState([
    { id: "ORD-7823", customer: "Jane Smith", date: "2023-06-12", total: 4300, status: "delivered" },
    { id: "ORD-7824", customer: "Michael Johnson", date: "2023-06-14", total: 1800, status: "processing" },
    { id: "ORD-7825", customer: "Sarah Williams", date: "2023-06-15", total: 3200, status: "shipped" },
    { id: "ORD-7826", customer: "David Brown", date: "2023-06-15", total: 850, status: "pending" },
  ]);
  
  // Sales data for chart
  const salesData = [
    { name: "Jan", sales: 12000 },
    { name: "Feb", sales: 19000 },
    { name: "Mar", sales: 15000 },
    { name: "Apr", sales: 25000 },
    { name: "May", sales: 32000 },
    { name: "Jun", sales: 45600 },
  ];
  
  // State for product form
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
    category: "",
  });
  
  // Handle add product
  const handleAddProduct = () => {
    // In a real app, you would send this to an API
    const createdProduct = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      inventory: parseInt(newProduct.inventory),
      status: parseInt(newProduct.inventory) > 0 ? "active" : "out_of_stock",
    };
    
    setProducts([...products, createdProduct]);
    setIsAddingProduct(false);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      inventory: "",
      category: "",
    });
    
    toast({
      title: "Product added successfully",
      description: `${newProduct.name} has been added to your inventory`,
    });
  };
  
  // Handle product deletion
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory",
    });
  };
  
  // Handle order status change
  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Order updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">
          Seller Dashboard
        </h1>
        <p className="text-enzobay-neutral-600 mb-8">
          Manage your products, orders, and track your sales performance
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm border-enzobay-neutral-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-enzobay-brown flex items-center">
                <Package className="mr-2 h-5 w-5 text-enzobay-blue" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-enzobay-blue">{products.length}</p>
              <p className="text-enzobay-neutral-600 text-sm">Total products</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingProduct(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-sm border-enzobay-neutral-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-enzobay-brown flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5 text-enzobay-green" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-enzobay-green">{orders.length}</p>
              <p className="text-enzobay-neutral-600 text-sm">Active orders</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast({
                  title: "Orders view",
                  description: "View your orders below in the Orders tab",
                });
              }}>
                View Orders
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-sm border-enzobay-neutral-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-enzobay-brown flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-enzobay-orange" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-enzobay-orange">Ksh 45,600</p>
              <p className="text-enzobay-neutral-600 text-sm">This month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                toast({
                  title: "Analytics view",
                  description: "View your sales analytics below in the Analytics tab",
                });
              }}>
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-enzobay-neutral-200">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-enzobay-neutral-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8"
                  onChange={() => {
                    toast({
                      title: "Search functionality",
                      description: "Search feature will be implemented soon",
                    });
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="handmade">Handmade</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="homegoods">Home Goods</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={() => setIsAddingProduct(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>
            
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>Ksh {product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.inventory}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "destructive"} className={product.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                          {product.status === "active" ? "Active" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Edit Product",
                                description: "Edit functionality will be implemented soon",
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-enzobay-neutral-400" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-8"
                  onChange={() => {
                    toast({
                      title: "Search functionality",
                      description: "Search feature will be implemented soon",
                    });
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>Ksh {order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            order.status === "delivered" ? "outline" : 
                            order.status === "shipped" ? "outline" :
                            order.status === "processing" ? "secondary" : "default"
                          }
                          className={
                            order.status === "delivered" ? "bg-green-100 text-green-800 hover:bg-green-200" : 
                            order.status === "shipped" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                            order.status === "processing" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                            "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "View Order",
                                description: `Viewing details for order ${order.id}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "pending")}>
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "processing")}>
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "shipped")}>
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOrderStatusChange(order.id, "delivered")}>
                                Mark as Delivered
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Your sales performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="sales" fill="#82c91e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => {
                  toast({
                    title: "Export Analytics",
                    description: "Export functionality will be implemented soon",
                  });
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Handmade Ceramic Pot</p>
                        <p className="text-sm text-enzobay-neutral-500">32 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 80,000</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Beaded Necklace</p>
                        <p className="text-sm text-enzobay-neutral-500">28 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 50,400</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Organic Face Scrub</p>
                        <p className="text-sm text-enzobay-neutral-500">25 units sold</p>
                      </div>
                      <p className="font-semibold">Ksh 21,250</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                        <p className="font-semibold text-green-600">Sales Increasing</p>
                      </div>
                      <p className="text-sm text-enzobay-neutral-700">Your sales have increased by 24% compared to last month.</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-blue-600" />
                        <p className="font-semibold text-blue-600">Popular Category</p>
                      </div>
                      <p className="text-sm text-enzobay-neutral-700">Handmade items are your best performing category.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product to sell on the marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your product"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (Ksh)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inventory">Inventory</Label>
                <Input 
                  id="inventory" 
                  type="number" 
                  placeholder="0"
                  value={newProduct.inventory}
                  onChange={(e) => setNewProduct({...newProduct, inventory: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                onValueChange={(value) => setNewProduct({...newProduct, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="handmade">Handmade</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="homegoods">Home Goods</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingProduct(false)}>Cancel</Button>
            <Button onClick={handleAddProduct} disabled={!newProduct.name || !newProduct.price || !newProduct.inventory}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
