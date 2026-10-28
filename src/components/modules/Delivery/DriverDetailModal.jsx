import React from 'react';
import Modal from '../../common/Modal';
import Badge from '../../common/Badge';
import {
  Bike,
  Star,
  DollarSign,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Compass,
  Zap
} from 'lucide-react';

export default function DriverDetailModal({
  rider,
  isOpen,
  onClose,
  onToggleStatus,
}) {
  if (!rider) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Courier Profile — ${rider.name}`}
      subtitle={`ID: ${rider.id} • Vehicle: ${rider.vehicleType} (${rider.vehiclePlate})`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {/* Profile Header */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={rider.avatar}
              alt={rider.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <div>
              <h4 className="text-base font-bold text-white">{rider.name}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <b className="text-white">{rider.rating}</b> ({rider.totalDeliveries} ratings)
                </span>
                <span>•</span>
                <span>Speed: {rider.speed}</span>
              </div>
            </div>
          </div>
          <Badge
            variant={
              rider.status === 'On Delivery'
                ? 'cyan'
                : rider.status === 'Online'
                ? 'success'
                : 'default'
            }
          >
            {rider.status}
          </Badge>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Contact Channels</span>
            <p className="text-white font-medium mt-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" /> {rider.phone}
            </p>
            <p className="text-slate-400 mt-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> {rider.email}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Vehicle Telematics</span>
            <p className="text-white font-medium mt-1">{rider.vehicleType}</p>
            <p className="text-slate-400 mt-1 font-mono">Plate: {rider.vehiclePlate}</p>
          </div>
        </div>

        {/* Performance & Earnings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Acceptance Rate</span>
            <p className="text-lg font-bold text-emerald-400 mt-1">{rider.acceptanceRate}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">On-Time Rate</span>
            <p className="text-lg font-bold text-blue-400 mt-1">{rider.onTimeRate}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Today's Earnings</span>
            <p className="text-lg font-bold text-white font-mono mt-1">{rider.todayEarnings}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Weekly Total</span>
            <p className="text-lg font-bold text-emerald-400 font-mono mt-1">{rider.weeklyEarnings}</p>
          </div>
        </div>

        {/* Active Order if any */}
        {rider.currentOrder && (
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-cyan-400 animate-spin" />
              <div>
                <p className="text-xs font-bold text-white">Currently Dispatched to Order {rider.currentOrder}</p>
                <p className="text-[11px] text-cyan-300">Active route navigation in progress</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextStatus = rider.status === 'Offline' ? 'Online' : 'Offline';
                onToggleStatus(rider.id, nextStatus);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Toggle {rider.status === 'Offline' ? 'Online' : 'Offline'}
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
