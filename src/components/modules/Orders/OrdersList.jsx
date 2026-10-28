import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Bike,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  MoreVertical,
  ChevronRight,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function OrdersList({
  orders,
  onSelectOrder,
  onUpdateStatus,
  onOpenRefundModal,
  searchQuery = '',
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'Pending', label: 'Pending Kitchen', count: orders.filter(o => o.status === 'Pending').length },
    { id: 'Confirmed', label: 'In Prep', count: orders.filter(o => o.status === 'Confirmed').length },
    { id: 'Active Delivery', label: 'Active Deliveries', count: orders.filter(o => o.status === 'Active Delivery').length },
    { id: 'Delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
    { id: 'Cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length },
    { id: 'Refund Requested', label: 'Refund Requests', count: orders.filter(o => o.status === 'Refund Requested').length },
  ];

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredOrders = orders.filter(order => {
    // Tab filter
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    // Search query filter
    if (effectiveSearch) {
      const matchId = order.id.toLowerCase().includes(effectiveSearch);
      const matchCustomer = order.customer.name.toLowerCase().includes(effectiveSearch);
      const matchRestaurant = order.restaurant.name.toLowerCase().includes(effectiveSearch);
      const matchRider = order.rider?.name.toLowerCase().includes(effectiveSearch);
      return matchId || matchCustomer || matchRestaurant || matchRider;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="warning">Pending Acceptance</Badge>;
      case 'Confirmed':
        return <Badge variant="primary">In Kitchen Prep</Badge>;
      case 'Active Delivery':
        return <Badge variant="cyan" dot={true}>Rider En Route</Badge>;
      case 'Delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'Cancelled':
        return <Badge variant="default">Cancelled</Badge>;
      case 'Refund Requested':
        return <Badge variant="danger">Refund Dispute</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header & Quick Order KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Live Queue</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {orders.filter(o => ['Pending', 'Confirmed', 'Active Delivery'].includes(o.status)).length} Orders
          </p>
          <span className="text-[11px] text-blue-400">Active fulfillment</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Needs Restaurant Confirmation</span>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">
            {orders.filter(o => o.status === 'Pending').length} Orders
          </p>
          <span className="text-[11px] text-amber-300">Avg response 90s</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Riders On The Road</span>
          <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 mt-1">
            {orders.filter(o => o.status === 'Active Delivery').length} In Transit
          </p>
          <span className="text-[11px] text-cyan-300">Live GPS tracking</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Refund Claims</span>
          <p className="text-xl sm:text-2xl font-extrabold text-rose-400 mt-1">
            {orders.filter(o => o.status === 'Refund Requested').length} Claims
          </p>
          <span className="text-[11px] text-rose-300">Requires review</span>
        </div>
      </div>

      {/* Filter Tabs & Local Search */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Scrollable Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Filter this tab..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Restaurant</th>
                <th className="py-3 px-3">Items & Qty</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Assigned Courier</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-500">
                    No orders match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Order ID & Time */}
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-blue-400 group-hover:underline cursor-pointer" onClick={() => onSelectOrder(order)}>
                        {order.id}
                      </span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">{order.placedAt}</span>
                    </td>

                    {/* Customer Info */}
                    <td className="py-3 px-3">
                      <p className="font-semibold text-white">{order.customer.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{order.customer.phone}</p>
                    </td>

                    {/* Restaurant Info */}
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-200">{order.restaurant.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{order.restaurant.address}</p>
                    </td>

                    {/* Items Summary */}
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-300 truncate max-w-[180px]">
                        {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                      </p>
                      <span className="text-[10px] text-slate-500">{order.items.length} unique items</span>
                    </td>

                    {/* Total Amount & Gateway */}
                    <td className="py-3 px-3">
                      <p className="font-bold text-white font-mono">${order.total.toFixed(2)}</p>
                      <span className="text-[10px] text-slate-400">{order.paymentMethod}</span>
                    </td>

                    {/* Courier Assignment */}
                    <td className="py-3 px-3">
                      {order.rider ? (
                        <div className="flex items-center gap-1.5">
                          <Bike className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="font-medium text-slate-200">{order.rider.name}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">Unassigned</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick Status Forwarding */}
                        {order.status === 'Pending' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Confirm & Dispatch to Kitchen"
                          >
                            Accept Order
                          </button>
                        )}
                        {order.status === 'Confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'Active Delivery')}
                            className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Assign Courier & Dispatch"
                          >
                            Dispatch Rider
                          </button>
                        )}
                        {order.status === 'Active Delivery' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'Delivered')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Mark Delivered"
                          >
                            Mark Done
                          </button>
                        )}
                        {order.status === 'Refund Requested' && (
                          <button
                            onClick={() => onOpenRefundModal(order)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-colors cursor-pointer"
                            title="Review Refund Dispute"
                          >
                            Review Claim
                          </button>
                        )}

                        {/* View Order Modal */}
                        <button
                          onClick={() => onSelectOrder(order)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
