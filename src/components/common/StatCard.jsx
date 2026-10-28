import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  accentColor = 'blue',
  sparklineData = [],
  onClick,
}) {
  const isPositive = typeof change === 'number' ? change >= 0 : !String(change).startsWith('-');

  const colorStyles = {
    blue: {
      borderHover: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
      iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      stroke: '#3b82f6',
      bgGlow: 'bg-blue-500/10',
    },
    cyan: {
      borderHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      stroke: '#06b6d4',
      bgGlow: 'bg-cyan-500/10',
    },
    emerald: {
      borderHover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      stroke: '#10b981',
      bgGlow: 'bg-emerald-500/10',
    },
    amber: {
      borderHover: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
      iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      stroke: '#f59e0b',
      bgGlow: 'bg-amber-500/10',
    },
    purple: {
      borderHover: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      stroke: '#8b5cf6',
      bgGlow: 'bg-purple-500/10',
    },
  };

  const style = colorStyles[accentColor] || colorStyles.blue;

  // Render mini smooth spline chart with area gradient fill
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;
    const w = 96;
    const h = 30;
    const padX = 3;
    const padY = 4;
    const usableW = w - padX * 2;
    const usableH = h - padY * 2;

    const points = sparklineData.map((val, idx) => ({
      x: padX + (idx / (sparklineData.length - 1)) * usableW,
      y: padY + (1 - (val - min) / range) * usableH,
    }));

    // Smooth cubic bezier spline
    let pathD = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) * 0.25;
      const cp1y = p1.y + (p2.y - p0.y) * 0.25;
      const cp2x = p2.x - (p3.x - p1.x) * 0.25;
      const cp2y = p2.y - (p3.y - p1.y) * 0.25;

      pathD += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    const lastPoint = points[points.length - 1];
    const areaD = `${pathD} L ${lastPoint.x.toFixed(1)},${h} L ${points[0].x.toFixed(1)},${h} Z`;
    const gradId = `spark-grad-${accentColor}-${(title || 'stat').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`;

    return (
      <svg
        className="w-19 sm:w-22 xl:w-24 h-7 sm:h-8 overflow-visible shrink-0"
        viewBox={`0 0 ${w} ${h}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={style.stroke} stopOpacity="0.38" />
            <stop offset="100%" stopColor={style.stroke} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Translucent Area Gradient */}
        <path d={areaD} fill={`url(#${gradId})`} />

        {/* Smooth Curving Trend Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={style.stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-[2.6]"
        />

        {/* Outer Pulsing Glow */}
        <circle
          cx={lastPoint.x.toFixed(1)}
          cy={lastPoint.y.toFixed(1)}
          r="4.5"
          fill={style.stroke}
          opacity="0.3"
        />

        {/* Crisp Latest Point Highlight */}
        <circle
          cx={lastPoint.x.toFixed(1)}
          cy={lastPoint.y.toFixed(1)}
          r="2.2"
          fill="#ffffff"
          stroke={style.stroke}
          strokeWidth="1.6"
        />
      </svg>
    );
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden glass-card rounded-2xl p-5 border border-slate-800 transition-all duration-300 ${
        style.borderHover
      } hover:-translate-y-0.5 shadow-lg ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Subtle Ambient Glow in background */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${style.bgGlow} blur-2xl pointer-events-none`}
      />

      {/* Header: Title + Icon */}
      <div className="flex items-start justify-between relative z-10">
        <div className="min-w-0 flex-1 pr-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 leading-tight min-h-[30px] flex items-center">
            {title}
          </p>
          <h4
            title={typeof value === 'string' ? value : String(value)}
            className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight whitespace-nowrap"
          >
            {value}
          </h4>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${style.iconBg} shadow-inner shrink-0 ml-2`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>

      {/* Footer: Trend Badge & Label on Left, Cleanly Aligned Sparkline Chart on Right */}
      <div className="mt-4 flex items-center justify-between gap-1.5 pt-3 border-t border-slate-800/80 relative z-10">
        {change !== undefined && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                isPositive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline shrink-0" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline shrink-0" />
              )}
              {isPositive ? `+${change}%` : `${change}%`}
            </span>
            <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap shrink-0">
              {changeLabel}
            </span>
          </div>
        )}
        {sparklineData && sparklineData.length > 1 && (
          <div className="shrink-0 ml-auto flex items-center justify-end">
            {renderSparkline()}
          </div>
        )}
      </div>
    </div>
  );
}
