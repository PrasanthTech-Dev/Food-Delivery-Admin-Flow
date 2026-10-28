import React, { useState } from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, Clock, Zap, Sparkles } from 'lucide-react';

export function RevenueAreaChart({ data, timeRange = '7D', onTimeRangeChange }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeMetric, setActiveMetric] = useState('revenue'); // revenue, orders, commission

  const metricConfigs = {
    revenue: {
      label: 'Gross GMV Revenue',
      prefix: '$',
      suffix: '',
      color: '#3b82f6',
      gradientId: 'areaGradientBlue',
      valueFn: d => d.revenue,
      formatVal: v => `$${v.toLocaleString()}`,
      formatY: v => `$${Math.round(v / 1000)}k`,
    },
    orders: {
      label: 'Order Volume',
      prefix: '',
      suffix: ' orders',
      color: '#06b6d4',
      gradientId: 'areaGradientCyan',
      valueFn: d => d.orders,
      formatVal: v => `${v.toLocaleString()} orders`,
      formatY: v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`,
    },
    commission: {
      label: 'Platform Net Commission',
      prefix: '$',
      suffix: '',
      color: '#10b981',
      gradientId: 'areaGradientEmerald',
      valueFn: d => d.commission || Math.round(d.revenue * 0.18),
      formatVal: v => `$${v.toLocaleString()}`,
      formatY: v => `$${Math.round(v / 1000)}k`,
    },
  };

  const currentConfig = metricConfigs[activeMetric];
  const chartData = data && data.length > 0 ? data : [];
  const rawValues = chartData.map(d => currentConfig.valueFn(d));
  const maxVal = Math.max(...rawValues, 100) * 1.15;
  const minVal = 0;
  const height = 240;
  const width = 640;
  const paddingX = 48;
  const paddingY = 32;

  const getCoordinates = () => {
    if (chartData.length === 0) return [];
    return chartData.map((d, i) => {
      const val = currentConfig.valueFn(d);
      const x = paddingX + (i / Math.max(1, chartData.length - 1)) * (width - 2 * paddingX);
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);
      return { x, y, rawValue: val, ...d };
    });
  };

  const points = getCoordinates();

  // Create smooth Bezier curve SVG path
  const createSplinePath = () => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[0];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSplinePath();
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  // Summary Metrics
  const totalMetric = rawValues.reduce((a, b) => a + b, 0);
  const avgMetric = Math.round(totalMetric / (rawValues.length || 1));
  const peakMetric = Math.max(...rawValues, 0);

  return (
    <div className="w-full">
      {/* Header with Metric Tabs and Timeframe Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Sales & Performance Analytics
            </h4>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-blue-400" />
              <span>Real-Time Platform Operations Live</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time transaction volume, orders, and platform commission settlement trends
          </p>
        </div>

        {/* Time range selector */}
        {onTimeRangeChange && (
          <div className="inline-flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-xl shadow-inner shrink-0">
            {['Today', '7D', '30D', 'YTD'].map((t) => (
              <button
                key={t}
                onClick={() => onTimeRangeChange(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  timeRange === t
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {[
          { id: 'revenue', label: 'Gross Revenue', icon: DollarSign, color: 'text-blue-400' },
          { id: 'orders', label: 'Order Volume', icon: ShoppingBag, color: 'text-cyan-400' },
          { id: 'commission', label: 'Net Commission', icon: TrendingUp, color: 'text-emerald-400' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMetric === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetric(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full aspect-[21/9] min-h-[230px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="areaGradientBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="areaGradientCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="areaGradientEmerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="splineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = height - paddingY - ratio * (height - 2 * paddingY);
            const val = minVal + ratio * (maxVal - minVal);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {currentConfig.formatY(val)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#${currentConfig.gradientId})`} />

          {/* Spline Line */}
          <path
            d={linePath}
            fill="none"
            stroke={currentConfig.color}
            strokeWidth="3"
            filter="url(#splineGlow)"
            strokeLinecap="round"
          />

          {/* Crosshair indicator on hover */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <line
              x1={points[hoveredIdx].x}
              y1={paddingY}
              x2={points[hoveredIdx].x}
              y2={height - paddingY}
              stroke={currentConfig.color}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((pt, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === i ? 6.5 : 4}
                fill="#0f172a"
                stroke={hoveredIdx === i ? '#ffffff' : currentConfig.color}
                strokeWidth={hoveredIdx === i ? 3 : 2}
                className="transition-all duration-150"
              />
              <text
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                fill={hoveredIdx === i ? '#ffffff' : '#94a3b8'}
                fontSize="11"
                fontWeight={hoveredIdx === i ? '700' : '500'}
              >
                {pt.period}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 border border-slate-700/80 rounded-xl px-3.5 py-2 shadow-2xl backdrop-blur-md transition-all duration-150"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${Math.max(12, (points[hoveredIdx].y / height) * 100 - 8)}%`,
            }}
          >
            <div className="text-[11px] font-semibold text-slate-400">
              {points[hoveredIdx].period} Breakdown
            </div>
            <div className="text-sm font-extrabold text-white mt-0.5">
              ${points[hoveredIdx].revenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-300 font-mono">
              <span className="text-cyan-400 font-bold">{points[hoveredIdx].orders.toLocaleString()} orders</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">18% intake</span>
            </div>
          </div>
        )}
      </div>

      {/* Summary KPI Strip under Chart */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Period Total</span>
          <span className="text-sm sm:text-base font-extrabold text-white font-mono mt-0.5 block">
            {currentConfig.formatVal(totalMetric)}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Per Period</span>
          <span className="text-sm sm:text-base font-extrabold text-cyan-400 font-mono mt-0.5 block">
            {currentConfig.formatVal(avgMetric)}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Peak Recorded</span>
          <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono mt-0.5 block">
            {currentConfig.formatVal(peakMetric)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PeakHoursBarChart({ data }) {
  const [activeBar, setActiveBar] = useState(null);
  const [viewMetric, setViewMetric] = useState('orders'); // orders, riders

  const maxVal = Math.max(...data.map(d => viewMetric === 'orders' ? d.orders : d.riders)) * 1.15;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Peak-Hour Statistics & Demand Rush
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Live Heatmap
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Hourly distribution to balance courier fleet allocation and surge multipliers
          </p>
        </div>

        {/* View Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setViewMetric('orders')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMetric === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setViewMetric('riders')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              viewMetric === 'riders'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active Riders
          </button>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="grid grid-cols-9 gap-2 sm:gap-3 items-end h-48 pt-6 pb-2 px-1 border-b border-slate-800/80">
        {data.map((item, idx) => {
          const val = viewMetric === 'orders' ? item.orders : item.riders;
          const heightPercent = Math.max(12, (val / maxVal) * 100);
          const isHighest = item.orders === Math.max(...data.map(d => d.orders));
          const isHovered = activeBar === idx;

          return (
            <div
              key={idx}
              className="flex flex-col items-center h-full justify-end group cursor-pointer relative"
              onMouseEnter={() => setActiveBar(idx)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {/* Tooltip on Hover */}
              {isHovered && (
                <div className="absolute -top-16 z-20 whitespace-nowrap bg-slate-900/95 border border-cyan-500/50 rounded-xl px-3 py-1.5 text-center shadow-2xl backdrop-blur-md pointer-events-none">
                  <p className="text-[10px] text-cyan-400 font-bold uppercase">{item.label}</p>
                  <p className="text-xs font-extrabold text-white">
                    {item.orders.toLocaleString()} orders • {item.riders} couriers
                  </p>
                  <p className="text-[10px] text-amber-400 font-mono mt-0.5">
                    Surge: {item.surge} • ETA: {item.avgDelivery}
                  </p>
                </div>
              )}

              {/* Bar Column */}
              <div
                className={`w-full max-w-[38px] rounded-t-xl transition-all duration-300 relative ${
                  isHighest
                    ? 'bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-300 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40'
                    : isHovered
                    ? 'bg-gradient-to-t from-blue-700 to-blue-400 shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                style={{ height: `${heightPercent}%` }}
              >
                {isHighest && (
                  <span className="absolute -top-5 inset-x-0 text-[9px] text-center font-bold text-cyan-300 animate-pulse tracking-wide">
                    PEAK
                  </span>
                )}
              </div>

              {/* Hour Label */}
              <span className="text-[10px] font-mono text-slate-400 mt-2 text-center group-hover:text-white transition-colors truncate w-full">
                {item.hour.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryDonutProgress({ categories }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const totalGMV = categories.reduce((acc, cat) => {
    const num = parseFloat(cat.sales.replace(/[^0-9.-]+/g, '')) || 0;
    return acc + num;
  }, 0);

  const totalShare = categories.reduce((acc, cat) => acc + (cat.share || 0), 0) || 100;

  // Donut ring geometry constants
  const cx = 120;
  const cy = 120;
  const rOuter = 96;
  const rInner = 66;

  // Polar to Cartesian coordinate converter
  const polarToCartesian = (centerX, centerY, radius, angleInRadians) => ({
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  });

  // Describe SVG donut arc slice
  const describeArc = (startAngle, endAngle, isHovered) => {
    const currentROuter = isHovered ? rOuter + 4 : rOuter;
    const currentRInner = isHovered ? rInner - 2 : rInner;
    const span = endAngle - startAngle;
    const largeArc = span > Math.PI ? 1 : 0;

    const p1Out = polarToCartesian(cx, cy, currentROuter, startAngle);
    const p2Out = polarToCartesian(cx, cy, currentROuter, endAngle);
    const p2In = polarToCartesian(cx, cy, currentRInner, endAngle);
    const p1In = polarToCartesian(cx, cy, currentRInner, startAngle);

    return `M ${p1Out.x.toFixed(2)} ${p1Out.y.toFixed(2)} A ${currentROuter} ${currentROuter} 0 ${largeArc} 1 ${p2Out.x.toFixed(2)} ${p2Out.y.toFixed(2)} L ${p2In.x.toFixed(2)} ${p2In.y.toFixed(2)} A ${currentRInner} ${currentRInner} 0 ${largeArc} 0 ${p1In.x.toFixed(2)} ${p1In.y.toFixed(2)} Z`;
  };

  // Generate slice angles
  let currentAngle = -Math.PI / 2; // Start from top 12 o'clock
  const slices = categories.map((cat, idx) => {
    const angleSpan = (cat.share / totalShare) * 2 * Math.PI;
    const start = currentAngle;
    const end = currentAngle + angleSpan;
    currentAngle = end;
    return { ...cat, idx, start, end };
  });

  const activeCat = hoveredCategory !== null ? categories[hoveredCategory] : null;

  return (
    <div className="w-full flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Top Food Categories
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">Share of total GMV and volume demand</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Category GMV</span>
          <span className="text-xs font-bold text-emerald-400 font-mono">${totalGMV.toLocaleString()}</span>
        </div>
      </div>

      {/* Donut Chart Display */}
      <div className="relative my-2 flex items-center justify-center">
        <svg
          viewBox="0 0 240 240"
          className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible"
        >
          <defs>
            <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Donut Slices */}
          <g filter="url(#donutGlow)">
            {slices.map((slice) => {
              const isHovered = hoveredCategory === slice.idx;
              const pathD = describeArc(slice.start, slice.end, isHovered);
              return (
                <path
                  key={slice.idx}
                  d={pathD}
                  fill={slice.color}
                  stroke="#090d16"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 10px ${slice.color}90)` : 'none',
                    opacity: hoveredCategory === null || isHovered ? 1 : 0.65,
                  }}
                  onMouseEnter={() => setHoveredCategory(slice.idx)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* Center Ring Info Hub */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 max-w-[120px] truncate">
            {activeCat ? activeCat.name.split('&')[0] : 'TOTAL GMV'}
          </span>
          <span className="text-lg sm:text-2xl font-black text-white font-mono mt-0.5">
            {activeCat ? activeCat.sales : `$${totalGMV.toLocaleString()}`}
          </span>
          <span className="text-[11px] font-bold text-emerald-400 mt-0.5">
            {activeCat ? `${activeCat.share}% Share (${activeCat.growth})` : '100% Demand'}
          </span>
        </div>
      </div>

      {/* Category Legend Grid */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {categories.map((cat, idx) => {
          const isHovered = hoveredCategory === idx;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                isHovered
                  ? 'bg-slate-800/90 border-slate-600 shadow-md scale-[1.02]'
                  : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/80 hover:border-slate-700'
              }`}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-semibold text-slate-300 truncate text-[11px]">
                  {cat.name.split('&')[0].trim()}
                </span>
              </div>
              <div className="font-mono text-right shrink-0">
                <span className="font-bold text-white text-[11px]">{cat.share}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
