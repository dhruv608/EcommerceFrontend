"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle,
  RefreshCw,
  ArrowLeft,
  Search,
  Filter,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  userName: string;
  userEmail: string;
  totalAmount: number;
  totalItems: number;
  status: string;
  orderDate: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  quantity: number;
  subtotal: number;
}

const ORDER_STATUS = {
  PENDING: { color: "bg-[#fff3cd] text-[#856404]", icon: Clock, label: "Pending" },
  CONFIRMED: { color: "bg-[#cce5ff] text-[#004085]", icon: CheckCircle, label: "Confirmed" },
  PROCESSING: { color: "bg-[#e2e3e5] text-[#383d41]", icon: RefreshCw, label: "Processing" },
  SHIPPED: { color: "bg-[#fff3cd] text-[#856404]", icon: Truck, label: "Shipped" },
  DELIVERED: { color: "bg-[#d4edda] text-[#155724]", icon: CheckCircle, label: "Delivered" },
  CANCELLED: { color: "bg-[#f8d7da] text-[#721c24]", icon: XCircle, label: "Cancelled" }
};

export default function UserOrdersPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    // Mark auth as checked after component mounts
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (!authChecked) return; // Wait for auth state to be checked
    
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    fetchUserOrders();
  }, [isLoggedIn, user, authChecked]);

  const fetchUserOrders = async () => {
    if (!user?.userId) return;

    try {
      const response = await api.get(`/orders/user/${user.userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status: string) => {
    return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || ORDER_STATUS.PENDING;
  };

  const calculateEstimatedDelivery = (orderDate: string) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 5);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#acac49] border-t-transparent mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect to login page instead of showing a message
    router.push("/auth/login");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#acac49] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <Button onClick={fetchUserOrders} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white border border-[#eee] rounded-xl p-3.5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by order number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 bg-transparent border-none outline-none"
              >
                <option value="ALL">All Status</option>
                {Object.entries(ORDER_STATUS).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white border border-[#ececec] rounded-xl p-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "ALL" 
                  ? "Try adjusting your filters" 
                  : "You haven't placed any orders yet"}
              </p>
              <Link href="/products">
                <Button className="bg-[#acac49] hover:bg-[#98983e] text-white">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={order.id} className="bg-white border border-[#ececec] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.04)] hover:border-[#acac49] transition-colors duration-150">
                  {/* Order Summary - Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-lg">{order.orderNumber}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })} · {order.totalItems} items
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={`${statusInfo.color} rounded-full px-3 py-1 text-xs font-medium`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <div className="text-lg font-bold">${order.totalAmount.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="space-y-3 mb-4">
                    {order.orderItems.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-2.5">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-[#eee] flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.productName}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                        </div>
                        <div className="font-medium text-sm">${item.subtotal.toFixed(2)}</div>
                      </div>
                    ))}
                    {order.orderItems.length > 2 && (
                      <div className="text-sm text-gray-500 pl-14">
                        +{order.orderItems.length - 2} more items
                      </div>
                    )}
                  </div>

                  {/* Estimated Delivery */}
                  {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500">Estimated Delivery:</div>
                      <div className="text-sm text-gray-600">
                        {calculateEstimatedDelivery(order.orderDate)}
                      </div>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="border border-[#ddd] rounded-lg px-3.5 py-2 hover:bg-[#f5f5ea] transition-colors duration-150"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Order Details
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Order Details - {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Information Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Order Date</div>
                <div className="text-sm font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Total Items</div>
                <div className="text-sm font-medium">{selectedOrder.totalItems}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Order Total</div>
                <div className="text-sm font-medium">${selectedOrder.totalAmount.toFixed(2)}</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Status</div>
                <Badge className={`bg-[#acac49]/15 text-[#acac49] px-2 py-1 rounded-md text-xs font-medium`}>
                  {getStatusInfo(selectedOrder.status).label}
                </Badge>
                {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' && (
                  <div className="text-xs text-gray-500 mt-1">
                    Est. Delivery: {calculateEstimatedDelivery(selectedOrder.orderDate)}
                  </div>
                )}
              </div>
            </div>

            {/* Item List Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{item.productName}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.productDescription}</div>
                      <div className="text-xs text-gray-500 mt-1">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">${item.subtotal.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Row */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-lg font-semibold text-[#acac49]">${selectedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Continue Shopping Button */}
            <Link href="/products" className="flex-1 mt-4">
              <Button className="w-full bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium transition-colors">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
