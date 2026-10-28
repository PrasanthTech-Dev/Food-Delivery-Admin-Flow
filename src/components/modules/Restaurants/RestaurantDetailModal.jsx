import React, { useState } from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Percent,
  CheckCircle2,
  DollarSign,
  Radio
} from 'lucide-react';

export default function RestaurantDetailModal({
  restaurant,
  isOpen,
  onClose,
  onUpdateCommission,
  onUpdateOperatingHours,
}) {
  if (!restaurant) return null;

  const [commission, setCommission] = useState(restaurant.commissionRate);
  const [hours, setHours] = useState(restaurant.operatingHours);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateCommission(restaurant.id, Number(commission));
    onUpdateOperatingHours(restaurant.id, hours);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${restaurant.name} — Settings & Compliance`}
      subtitle={`ID: ${restaurant.id} • Owner: ${restaurant.owner}`}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSave} className="space-y-5">
        {restaurant.image && (
          <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-800">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
              <span className="font-bold text-white text-sm">{restaurant.name}</span>
              <span className="text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-md border border-slate-800">
                {restaurant.cuisine}
              </span>
            </div>
          </div>
        )}

        {/* Verification Status Banner */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Merchant Compliance Profile</p>
              <p className="text-[11px] text-slate-400">
                FSSAI Registration & Food Hygiene Rating
              </p>
            </div>
          </div>
          <Badge
            variant={restaurant.status === 'Approved' ? 'success' : 'warning'}
            size="sm"
          >
            {restaurant.status}
          </Badge>
        </div>

        {/* Contact & Location Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Information</span>
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              {restaurant.email}
            </p>
            <p className="text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              {restaurant.phone}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Physical Address & Radius</span>
            <p className="text-white flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              {restaurant.address}
            </p>
            <p className="text-cyan-400 font-medium">Delivery Radius: {restaurant.deliveryRadiusKm} km</p>
          </div>
        </div>

        {/* Editable Commercial Settings */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Commercial & Schedule Configuration
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Platform Commission Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="40"
                  step="0.5"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard platform baseline: 15% - 22%
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Operating Schedule
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. 10:00 AM - 11:00 PM"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Controls order placement window
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div>
            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Update Settings
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
