import React from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Award,
  DollarSign,
  ShoppingBag,
  Gift,
  ShieldAlert,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CustomerDetailModal({
  customer,
  isOpen,
  onClose,
  onToggleStatus,
  onIssueCredit,
}) {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Customer Profile — ${customer.name}`}
      subtitle={`Account ID: ${customer.id} • Member Since ${customer.joinedDate}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Profile Card Header */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white">{customer.name}</h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {customer.tier}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{customer.email} • {customer.phone}</p>
            </div>
          </div>
          <Badge
            variant={
              customer.status === 'Active'
                ? 'success'
                : customer.status === 'Flagged'
                ? 'danger'
                : 'default'
            }
          >
            {customer.status}
          </Badge>
        </div>

        {/* Commercial Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Lifetime Value</span>
            <p className="text-lg font-bold text-emerald-400 font-mono mt-1">{customer.lifetimeSpend}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Orders</span>
            <p className="text-lg font-bold text-white font-mono mt-1">{customer.totalOrders}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Loyalty Points</span>
            <p className="text-lg font-bold text-blue-400 font-mono mt-1">{customer.loyaltyPoints} pts</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Dispute History</span>
            <p className={`text-lg font-bold mt-1 ${customer.complaintsCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              {customer.complaintsCount} Claims
            </p>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Registered Delivery Locations
          </h4>
          <div className="space-y-2">
            {customer.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs"
              >
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">{addr.tag}</span>
                  <p className="text-slate-300 mt-0.5">{addr.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Restaurant */}
        {customer.favoriteRestaurant && (
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-center justify-between text-xs">
            <span className="text-slate-400">Most Frequented Merchant:</span>
            <span className="font-bold text-blue-400">{customer.favoriteRestaurant}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Issued $10.00 goodwill credit voucher to ${customer.name}'s wallet!`);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 text-purple-400 border border-purple-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5" />
              Issue $10 Credit
            </button>

            <button
              onClick={() => {
                const nextStatus = customer.status === 'Active' ? 'Flagged' : 'Active';
                onToggleStatus(customer.id, nextStatus);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Set {customer.status === 'Active' ? 'Flagged' : 'Active'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
