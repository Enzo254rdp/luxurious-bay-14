
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, Link } from "react-router-dom";
import { CalendarCheck, Package, ShoppingBag, Users, BarChart2, Settings, Bell, DollarSign, Tag, ShoppingCart, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 4000, orders: 240 },
  { name: "Feb", sales: 3000, orders: 190 },
  { name: "Mar", sales: 2000, orders: 150 },
  { name: "Apr", sales: 2780, orders: 180 },
  { name: "May", sales: 1890, orders: 120 },
  { name: "Jun", sales: 2390, orders: 150 },
  { name: "Jul", sales: 3490, orders: 210 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your online marketplace</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-2xl font-bold">$24,568</span>
            </div>
            <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-2xl font-bold">1,243</span>
            </div>
            <p className="text-xs text-green-500 mt-1">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-2xl font-bold">5,678</span>
            </div>
            <p className="text-xs text-green-500 mt-1">+4.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">42</span>
            </div>
            <p className="text-xs text-amber-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 mb-6">
        <div className="lg:col-span-1 mb-4 lg:mb-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage platform settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={() => navigate("/admin/banners")}
              >
                <Tag className="mr-2 h-4 w-4" />
                Manage Banners
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => navigate("/admin/flash-sales")}
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Flash Sales
              </Button>
              <Button variant="outline" className="justify-start">
                <Package className="mr-2 h-4 w-4" />
                Product Catalog
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Sellers
              </Button>
              <Button variant="outline" className="justify-start">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button variant="outline" className="justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                Reports
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Track your marketplace performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="sales" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="orders" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Monitor the latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div
                  key={order}
                  className="flex justify-between items-center p-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">Order #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={order % 3 === 0 ? "outline" : order % 2 === 0 ? "secondary" : "default"}>
                    {order % 3 === 0 ? "Shipped" : order % 2 === 0 ? "Processing" : "Completed"}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seller Applications</CardTitle>
            <CardDescription>Review pending seller applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((seller) => (
                <div
                  key={seller}
                  className="flex justify-between items-center p-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">Seller #{Math.floor(Math.random() * 10000)}</p>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(Date.now() - Math.floor(Math.random() * 10000000)).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Applications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
