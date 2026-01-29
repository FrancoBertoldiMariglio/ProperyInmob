import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, formatCurrency, formatNumber } from '@propery-agents/config';
import type { KPI } from '@propery-agents/api-client';

interface KPICardProps {
  kpi: KPI;
  icon: React.ReactNode;
  className?: string;
}

export function KPICard({ kpi, icon, className }: KPICardProps) {
  const { label, value, change, changeType, format, currency, sparklineData } = kpi;

  // Format the main value
  const formattedValue = (() => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, currency || 'USD');
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return formatNumber(value);
    }
  })();

  // Change indicator
  const changeColor = {
    increase: 'text-success-600',
    decrease: 'text-error-600',
    neutral: 'text-gray-500',
  }[changeType || 'neutral'];

  const ChangeIcon = {
    increase: TrendingUp,
    decrease: TrendingDown,
    neutral: Minus,
  }[changeType || 'neutral'];

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formattedValue}</p>

          {change !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-sm', changeColor)}>
              <ChangeIcon className="w-4 h-4" />
              <span className="font-medium">
                {change > 0 ? '+' : ''}
                {change.toFixed(1)}%
              </span>
              <span className="text-gray-500 dark:text-gray-400">vs mes anterior</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
          {icon}
        </div>
      </div>

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-4">
          <Sparkline data={sparklineData} changeType={changeType} />
        </div>
      )}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  changeType?: 'increase' | 'decrease' | 'neutral';
}

function Sparkline({ data, changeType }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const height = 40;
  const width = 100;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Create area path
  const areaD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  const strokeColor = {
    increase: '#16a34a',
    decrease: '#dc2626',
    neutral: '#6b7280',
  }[changeType || 'neutral'];

  const fillColor = {
    increase: 'rgba(22, 163, 74, 0.1)',
    decrease: 'rgba(220, 38, 38, 0.1)',
    neutral: 'rgba(107, 114, 128, 0.1)',
  }[changeType || 'neutral'];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10" preserveAspectRatio="none">
      <path d={areaD} fill={fillColor} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
