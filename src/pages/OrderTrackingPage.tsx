import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertCircle, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollPosition } from "../hooks/use-scroll";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingDetails: {
    carrier: string;
    trackingNumber: string;
    statusUpdates: {
      location: string;
      timestamp: string;
      message: string;
    }[];
  };
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "EB12345",
    orderDate: "2024-07-15",
    estimatedDelivery: "2024-07-22",
    status: "shipped",
    items: [{ name: "Leather Wallet", quantity: 1 }],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "91234",
    },
    trackingDetails: {
      carrier: "FedEx",
      trackingNumber: "1234567890",
      statusUpdates: [
        {
          location: "Anytown, CA",
          timestamp: "2024-07-16T08:00:00Z",
          message: "Package received",
        },
        {
          location: "Transit Facility, CA",
          timestamp: "2024-07-17T14:00:00Z",
          message: "In transit",
        },
        {
          location: "Nearby City, CA",
          timestamp: "2024-07-21T18:00:00Z",
          message: "Arrived at destination",
        },
      ],
    },
  },
  {
    id: "2",
    orderNumber: "EB67890",
    orderDate: "2024-07-10",
    estimatedDelivery: "2024-07-18",
    status: "delivered",
    items: [{ name: "Sunglasses", quantity: 1 }],
    shippingAddress: {
      name: "Jane Smith",
      address: "456 Elm St",
      city: "Springfield",
      state: "IL",
      zip: "62704",
    },
    trackingDetails: {
      carrier: "UPS",
      trackingNumber: "0987654321",
      statusUpdates: [
        {
          location: "Springfield, IL",
          timestamp: "2024-07-11T10:00:00Z",
          message: "Package received",
        },
        {
          location: "Transit Hub, IL",
          timestamp: "2024-07-12T16:00:00Z",
          message: "In transit",
        },
        {
          location: "Springfield, IL",
          timestamp: "2024-07-17T12:00:00Z",
          message: "Out for delivery",
        },
        {
          location: "Springfield, IL",
          timestamp: "2024-07-18T09:00:00Z",
          message: "Delivered",
        },
      ],
    },
  },
  {
    id: "3",
    orderNumber: "EB24680",
    orderDate: "2024-07-25",
    estimatedDelivery: "2024-08-02",
    status: "pending",
    items: [{ name: "Running Shoes", quantity: 1 }],
    shippingAddress: {
      name: "Alice Johnson",
      address: "789 Oak St",
      city: "Denver",
      state: "CO",
      zip: "80202",
    },
    trackingDetails: {
      carrier: "USPS",
      trackingNumber: "5678901234",
      statusUpdates: [],
    },
  },
];

export default function OrderTrackingPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const { toast } = useToast();
	const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = mockOrders.find((o) => o.orderNumber === orderNumber);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast({
          title: "Error",
          description: "Order not found.",
          variant: "destructive",
        });
      }
    }
  }, [orderNumber, toast]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
        <Navbar />
        <main className="flex-grow container mx-auto py-6 px-4">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-enzobay-neutral-500" />
            <h1 className="mt-4 text-2xl font-bold text-enzobay-brown">
              Order Not Found
            </h1>
            <p className="mt-2 text-enzobay-neutral-600">
              We couldn't find an order with the number {orderNumber}. Please
              double-check the order number and try again.
            </p>
            <Link
              to="/"
              className="mt-6 bg-enzobay-blue text-white py-2 px-4 rounded-md inline-block hover:bg-enzobay-blue-dark"
            >
              Return to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-enzobay-orange";
      case "shipped":
        return "text-enzobay-blue";
      case "delivered":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-enzobay-neutral-500";
    }
  };

  const trackingSteps = [
    {
      status: "pending",
      label: "Order Placed",
      icon: Clock,
      isCompleted: order.status !== "pending",
    },
    {
      status: "shipped",
      label: "Shipped",
      icon: Truck,
      isCompleted: order.status !== "pending" && order.status !== "shipped",
    },
    {
      status: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      isCompleted: order.status === "delivered",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-enzobay-neutral-50">
      <Navbar />

      <main className="flex-grow container mx-auto py-6 px-4">
        <Link
          to="/"
          className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-enzobay-brown mb-4">
            Order Tracking
          </h1>

          <div className="md:flex md:justify-between md:items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-enzobay-neutral-800">
                Order # {order.orderNumber}
              </h2>
              <p className="text-enzobay-neutral-600">
                Order Date:{" "}
                <span className="font-medium">{order.orderDate}</span>
              </p>
              <p className="text-enzobay-neutral-600">
                Estimated Delivery:{" "}
                <span className="font-medium">{order.estimatedDelivery}</span>
              </p>
              <p className="text-enzobay-neutral-600">
                Status:{" "}
                <span className={`font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  order.shippingAddress.address +
                    ", " +
                    order.shippingAddress.city +
                    ", " +
                    order.shippingAddress.state +
                    " " +
                    order.shippingAddress.zip
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-enzobay-blue text-white py-2 px-4 rounded-md hover:bg-enzobay-blue-dark"
              >
                <MapPin className="mr-2 h-4 w-4" />
                View Shipping Address
              </a>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-enzobay-neutral-800 mb-2">
              Tracking Progress
            </h3>
            <div className="flex items-center justify-between">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`rounded-full border-2 h-8 w-8 flex items-center justify-center z-10 ${
                      step.isCompleted
                        ? "bg-green-100 border-green-500 text-green-500"
                        : order.status === step.status
                        ? "bg-enzobay-blue-100 border-enzobay-blue text-enzobay-blue"
                        : "border-enzobay-neutral-300 text-enzobay-neutral-500"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-enzobay-neutral-600 mt-1">
                    {step.label}
                  </p>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`flex-grow h-0.5 ${
                        step.isCompleted
                          ? "bg-green-500"
                          : order.status === step.status
                          ? "bg-enzobay-blue"
                          : "bg-enzobay-neutral-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-enzobay-neutral-800 mb-2">
              Tracking Updates
            </h3>
            {order.trackingDetails.statusUpdates.length > 0 ? (
              <ul className="space-y-4">
                {order.trackingDetails.statusUpdates.map((update, index) => (
                  <li key={index} className="relative pl-6">
                    <div className="absolute top-0 left-0 flex w-5 h-5 bg-enzobay-blue-100 rounded-full items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-enzobay-blue" />
                    </div>
                    <div className="text-enzobay-neutral-700 font-medium">
                      {update.message}
                    </div>
                    <div className="text-sm text-enzobay-neutral-500">
                      {new Date(update.timestamp).toLocaleString()} -{" "}
                      {update.location}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-enzobay-neutral-500">
                No tracking updates available yet. Please check back later.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
