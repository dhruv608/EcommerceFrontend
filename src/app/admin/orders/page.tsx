"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  User, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle,
  RefreshCw,
  Search,
  Download,
  MoreVertical,
  ChevronDown,
  Eye,
  FileText,
  Edit,
  Ban
} from "lucide-react";
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
  PENDING: { color: "bg-yellow-50 text-yellow-800 border-yellow-200", icon: Clock, label: "Pending" },
  CONFIRMED: { color: "bg-blue-50 text-blue-800 border-blue-200", icon: CheckCircle, label: "Confirmed" },
  PROCESSING: { color: "bg-purple-50 text-purple-800 border-purple-200", icon: RefreshCw, label: "Processing" },
  SHIPPED: { color: "bg-indigo-50 text-indigo-800 border-indigo-200", icon: Truck, label: "Shipped" },
  DELIVERED: { color: "bg-green-50 text-green-800 border-green-200", icon: CheckCircle, label: "Delivered" },
  CANCELLED: { color: "bg-red-50 text-red-800 border-red-200", icon: XCircle, label: "Cancelled" }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<string | null>(null);
  const [actionDropdownOpen, setActionDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderNumber: string, newStatus: string) => {
    setUpdatingOrderId(parseInt(orderNumber.replace('ORD', '')));
    try {
      const response = await api.put(`/orders/${orderNumber}/status?status=${newStatus}`);
      
      setOrders(prev => prev.map(order => 
        order.orderNumber === orderNumber 
          ? { ...order, status: newStatus }
          : order
      ));

      if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      setStatusDropdownOpen(null);
      setActionDropdownOpen(null);
      console.log(`Order ${orderNumber} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        case "oldest":
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        case "price-high":
          return b.totalAmount - a.totalAmount;
        case "price-low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

  const getStatusInfo = (status: string) => {
    return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || ORDER_STATUS.PENDING;
  };

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const exportOrders = () => {
    const csv = [
      ['Order Number', 'Customer', 'Email', 'Date', 'Status', 'Total', 'Items'],
      ...filteredAndSortedOrders.map(order => [
        order.orderNumber,
        order.userName,
        order.userEmail,
        new Date(order.orderDate).toLocaleDateString(),
        order.status,
        order.totalAmount.toString(),
        order.totalItems.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Skeleton Header */}
          <div className="mb-8">
            <div className="h-7 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          
          {/* Skeleton Filters */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            </div>
          </div>
          
          {/* Skeleton Orders */}
          <div className="space-y-[18px]">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-[18px] shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-56"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
              <p className="text-gray-500">Manage and track customer orders</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={exportOrders} 
                className="bg-[#acac49] hover:bg-[#9a9a42] text-white border-0 transition-colors duration-150"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                onClick={fetchOrders}
                className="border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-6 bg-[#f8f8ef] border-0 rounded-xl p-4">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by order ID, customer, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:border-[#acac49] transition-all duration-150"
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:border-[#acac49] transition-all duration-150"
                >
                  <option value="ALL">All Status</option>
                  {Object.entries(ORDER_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
                
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:border-[#acac49] transition-all duration-150"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:border-[#acac49] transition-all duration-150"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-[18px]">
          {filteredAndSortedOrders.length === 0 ? (
            <Card className="bg-white border-0 rounded-xl p-12">
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-[#e5e5ce] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-[#6c6c2e]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || statusFilter !== "ALL" 
                    ? "Try adjusting your filters" 
                    : "Start by creating your first order"}
                </p>
                <Button className="bg-[#acac49] hover:bg-[#9a9a42] text-white">
                  Create first order
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              const firstItem = order.orderItems[0];
              
              return (
                <Card 
                  key={order.id} 
                  className="bg-white border border-[#ececec] rounded-xl p-[18px] shadow-sm hover:shadow-md hover:border-[#acac49] transition-all duration-150 border-l-4 border-l-[#acac49]"
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      {/* Column 1: Customer Info */}
                      <div className="flex items-center gap-4">
                        {/* Customer Avatar */}
                        <div className="w-12 h-12 bg-[#e5e5ce] rounded-full flex items-center justify-center text-sm font-bold text-[#6c6c2e]">
                          {getCustomerInitials(order.userName)}
                        </div>
                        
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 text-lg">#{order.orderNumber}</div>
                          <div className="text-gray-700 font-medium">{order.userName}</div>
                          <div className="text-sm text-gray-500">{order.userEmail}</div>
                        </div>
                      </div>

                      {/* Column 2: Product Info */}
                      <div className="flex items-center gap-4 min-w-0">
                        {firstItem && (
                          <>
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-gray-900 truncate">
                                {firstItem.productName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.totalItems} {order.totalItems === 1 ? 'item' : 'items'} • ${firstItem.price.toFixed(2)} each
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Column 3: Price + Date */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Column 4: Status + Actions */}
                      <div className="flex items-center justify-end gap-3">
                        {/* Status Badge */}
                        <div className="relative">
                          <Badge 
                            className={`${statusInfo.color} border cursor-pointer rounded-full px-3 py-1`} 
                            onClick={() => setStatusDropdownOpen(
                              statusDropdownOpen === order.orderNumber ? null : order.orderNumber
                            )}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </Badge>
                          
                          {/* Status Dropdown */}
                          {statusDropdownOpen === order.orderNumber && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="py-1">
                                {Object.entries(ORDER_STATUS).map(([status, info]) => {
                                  const Icon = info.icon;
                                  const isCurrentStatus = order.status === status;
                                  const isUpdating = updatingOrderId === order.id;
                                  
                                  return (
                                    <button
                                      key={status}
                                      onClick={() => updateOrderStatus(order.orderNumber, status)}
                                      disabled={isCurrentStatus || isUpdating}
                                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150 ${
                                        isCurrentStatus ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                                      }`}
                                    >
                                      <Icon className="h-4 w-4" />
                                      {info.label}
                                      {isUpdating && <RefreshCw className="h-3 w-3 animate-spin ml-auto" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions Dropdown */}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActionDropdownOpen(
                              actionDropdownOpen === order.orderNumber ? null : order.orderNumber
                            )}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          
                          {/* Actions Dropdown */}
                          {actionDropdownOpen === order.orderNumber && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setActionDropdownOpen(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150 text-gray-700"
                                >
                                  <Eye className="h-4 w-4" />
                                  View details
                                </button>
                                <button
                                  onClick={() => {
                                    setStatusDropdownOpen(order.orderNumber);
                                    setActionDropdownOpen(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150 text-gray-700"
                                >
                                  <Edit className="h-4 w-4" />
                                  Update status
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors duration-150 text-gray-700"
                                >
                                  <FileText className="h-4 w-4" />
                                  Print invoice
                                </button>
                                <button
                                  onClick={() => updateOrderStatus(order.orderNumber, 'CANCELLED')}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2 transition-colors duration-150 text-red-600"
                                >
                                  <Ban className="h-4 w-4" />
                                  Cancel order
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-0 rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Details - #{selectedOrder.orderNumber}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#e5e5ce] rounded-full flex items-center justify-center text-sm font-bold text-[#6c6c2e]">
                            {getCustomerInitials(selectedOrder.userName)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{selectedOrder.userName}</div>
                            <div className="text-sm text-gray-500">{selectedOrder.userEmail}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Order Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Order Date:</span>
                          <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Items:</span>
                          <span className="font-medium">{selectedOrder.totalItems}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-bold text-lg text-[#acac49]">${selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
                    <Badge className={getStatusInfo(selectedOrder.status).color + " rounded-full px-4 py-2"}>
                      {getStatusInfo(selectedOrder.status).label}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-[#f8f8ef] rounded-lg">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.productDescription}</div>
                            <div className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                          </div>
                          <div className="font-bold text-gray-900">
                            ${item.subtotal.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="border-gray-200 hover:bg-gray-50 gap-2">
                      <FileText className="h-4 w-4" />
                      Print Invoice
                    </Button>
                    <Button 
                      onClick={() => setSelectedOrder(null)}
                      className="bg-[#acac49] hover:bg-[#9a9a42] text-white gap-2"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
