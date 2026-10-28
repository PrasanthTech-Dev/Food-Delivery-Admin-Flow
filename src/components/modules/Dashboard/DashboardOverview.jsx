import React, { useState } from 'react';
import StatCard from '../../common/StatCard';
import Badge from '../../common/Badge';
import {
  RevenueAreaChart,
  PeakHoursBarChart,
  CategoryDonutProgress
} from '../../common/InteractiveChart';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  Bike,
  Utensils,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Eye,
  CheckCircle,
  CheckCircle2,
  Flame,
  ShieldCheck,
  Star,
  Activity,
  ChevronRight,
  Filter,
  CreditCard
} from 'lucide-react';
import {
  timeframeRevenueData,
  revenueChartData,
  peakHourData,
  foodCategoriesData,
  sparklineStats
} from '../../../data/mockData';

export default function DashboardOverview({
  stats,
  orders = [],
  onViewOrder,
  onNavigateModule,
}) {
  const [timeRange, setTimeRange] = useState('7D');
  const [activityFilter, setActivityFilter] = useState('all');

  const currentChartData = timeframeRevenueData[timeRange] || revenueChartData;

  // Real-time activity feed with category tags
  const rawActivities = [
    {
      id: 'ACT-1',
      title: 'High-Value Gourmet Order',
      desc: 'Sophia Reynolds placed order for Truffle Wagyu Burgers ($73.09)',
      time: '6 mins ago',
      category: 'order',
      badge: 'Active Delivery',
      badgeVariant: 'primary',
      orderId: 'ORD-9428',
      amount: '$73.09',
    },
    {
      id: 'ACT-2',
      title: 'Kitchen Verified & Onboarded',
      desc: 'Sweet Craving Patisserie verified & published to live marketplace',
      time: '24 mins ago',
      category: 'restaurant',
      badge: 'Approved',
      badgeVariant: 'success',
      amount: 'FSSAI A+',
    },
    {
      id: 'ACT-3',
      title: 'Courier Milestone Completed',
      desc: 'Marcus Vance completed delivery #1,840 with 4.94 rating',
      time: '48 mins ago',
      category: 'rider',
      badge: 'Top Tier',
      badgeVariant: 'cyan',
      amount: '★ 4.94',
    },
    {
      id: 'ACT-4',
      title: 'Customer Refund Claim',
      desc: 'Jessica Taylor opened dispute on ORD-9424 ($52.99)',
      time: '1h ago',
      category: 'alert',
      badge: 'Review Pending',
      badgeVariant: 'danger',
      orderId: 'ORD-9424',
      amount: '$52.99',
    },
    {
      id: 'ACT-5',
      title: 'Surge Pricing Auto-Engaged',
      desc: 'Downtown Zone 01 surged to 1.4x due to dinner traffic peak',
      time: '2h ago',
      category: 'alert',
      badge: '1.4x Surge',
      badgeVariant: 'warning',
      amount: 'Zone 01',
    },
    {
      id: 'ACT-6',
      title: 'Weekly Payout Batch Processed',
      desc: 'Automated settlement of $184,200 issued to 142 partner restaurants',
      time: '3h ago',
      category: 'order',
      badge: 'Settled',
      badgeVariant: 'success',
      amount: '$184.2k',
    },
  ];

  const filteredActivities = rawActivities.filter(act => {
    if (activityFilter === 'all') return true;
    return act.category === activityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Command Banner with Platform Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
        <div className="absolute -right-8 -bottom-8 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Food Delivery Command Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Real-time platform analytics monitoring 814 restaurant kitchens, 342 active couriers, and processing over $284,000 weekly gross merchandise volume.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateModule('orders')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Dispatch Queue
            </button>
            <button
              onClick={() => onNavigateModule('delivery')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              <Bike className="w-4 h-4 text-emerald-400" />
              Live Fleet Map
            </button>
            <button
              onClick={() => onNavigateModule('finance')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              Settlements
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Stat Cards with embedded mini sparkline graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Gross Revenue"
          value={`$${Math.round(stats.totalRevenue).toLocaleString()}`}
          change={stats.revenueChange}
          changeLabel="vs last week"
          icon={DollarSign}
          accentColor="blue"
          sparklineData={sparklineStats.revenue}
          onClick={() => onNavigateModule('finance')}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersChange}
          changeLabel="vs last week"
          icon={ShoppingBag}
          accentColor="cyan"
          sparklineData={sparklineStats.orders}
          onClick={() => onNavigateModule('orders')}
        />
        <StatCard
          title="Active Consumers"
          value={stats.activeUsers.toLocaleString()}
          change={stats.usersChange}
          changeLabel="monthly active"
          icon={Users}
          accentColor="purple"
          sparklineData={sparklineStats.users}
          onClick={() => onNavigateModule('customers')}
        />
        <StatCard
          title="Avg Dispatch Time"
          value={stats.avgDeliveryTime}
          change={stats.deliveryTimeChange}
          changeLabel="faster response"
          icon={Clock}
          accentColor="emerald"
          sparklineData={sparklineStats.deliveryTime}
          onClick={() => onNavigateModule('delivery')}
        />
      </div>

      {/* Secondary Fast Operational Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => onNavigateModule('delivery')}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Riders Online</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              {stats.activeCouriersOnRoad || 284}
            </span>
            <span className="text-[11px] text-slate-400">of 342 fleet</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">83% courier utilization</p>
        </div>

        <div
          onClick={() => onNavigateModule('restaurants')}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Open Kitchens</span>
            <Utensils className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono">
              {stats.activeRestaurants}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">Active</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Accepting live delivery orders</p>
        </div>

        <div
          onClick={() => onNavigateModule('finance')}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Avg Ticket Size</span>
            <DollarSign className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
              ${stats.avgOrderValue || '42.80'}
            </span>
            <span className="text-[11px] text-cyan-400 font-semibold">+4.2%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Per completed order basket</p>
        </div>

        <div
          onClick={() => onNavigateModule('settings')}
          className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Customer Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
              ★ {stats.customerSatisfaction || '4.88'}
            </span>
            <span className="text-[11px] text-slate-400">99.2% OK</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Based on 14,200 reviews</p>
        </div>
      </div>

      {/* Main Performance Charts Row: Spline Area Chart + Category GMV Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Spline Chart (2 cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <RevenueAreaChart
            data={currentChartData}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>

        {/* Top Food Categories Share (1 col) */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <CategoryDonutProgress categories={foodCategoriesData} />
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="text-[11px]">Aggregated across 32 delivery hubs</span>
            <button
              onClick={() => onNavigateModule('restaurants')}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              Catalog Directory <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Peak Hours Heatmap + Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peak Hours Statistics (2 cols) */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <PeakHoursBarChart data={peakHourData} />

          {/* Rush Hour Insights Strip */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Highest Demand Hour
              </span>
              <p className="text-xs font-bold text-white mt-1">
                08:00 PM (1,280 Orders)
              </p>
              <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">
                Dinner Prime Peak • 1.4x Surge
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Peak Avg Ticket
              </span>
              <p className="text-xs font-bold text-emerald-400 mt-1">
                $48.50 Average
              </p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                +24% larger basket size
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Courier Allocation
              </span>
              <p className="text-xs font-bold text-cyan-400 mt-1">
                92% Fleet Utilization
              </p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                310 active couriers on road
              </span>
            </div>
          </div>
        </div>

        {/* Live Recent Activity Feed (1 col) */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  Recent Activities
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                </h4>
                <p className="text-xs text-slate-400">Live operational events stream</p>
              </div>

              <button
                onClick={() => onNavigateModule('settings')}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Audit Log
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 mb-3.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'order', label: 'Orders' },
                { id: 'restaurant', label: 'Kitchens' },
                { id: 'rider', label: 'Couriers' },
                { id: 'alert', label: 'Alerts' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActivityFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activityFilter === f.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Activity Items List */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors truncate">
                          {act.title}
                        </p>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                          {act.amount}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {act.desc}
                      </p>
                    </div>
                    <Badge variant={act.badgeVariant} size="xs">
                      {act.badge}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {act.time}
                    </span>
                    {act.orderId && (
                      <button
                        onClick={() => onViewOrder(act.orderId)}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 mt-3 text-center">
            <span className="text-[11px] text-slate-500">
              Auto-sync enabled • Updating in real-time
            </span>
          </div>
        </div>
      </div>

      {/* Platform Delivery Funnel & Service Health Summary */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Live Order Fulfillment & Dispatch Pipeline
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              End-to-end customer journey progression from checkout to doorstep handover
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span>99.2% On-Time Delivery Rate</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 relative">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">1. Order Placed</span>
              <span className="text-[10px] font-mono text-blue-400 font-bold">100%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-blue-500 h-full w-full" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">18,420 orders ingested</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 relative">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">2. Kitchen Prep</span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">99.6%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-cyan-500 h-full w-[99.6%]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Avg prep time: 14.2 min</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 relative">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">3. Transit & Route</span>
              <span className="text-[10px] font-mono text-purple-400 font-bold">99.1%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-purple-500 h-full w-[99.1%]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Avg distance: 4.2 km</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 relative">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">4. Handover</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">98.8%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-500 h-full w-[98.8%]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Contactless & OTP verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
