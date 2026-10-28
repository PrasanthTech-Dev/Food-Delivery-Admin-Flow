import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Bike,
  Users,
  CreditCard,
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
  Headphones
} from 'lucide-react';

export default function Sidebar({
  activeModule,
  setActiveModule,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  badgeCounts = {}
}) {
  const modules = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      badge: badgeCounts.pendingOrders || 3,
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    },
    {
      id: 'restaurants',
      label: 'Restaurants',
      icon: UtensilsCrossed,
      badge: badgeCounts.pendingRestaurants || 1,
      badgeColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    },
    {
      id: 'delivery',
      label: 'Delivery',
      icon: Bike,
      badge: badgeCounts.activeRiders || '342 Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      badge: null
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: CreditCard,
      badge: null
    },
    {
      id: 'promotions',
      label: 'Offers',
      icon: Tag,
      badge: '4 Active',
      badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: badgeCounts.openDisputes || 2,
      badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
    },
  ];

  const handleNavClick = (id) => {
    setActiveModule(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-950/95 border-r border-slate-800/80 transition-all duration-300 backdrop-blur-xl ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Flame className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                  Bite<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flow</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Enterprise Admin Flow</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">

          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => handleNavClick(mod.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 group text-left relative cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
                title={isCollapsed ? mod.label : undefined}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between">
                    <span className="truncate font-semibold">{mod.label}</span>
                    {mod.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : mod.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {mod.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/40 hover:bg-slate-900 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white truncate">Arjun MS</p>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
