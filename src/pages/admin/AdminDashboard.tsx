import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+20.1%",
      trend: "up",
    },
    {
      title: "Orders",
      value: "356",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
      change: "+12.2%",
      trend: "up",
    },
    {
      title: "Products",
      value: "2,345",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      change: "+3.1%",
      trend: "up",
    },
    {
      title: "Active Users",
      value: "12,234",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+14.5%",
      trend: "up",
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", status: "Completed", amount: "$125.99", date: "2023-06-01" },
    { id: "ORD-002", customer: "Jane Smith", status: "Processing", amount: "$89.50", date: "2023-06-02" },
    { id: "ORD-003", customer: "Robert Johnson", status: "Shipped", amount: "$432.20", date: "2023-06-03" },
    { id: "ORD-004", customer: "Emily Davis", status: "Pending", amount: "$76.00", date: "2023-06-04" },
    { id: "ORD-005", customer: "Michael Wilson", status: "Completed", amount: "$210.75", date: "2023-06-05" },
  ];

  const lowStockProducts = [
    { id: "PRD-001", name: "Wireless Earbuds", stock: 5, category: "Electronics" },
    { id: "PRD-002", name: "Leather Wallet", stock: 3, category: "Accessories" },
    { id: "PRD-003", name: "Fitness Tracker", stock: 7, category: "Electronics" },
    { id: "PRD-004", name: "Cotton T-Shirt", stock: 8, category: "Clothing" },
    { id: "PRD-005", name: "Stainless Steel Water Bottle", stock: 4, category: "Home & Kitchen" },
  ];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "Admin"}!
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            View Store
          </Button>
          <Button onClick={() => navigate("/admin/banners")}>
            Manage Banners
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      {stat.icon}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground leading-none">
                          {stat.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You have {recentOrders.length} orders this period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div>Date</div>
                  </div>
                  <div className="space-y-2">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="grid grid-cols-5 text-sm">
                        <div className="font-medium">{order.id}</div>
                        <div>{order.customer}</div>
                        <div>
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "default"
                                : order.status === "Processing"
                                ? "secondary"
                                : order.status === "Shipped"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div>{order.amount}</div>
                        <div>{order.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
                <CardDescription>
                  {lowStockProducts.length} products with low inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                    <div>ID</div>
                    <div>Product</div>
                    <div>Category</div>
                    <div>Stock</div>
                  </div>
                  <div className="space-y-2">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="grid grid-cols-4 text-sm">
                        <div className="font-medium">{product.id}</div>
                        <div>{product.name}</div>
                        <div>{product.category}</div>
                        <div className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>
                          {product.stock} units
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Orders management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Products management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Customer management interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed store performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics dashboard will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>Manage your store configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Store settings interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
