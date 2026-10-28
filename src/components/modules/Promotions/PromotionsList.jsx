import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  Tag,
  Plus,
  Search,
  Sparkles,
  Calendar,
  Users,
  Percent,
  CheckCircle2,
  Clock,
  TrendingUp,
  Share2,
  Copy,
  Gift
} from 'lucide-react';

export default function PromotionsList({
  coupons,
  onOpenCreateCouponModal,
  onToggleCouponStatus,
  searchQuery = '',
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [localSearch, setLocalSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredCoupons = coupons.filter(c => {
    if (filterStatus === 'Active' && c.status !== 'Active') return false;
    if (filterStatus === 'Expired' && c.status !== 'Expired') return false;

    if (effectiveSearch) {
      const matchCode = c.code.toLowerCase().includes(effectiveSearch);
      const matchCategory = c.applicableCategory.toLowerCase().includes(effectiveSearch);
      return matchCode || matchCategory;
    }
    return true;
  });

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Analytics Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Active Campaigns</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">4 Running</p>
          <span className="text-[11px] text-purple-400">All channels active</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Redemptions</span>
          <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 mt-1">15,170 Times</p>
          <span className="text-[11px] text-cyan-300">82% utilization rate</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Attributed GMV</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">$142,800</p>
          <span className="text-[11px] text-emerald-300">3.8x ROI multiplier</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Referral Signups</span>
          <p className="text-xl sm:text-2xl font-extrabold text-blue-400 mt-1">3,840 Users</p>
          <span className="text-[11px] text-blue-300">Organic viral loop</span>
        </div>
      </div>

      {/* Referral Program Spotlight Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-white">
                Customer Peer-to-Peer Referral Program
              </h4>
              <Badge variant="purple" size="xs">Live Campaign</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Active reward: <b>$10.00 credit</b> for referrer when invited friend completes first order of $25+.
              Friend receives <b>$10.00 off coupon</b> instantly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Conversion Rate</span>
            <span className="text-sm font-bold text-purple-400">24.8% Activated</span>
          </div>
          <button
            onClick={() => alert("Referral settings: Payout reward $10, Min Order $25. Configuration saved.")}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            Edit Reward Rules
          </button>
        </div>
      </div>

      {/* Coupons Directory & Creation Header */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {['all', 'Active', 'Expired'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Coupons' : tab}
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
                placeholder="Search coupon code or category..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={onOpenCreateCouponModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Create Coupon
            </button>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCoupons.map((cpn) => {
            const usagePercent = Math.min(100, Math.round((cpn.usedCount / cpn.usageLimit) * 100));

            return (
              <div
                key={cpn.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Coupon Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-extrabold text-base text-white tracking-wider bg-slate-950 px-2.5 py-1 rounded-lg border border-purple-500/30 text-purple-300">
                        {cpn.code}
                      </span>
                      <button
                        onClick={() => handleCopy(cpn.code)}
                        className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Badge variant={cpn.status === 'Active' ? 'purple' : 'default'} size="xs">
                      {cpn.status}
                    </Badge>
                  </div>

                  {copiedCode === cpn.code && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1 animate-in fade-in">
                      Copied to clipboard!
                    </span>
                  )}

                  {/* Value Banner */}
                  <div className="mt-4">
                    <p className="text-xl font-extrabold text-white">
                      {cpn.discountType === 'Percentage'
                        ? `${cpn.value}% OFF`
                        : cpn.discountType === 'Free Delivery'
                        ? 'FREE DELIVERY'
                        : `$${cpn.value}.00 FLAT OFF`}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Min order: ${cpn.minOrderValue} • Max cap: ${cpn.maxDiscount}
                    </p>
                  </div>

                  {/* Target & Scope */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-medium text-slate-200">{cpn.applicableCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Audience:</span>
                      <span className="font-medium text-purple-400">{cpn.targetTier}</span>
                    </div>
                  </div>

                  {/* Usage Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Redeemed</span>
                      <span className="font-mono text-white font-semibold">
                        {cpn.usedCount} / {cpn.usageLimit} ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Dates & Status Toggle */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-[10px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Exp: {cpn.expiryDate}</span>
                  </div>

                  <button
                    onClick={() => onToggleCouponStatus(cpn.id)}
                    className="text-[11px] font-bold text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    {cpn.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
