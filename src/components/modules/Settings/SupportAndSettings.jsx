import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  Sliders,
  Headphones,
  Radio,
  Shield,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  MessageSquare,
  Lock,
  Save,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';
import {
  initialDisputes,
  initialDeliveryZones,
  initialAuditLogs
} from '../../../data/mockData';

export default function SupportAndSettings({
  searchQuery = '',
}) {
  const [activeSubTab, setActiveSubTab] = useState('tickets'); // 'tickets', 'zones', 'roles', 'settings', 'audit'

  // Module state
  const [disputes, setDisputes] = useState(initialDisputes);
  const [zones, setZones] = useState(initialDeliveryZones);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketReply, setTicketReply] = useState('');

  // Platform Settings State
  const [platformFee, setPlatformFee] = useState('2.50');
  const [defaultCommission, setDefaultCommission] = useState('18');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const subTabs = [
    { id: 'tickets', label: 'Support & Disputes', count: disputes.filter(d => d.status !== 'Resolved').length, icon: Headphones },
    { id: 'zones', label: 'Delivery Zones & Surge', count: zones.length, icon: Radio },
    { id: 'roles', label: 'Admin Roles & Access', count: 4, icon: Shield },
    { id: 'settings', label: 'Platform Engine Settings', count: null, icon: Sliders },
    { id: 'audit', label: 'Immutable Audit Logs', count: auditLogs.length, icon: Activity },
  ];

  const handleResolveTicket = (ticketId) => {
    setDisputes(disputes.map(d => d.id === ticketId ? { ...d, status: 'Resolved' } : d));
    setSelectedTicket(null);
  };

  const handleUpdateSurge = (zoneId, newMultiplier) => {
    setZones(zones.map(z => z.id === zoneId ? { ...z, surgeMultiplier: parseFloat(newMultiplier) } : z));
  };

  const handleSavePlatformSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Support Tickets & Dispute Resolution */}
      {activeSubTab === 'tickets' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  Customer & Courier Support Desk
                  <Badge variant="primary" size="xs">Live SLA: 4m</Badge>
                </h4>
                <p className="text-xs text-slate-400">Manage reported order issues, missing items, and deliver disputes</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Ticket ID</th>
                    <th className="py-3 px-3">Order Ref</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Issue Category</th>
                    <th className="py-3 px-3">Priority</th>
                    <th className="py-3 px-3">Assigned Agent</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {disputes.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-blue-400">
                        {ticket.id}
                        <span className="block text-[10px] text-slate-500 font-normal">{ticket.createdAt}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300 font-medium">{ticket.orderId}</td>
                      <td className="py-3 px-3 font-semibold text-white">{ticket.customer}</td>
                      <td className="py-3 px-3 text-slate-200">{ticket.type}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ticket.priority === 'Urgent'
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                              : ticket.priority === 'High'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{ticket.assignedTo}</td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            ticket.status === 'Resolved'
                              ? 'success'
                              : ticket.status === 'Under Review'
                              ? 'warning'
                              : 'primary'
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="px-3 py-1 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ticket Resolution Drawer / Card */}
          {selectedTicket && (
            <div className="glass-card rounded-2xl p-5 border border-blue-500/40 space-y-4 animate-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Resolving {selectedTicket.id} — {selectedTicket.type}
                  </h4>
                  <p className="text-xs text-slate-400">Order: {selectedTicket.orderId} • Customer: {selectedTicket.customer}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Issue Details</span>
                {selectedTicket.details}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Customer Resolution Message
                </label>
                <textarea
                  rows="2"
                  value={ticketReply}
                  onChange={(e) => setTicketReply(e.target.value)}
                  placeholder="e.g. We have reviewed your case and credited $10 to your wallet. We apologize for the inconvenience."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleResolveTicket(selectedTicket.id)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Mark as Resolved & Notify Customer
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Delivery Zones & Surge Pricing Multipliers */}
      {activeSubTab === 'zones' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white">Delivery Geofences & Dynamic Surge Rates</h4>
              <p className="text-xs text-slate-400">Configure base fares, distance thresholds, and surge pricing multipliers per zone</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400">{zone.polygonCode}</span>
                    <h5 className="text-sm font-bold text-white">{zone.name}</h5>
                  </div>
                  <Badge variant={zone.surgeMultiplier > 1.0 ? 'warning' : 'success'} size="xs">
                    {zone.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Base Delivery Fee</span>
                    <span className="font-mono font-bold text-white">${zone.baseFee}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Min Distance</span>
                    <span className="font-mono font-bold text-white">{zone.minDistanceKm} km</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Active Couriers</span>
                    <span className="font-mono font-bold text-emerald-400">{zone.activeRiders}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">Surge Pricing Multiplier</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {zone.surgeMultiplier}x Base Fare
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.1"
                    value={zone.surgeMultiplier}
                    onChange={(e) => handleUpdateSurge(zone.id, e.target.value)}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Admin Roles & Access Management */}
      {activeSubTab === 'roles' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white">Role-Based Access Control (RBAC)</h4>
              <p className="text-xs text-slate-400">Configure permission sets for management staff, dispatchers, and finance agents</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { role: 'Super Admin', users: 2, perms: 'Full Root Privileges, Financial Authorizations, System Config', color: 'border-blue-500/40 text-blue-400' },
              { role: 'Fleet Dispatcher', users: 8, perms: 'Live Order Management, Rider Assignment, Zone Surge Control', color: 'border-cyan-500/40 text-cyan-400' },
              { role: 'Finance Controller', users: 4, perms: 'Disbursements, Merchant Settlements, Tax Export, Refunds', color: 'border-emerald-500/40 text-emerald-400' },
              { role: 'Customer Support Lead', users: 16, perms: 'Ticket Dispute Resolution, Customer Complaints, Vouchers', color: 'border-purple-500/40 text-purple-400' },
            ].map((r, idx) => (
              <div key={idx} className={`p-4 rounded-xl bg-slate-900/60 border ${r.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-white">{r.role}</h5>
                  <span className="text-xs font-mono font-semibold text-slate-400">{r.users} Users</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{r.perms}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => alert(`Permissions for ${r.role} saved.`)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    Edit Policy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Platform Engine Settings */}
      {activeSubTab === 'settings' && (
        <form onSubmit={handleSavePlatformSettings} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-base font-bold text-white">Global Platform Configuration</h4>
              <p className="text-xs text-slate-400">Core operational switches, dispatch algorithms, and statutory tax parameters</p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Settings updated!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Default Platform Service Fee ($)
              </label>
              <input
                type="number"
                step="0.10"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Charged on every consumer checkout</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Baseline Restaurant Commission (%)
              </label>
              <input
                type="number"
                value={defaultCommission}
                onChange={(e) => setDefaultCommission(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:border-blue-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Default rate for new restaurant signups</span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">Automated Courier Dispatch Engine</span>
                <span className="text-[11px] text-slate-400">Auto-assign orders to nearest idle courier based on distance & ETA</span>
              </div>
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-white block">Platform Maintenance Mode</span>
                <span className="text-[11px] text-slate-400">Suspend public order placements for scheduled infrastructure upgrades</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-0 cursor-pointer"
              />
            </label>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Platform Configuration
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: Immutable Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white">System Security & Operational Audit Log</h4>
              <p className="text-xs text-slate-400">Chronological trail of admin actions, parameter changes, and batch releases</p>
            </div>
            <button
              onClick={() => alert("Audit log synchronized with AWS S3 cold vault.")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Vault
            </button>
          </div>

          <div className="divide-y divide-slate-800/70">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-400 font-bold">{log.id}</span>
                    <span className="font-bold text-white">{log.actor}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-emerald-400">{log.action}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-mono">{log.target}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400 block">{log.time}</span>
                  <span className="text-[10px] text-slate-500 font-mono">IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
