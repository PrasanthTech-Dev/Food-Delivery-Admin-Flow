import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  Users,
  Search,
  Star,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Eye,
  Shield,
  Award,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function CustomerList({
  customers,
  onOpenCustomerModal,
  onToggleCustomerStatus,
  searchQuery = '',
}) {
  const [filterTier, setFilterTier] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || searchQuery).toLowerCase();

  const filteredCustomers = customers.filter(c => {
    if (filterTier === 'VIP' && !c.tier.includes('VIP')) return false;
    if (filterTier === 'Active' && c.status !== 'Active') return false;
    if (filterTier === 'Flagged' && c.status !== 'Flagged') return false;

    if (effectiveSearch) {
      const matchName = c.name.toLowerCase().includes(effectiveSearch);
      const matchEmail = c.email.toLowerCase().includes(effectiveSearch);
      const matchPhone = c.phone.toLowerCase().includes(effectiveSearch);
      return matchName || matchEmail || matchPhone;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Customer KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Total Registered Users</span>
          <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">94,230 Users</p>
          <span className="text-[11px] text-blue-400">+1,420 this week</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">VIP / Platinum Tier</span>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-1">8,410 Members</p>
          <span className="text-[11px] text-amber-300">Highest LTV cohort</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Avg Retention Rate</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">68.4%</p>
          <span className="text-[11px] text-emerald-300">Repeat monthly buyers</span>
        </div>
        <div className="glass-card rounded-xl p-4 border border-slate-800">
          <span className="text-xs font-semibold text-slate-400">Flagged Accounts</span>
          <p className="text-xl sm:text-2xl font-extrabold text-rose-400 mt-1">
            {customers.filter(c => c.status === 'Flagged').length} Users
          </p>
          <span className="text-[11px] text-rose-300">High refund frequency</span>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'Active', 'VIP', 'Flagged'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTier(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterTier === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Customers' : tab}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search customer email, phone, name..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Customer Profile</th>
                <th className="py-3 px-3">Membership Tier</th>
                <th className="py-3 px-3">Orders Count</th>
                <th className="py-3 px-3">Lifetime Spend</th>
                <th className="py-3 px-3">Disputes / Claims</th>
                <th className="py-3 px-3">Account Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                          {cust.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{cust.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        cust.tier.includes('VIP')
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : cust.tier.includes('Gold')
                          ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      {cust.tier}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <p className="font-bold text-white font-mono">{cust.totalOrders} Orders</p>
                    <span className="text-[10px] text-slate-500">Joined {cust.joinedDate}</span>
                  </td>

                  <td className="py-3 px-3">
                    <p className="font-bold text-emerald-400 font-mono">{cust.lifetimeSpend}</p>
                    <span className="text-[10px] text-slate-500">{cust.loyaltyPoints} pts</span>
                  </td>

                  <td className="py-3 px-3">
                    {cust.complaintsCount > 0 ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {cust.complaintsCount} Claims
                      </span>
                    ) : (
                      <span className="text-slate-500">None (Clean)</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        cust.status === 'Active'
                          ? 'success'
                          : cust.status === 'Flagged'
                          ? 'danger'
                          : 'default'
                      }
                    >
                      {cust.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenCustomerModal(cust)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="View Full Profile & Address Book"
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
