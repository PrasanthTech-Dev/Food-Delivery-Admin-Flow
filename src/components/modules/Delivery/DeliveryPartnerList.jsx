import React, { useState } from 'react';
import Badge from '../../common/Badge';
import LiveTrackingMap from './LiveTrackingMap';
import {
  Bike,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Star,
  FileCheck,
  Eye,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';

export default function DeliveryPartnerList({
  riders,
  onOpenDriverModal,
  onOpenVerificationModal,
  onToggleRiderStatus,
  searchQuery = '',
}) {
  const [filterTab, setFilterTab] = useState('all');
  const [selectedMapRider, setSelectedMapRider] = useState(riders[0]);
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredRiders = riders.filter(r => {
    if (filterTab === 'Online' && r.status !== 'Online') return false;
    if (filterTab === 'On Delivery' && r.status !== 'On Delivery') return false;
    if (filterTab === 'Pending' && r.status !== 'Pending Verification') return false;
    if (filterTab === 'Offline' && r.status !== 'Offline') return false;

    if (effectiveSearch) {
      const matchName = r.name.toLowerCase().includes(effectiveSearch);
      const matchVehicle = r.vehicleType.toLowerCase().includes(effectiveSearch);
      const matchId = r.id.toLowerCase().includes(effectiveSearch);
      return matchName || matchVehicle || matchId;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Delivery':
        return <Badge variant="cyan" dot={true}>On Delivery</Badge>;
      case 'Online':
        return <Badge variant="success">Online & Ready</Badge>;
      case 'Pending Verification':
        return <Badge variant="warning">Pending Docs</Badge>;
      case 'Offline':
        return <Badge variant="default">Offline</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Fleet KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Registered Fleet</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">342 Couriers</p>
          <span className="text-[11px] text-blue-400">Across 12 service zones</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Actively On Delivery</span>
          <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 mt-1">89 In Transit</p>
          <span className="text-[11px] text-cyan-300">Avg speed 22 km/h</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Ready For Dispatch</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">210 Couriers</p>
          <span className="text-[11px] text-emerald-300">Under 2m pick-up SLA</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Pending Verification</span>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">
            {riders.filter(r => r.status === 'Pending Verification').length} Riders
          </p>
          <span className="text-[11px] text-amber-300">Action required</span>
        </div>
      </div>

      {/* Embedded Live Fleet GPS Radar */}
      <LiveTrackingMap
        riders={riders}
        selectedRider={selectedMapRider}
        onSelectRider={setSelectedMapRider}
      />

      {/* Delivery Fleet Management Table */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'Online', 'On Delivery', 'Pending', 'Offline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Couriers' : tab}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search rider name or vehicle..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Courier Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Courier</th>
                <th className="py-3 px-3">Vehicle Details</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Performance</th>
                <th className="py-3 px-3">Deliveries</th>
                <th className="py-3 px-3">Earnings</th>
                <th className="py-3 px-3">Verification</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {filteredRiders.map((rider) => (
                <tr
                  key={rider.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedMapRider(rider)}
                >
                  {/* Courier Info */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rider.avatar}
                        alt={rider.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                          {rider.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">{rider.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-200">{rider.vehicleType}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{rider.vehiclePlate}</p>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    {getStatusBadge(rider.status)}
                  </td>

                  {/* Rating & On-time */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{rider.rating > 0 ? rider.rating : 'N/A'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">On-time: {rider.onTimeRate}</span>
                  </td>

                  {/* Deliveries Count */}
                  <td className="py-3 px-3">
                    <p className="font-bold text-white font-mono">{rider.totalDeliveries}</p>
                    <span className="text-[10px] text-slate-500">Acc: {rider.acceptanceRate}</span>
                  </td>

                  {/* Earnings */}
                  <td className="py-3 px-3">
                    <p className="font-bold text-emerald-400 font-mono">{rider.todayEarnings}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{rider.weeklyEarnings}/wk</span>
                  </td>

                  {/* Documents Verification */}
                  <td className="py-3 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVerificationModal(rider);
                      }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                      Docs
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDriverModal(rider);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="View Performance & Shift Logs"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
