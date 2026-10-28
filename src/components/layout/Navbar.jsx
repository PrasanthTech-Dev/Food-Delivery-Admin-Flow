import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  Plus,
  Radio,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar({
  activeModule,
  onOpenMobileSidebar,
  notifications = [],
  onOpenQuickAction,
  onRefresh,
  isRefreshing,
  searchQuery,
  setSearchQuery,
  onOpenNotifications
}) {
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const moduleTitles = {
    dashboard: 'Dashboard & Platform Analytics',
    orders: 'Live Order Management & Dispatch',
    restaurants: 'Restaurant Partners & Menu Directory',
    delivery: 'Delivery Partner Fleet & Live GPS',
    customers: 'Customer Directory & Accounts',
    finance: 'Financial Overview & Payout Settlements',
    promotions: 'Discount Campaigns & Coupons',
    settings: 'Platform Settings & Audit Logs',
  };

  const mobileTitles = {
    dashboard: 'Overview',
    orders: 'Orders',
    restaurants: 'Restaurants',
    delivery: 'Delivery',
    customers: 'Customers',
    finance: 'Finance',
    promotions: 'Offers',
    settings: 'Settings',
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="shrink-0 sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 w-full">
      {/* MOBILE VIEW (< md): Exact layout matching reference image */}
      <div className="md:hidden flex flex-col w-full">
        {/* Mobile Top Row: Hamburger (Left), Overview Title (Center), Avatar (Right) */}
        <div className="flex items-center justify-between px-4 h-14 w-full">
          {/* Left: Mobile hamburger */}
          <button
            onClick={onOpenMobileSidebar}
            className="p-1.5 -ml-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6 stroke-[2.3]" />
          </button>

          {/* Center: Title (Overview) */}
          <h1 className="text-lg font-bold text-white tracking-tight text-center">
            {mobileTitles[activeModule] || 'Overview'}
          </h1>

          {/* Right: Admin Avatar with cyan ring */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/70 shadow-sm cursor-pointer"
              onClick={onOpenMobileSidebar}
            />
          </div>
        </div>

        {/* Mobile Bottom Row: Full-width Search Bar */}
        <div className="px-4 pb-3 pt-0.5">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for something"
              className="w-full bg-[#0c1424] border border-slate-800/90 focus:border-cyan-500 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW (>= md): Full admin command bar */}
      <div className="hidden md:flex items-center justify-between h-18 px-6 gap-4 w-full">
        {/* Left: Breadcrumbs & Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-blue-400">Admin</span>
            <span>/</span>
            <span className="capitalize text-slate-300 truncate">{activeModule}</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
            {moduleTitles[activeModule] || 'Dashboard'}
          </h1>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, restaurants, riders, customers..."
              className="w-full bg-slate-900/80 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-12 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all cursor-pointer ${
              isRefreshing ? 'animate-spin text-blue-400' : ''
            }`}
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">System Notifications</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {unreadCount} New
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        n.unread
                          ? 'bg-blue-950/20 border-blue-500/30'
                          : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-slate-400 mt-1 text-[11px] leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-center">
                  <span className="text-xs text-slate-400">All services operational</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={onOpenQuickAction}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Action</span>
          </button>
        </div>
      </div>
    </header>
  );
}
