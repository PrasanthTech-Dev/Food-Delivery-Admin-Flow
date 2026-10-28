import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  DollarSign,
  Power,
  ShieldCheck,
  ChevronRight,
  Settings
} from 'lucide-react';

export default function RestaurantList({
  restaurants,
  menuItems,
  onOpenAddModal,
  onOpenDetailModal,
  onOpenMenuModal,
  onToggleStoreStatus,
  onApproveRestaurant,
  searchQuery = '',
}) {
  const [filterTab, setFilterTab] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredRestaurants = restaurants.filter(rest => {
    if (filterTab === 'Approved' && rest.status !== 'Approved') return false;
    if (filterTab === 'Pending' && rest.status !== 'Pending Verification') return false;
    if (filterTab === 'Suspended' && rest.status !== 'Suspended') return false;

    if (effectiveSearch) {
      const matchName = rest.name.toLowerCase().includes(effectiveSearch);
      const matchCuisine = rest.cuisine.toLowerCase().includes(effectiveSearch);
      const matchOwner = rest.owner.toLowerCase().includes(effectiveSearch);
      return matchName || matchCuisine || matchOwner;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Partners</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">{restaurants.length} Listed</p>
          <span className="text-[11px] text-blue-400">814 platform network</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Currently Open</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">
            {restaurants.filter(r => r.isOpen).length} Active Kitchens
          </p>
          <span className="text-[11px] text-emerald-300">Accepting orders</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Pending Verification</span>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">
            {restaurants.filter(r => r.status === 'Pending Verification').length} Under Review
          </p>
          <span className="text-[11px] text-amber-300">Documents submitted</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Avg Commission</span>
          <p className="text-xl sm:text-2xl font-extrabold text-purple-400 mt-1">17.2%</p>
          <span className="text-[11px] text-purple-300">Net platform intake</span>
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Action */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {['all', 'Approved', 'Pending', 'Suspended'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Kitchens' : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search restaurant or cuisine..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Register Restaurant
            </button>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRestaurants.map((rest) => {
            const restMenuItems = menuItems.filter(m => m.restaurantId === rest.id);

            return (
              <div
                key={rest.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg hover:shadow-blue-500/10"
              >
                {/* Real Food Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={rest.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80"}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {rest.status === 'Approved' ? (
                      <Badge variant="success" size="xs">Approved</Badge>
                    ) : rest.status === 'Pending Verification' ? (
                      <Badge variant="warning" size="xs">Under Review</Badge>
                    ) : (
                      <Badge variant="danger" size="xs">Suspended</Badge>
                    )}

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow ${
                      rest.isOpen
                        ? 'bg-emerald-950/85 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-950/85 text-rose-400 border border-rose-500/40'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${rest.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                      {rest.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
                    <span className="text-[11px] font-semibold text-slate-200 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
                      {rest.cuisine}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/85 backdrop-blur-md px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {rest.deliveryRadiusKm} km radius
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Restaurant Identity & Owner */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-slate-400 block">{rest.id} • {rest.owner}</span>
                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {rest.name}
                        </h4>
                      </div>
                    </div>

                    {/* Food Categories Pills */}
                    {rest.categories && rest.categories.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {rest.categories.slice(0, 3).map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                        {rest.categories.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800/40 text-slate-500">
                            +{rest.categories.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Rating & Hours */}
                    <div className="mt-3 flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-white">{rest.rating}</span>
                        <span className="text-[11px] text-slate-400">({rest.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {rest.operatingHours}
                      </div>
                    </div>

                    {/* Commercial Stats: Commission & GMV */}
                    <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Commission</span>
                        <span className="font-bold text-blue-400 font-mono">{rest.commissionRate}%</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block">Total GMV</span>
                        <span className="font-bold text-emerald-400 font-mono">{rest.totalRevenue}</span>
                      </div>
                    </div>

                    {/* Documents & Compliance */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>FSSAI: <b className="text-slate-300">{rest.documents.fssai}</b></span>
                      <span>•</span>
                      <span>Hygiene: <b className="text-slate-300">{rest.documents.hygieneScore}</b></span>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    {/* Store Open/Close Toggle */}
                    <button
                      onClick={() => onToggleStoreStatus(rest.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        rest.isOpen
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                      }`}
                      title={rest.isOpen ? 'Kitchen Open (Click to close)' : 'Kitchen Closed (Click to open)'}
                    >
                      <Power className="w-3.5 h-3.5" />
                      {rest.isOpen ? 'Open' : 'Closed'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* If pending, show Approve button */}
                      {rest.status === 'Pending Verification' && (
                        <button
                          onClick={() => onApproveRestaurant(rest.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}

                      {/* Manage Menu */}
                      <button
                        onClick={() => onOpenMenuModal(rest)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-semibold transition-colors cursor-pointer"
                        title="Manage Menu Items"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Menu ({restMenuItems.length})
                      </button>

                      {/* Settings / Detail */}
                      <button
                        onClick={() => onOpenDetailModal(rest)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Restaurant Configuration & Commission"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
