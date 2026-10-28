import React from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  Clock,
  MapPin,
  Phone,
  User,
  Utensils,
  Bike,
  CreditCard,
  Printer,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  onOpenRefundModal,
  onCancelOrder,
}) {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Details — ${order.id}`}
      subtitle={`Placed ${order.placedAt} • Payment: ${order.paymentMethod} (${order.paymentStatus})`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Status Timeline */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Fulfillment Progress
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                    step.done
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[11px] font-semibold ${step.done ? 'text-slate-200' : 'text-slate-500'}`}>
                  {step.step}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">{step.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Columns: Customer, Restaurant, Courier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Customer Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2">
              <User className="w-4 h-4" />
              Customer
            </div>
            <p className="text-sm font-bold text-white">{order.customer.name}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-400" />
              {order.customer.phone}
            </p>
            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{order.customer.address}</span>
            </p>
          </div>

          {/* Restaurant Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2">
              <Utensils className="w-4 h-4" />
              Restaurant
            </div>
            <p className="text-sm font-bold text-white">{order.restaurant.name}</p>
            <p className="text-xs text-slate-400 mt-1">Rating: ★ {order.restaurant.rating}</p>
            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{order.restaurant.address}</span>
            </p>
          </div>

          {/* Assigned Courier Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
              <Bike className="w-4 h-4" />
              Delivery Partner
            </div>
            {order.rider ? (
              <>
                <p className="text-sm font-bold text-white">{order.rider.name}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {order.rider.phone}
                </p>
                <p className="text-xs text-slate-400 mt-2">Vehicle: {order.rider.vehicle}</p>
                <div className="mt-2 text-[11px] font-semibold text-emerald-400">
                  ETA: {order.eta}
                </div>
              </>
            ) : (
              <div className="py-4 text-center">
                <p className="text-xs text-slate-500 italic">No courier assigned</p>
                <button
                  onClick={() => onUpdateStatus(order.id, 'Active Delivery')}
                  className="mt-2 px-3 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-colors"
                >
                  Auto-Dispatch
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Line Items Table */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Ordered Items ({order.items.length})
          </h4>
          <div className="divide-y divide-slate-800/80">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-800 text-blue-400 font-bold flex items-center justify-center text-xs">
                    {item.qty}x
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <span className="text-[11px] text-slate-400 font-mono">${item.price.toFixed(2)} each</span>
                  </div>
                </div>
                <span className="font-bold text-white font-mono">
                  ${(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-200 font-mono">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-slate-200 font-mono">${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Service Fee</span>
              <span className="text-slate-200 font-mono">${order.platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & GST (8%)</span>
              <span className="text-slate-200 font-mono">${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promo Discount Applied</span>
                <span className="font-mono">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-slate-800 text-sm sm:text-base font-bold text-white">
              <span>Total Charged</span>
              <span className="text-blue-400 font-mono">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Dispute / Refund notice if present */}
        {order.refundReason && (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1">
              <AlertCircle className="w-4 h-4" />
              Customer Refund Claim: ${order.refundAmount?.toFixed(2)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{order.refundReason}</p>
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Printing receipt for ${order.id}... Simulated printer job queued.`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Receipt
            </button>
            {order.status !== 'Cancelled' && (
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
                    onCancelOrder(order.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancel Order
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {order.status === 'Refund Requested' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRefundModal(order);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                Authorize Refund
              </button>
            )}
            {order.status === 'Pending' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'Confirmed');
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                Accept Order
              </button>
            )}
            {order.status === 'Confirmed' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'Active Delivery');
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                Assign & Dispatch Rider
              </button>
            )}
            {order.status === 'Active Delivery' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'Delivered');
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
