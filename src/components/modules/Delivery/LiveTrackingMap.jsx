import React, { useState } from 'react';
import Badge from '../../common/Badge';
import {
  Bike,
  Navigation,
  MapPin,
  Compass,
  Radio,
  Zap,
  Shield,
  Layers,
  Crosshair
} from 'lucide-react';

export default function LiveTrackingMap({
  riders = [],
  selectedRider,
  onSelectRider,
}) {
  const [mapMode, setMapMode] = useState('heat'); // 'satellite', 'heat', 'fleet'

  // Map rider pins to visual relative percentages inside the dark radar grid
  const riderPositions = [
    { id: 'RID-104', x: 42, y: 38, speed: '24 km/h', heading: 'NE 45°', order: 'ORD-9428', eta: '8m' },
    { id: 'RID-088', x: 68, y: 28, speed: '0 km/h (idle)', heading: 'Idle', order: null, eta: '-' },
    { id: 'RID-112', x: 28, y: 64, speed: '19 km/h', heading: 'SW 210°', order: null, eta: '-' },
    { id: 'RID-129', x: 55, y: 75, speed: '0 km/h', heading: 'Pending Docs', order: null, eta: '-' },
    { id: 'RID-075', x: 82, y: 60, speed: '0 km/h', heading: 'Offline', order: null, eta: '-' },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            Fleet GPS Radar
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              (Live Telemetry 10Hz)
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 hidden md:inline">Simulation Layers:</span>
          {['fleet', 'routes', 'zones'].map((mode) => (
            <button
              key={mode}
              onClick={() => setMapMode(mode)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                mapMode === mode
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Canvas with Grid Lines and Radar Elements */}
      <div className="relative w-full aspect-[16/9] min-h-[340px] max-h-[460px] bg-[#070b14] overflow-hidden flex items-center justify-center">
        {/* Animated Radar Sweep Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none" />

        {/* Futuristic Map Grid */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800/40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.8" />
            </pattern>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Concentric radar circles */}
          <circle cx="50%" cy="50%" r="120" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="220" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="6 6" />

          {/* Active Delivery Route Polyline for ORD-9428 */}
          {mapMode !== 'zones' && (
            <g>
              {/* Route Path: Restaurant (25, 30) -> Courier (42, 38) -> Customer (62, 50) */}
              <polyline
                points="180,120 300,160 480,240"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              {/* Restaurant Origin Node */}
              <circle cx="180" cy="120" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text x="180" y="105" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">
                Truffle Bistro (Pick-up)
              </text>

              {/* Customer Destination Node */}
              <circle cx="480" cy="240" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="480" y="260" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                Sophia R. (Drop-off)
              </text>
            </g>
          )}

          {/* High Demand Geofence Zone Overlay */}
          {mapMode === 'zones' && (
            <polygon
              points="200,80 420,100 480,280 260,260"
              fill="rgba(59, 130, 246, 0.12)"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* Dynamic Rider Pins */}
        {riderPositions.map((pin) => {
          const rider = riders.find(r => r.id === pin.id) || { name: pin.id, status: 'Online' };
          const isSelected = selectedRider?.id === pin.id;

          const getPinColor = () => {
            if (rider.status === 'On Delivery') return 'bg-cyan-500 ring-cyan-400';
            if (rider.status === 'Online') return 'bg-emerald-500 ring-emerald-400';
            if (rider.status === 'Pending Verification') return 'bg-amber-500 ring-amber-400';
            return 'bg-slate-600 ring-slate-500';
          };

          return (
            <div
              key={pin.id}
              onClick={() => onSelectRider(rider)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* Pulse ripple if active delivery */}
              {rider.status === 'On Delivery' && (
                <div className="absolute -inset-2 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
              )}

              {/* Pin Icon */}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center text-white ring-2 shadow-lg transition-transform group-hover:scale-125 ${getPinColor()} ${
                  isSelected ? 'scale-125 ring-white shadow-cyan-500/50' : ''
                }`}
              >
                <Bike className="w-4 h-4" />
              </div>

              {/* Hover Badge Pill */}
              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-white pointer-events-none shadow-md">
                {rider.name?.split(' ')[0]} • {pin.speed}
              </div>
            </div>
          );
        })}

        {/* Selected Courier Live Telemetry Box (Bottom Left) */}
        {selectedRider && (
          <div className="absolute bottom-3 left-3 z-20 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-xl max-w-xs animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between gap-3 text-xs mb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-cyan-400" />
                {selectedRider.name}
              </span>
              <Badge variant={selectedRider.status === 'On Delivery' ? 'cyan' : 'success'} size="xs">
                {selectedRider.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-400 block text-[9px]">Vehicle</span>
                <span className="font-medium">{selectedRider.vehicleType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">Rating</span>
                <span className="font-bold text-amber-400">★ {selectedRider.rating}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">Acceptance</span>
                <span className="font-medium text-emerald-400">{selectedRider.acceptanceRate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">Current Order</span>
                <span className="font-mono text-cyan-400">{selectedRider.currentOrder || 'None'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Map Legend Overlay (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-20 hidden sm:flex items-center gap-3 p-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-[10px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>On Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Online (Ready)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
