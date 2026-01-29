import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { MarketTrend } from '@propery-agents/api-client';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';

interface DaysOnMarketChartProps {
  data: MarketTrend[];
  zone: string;
  className?: string;
}

export function DaysOnMarketChart({ data, zone, className }: DaysOnMarketChartProps) {
  const chartData = useMemo(() => {
    const categories = data.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('es-AR', { month: 'short' });
    });

    const daysOnMarket = data.map((d) => d.avgDaysOnMarket);

    // Calculate trend
    const latest = data[data.length - 1]?.avgDaysOnMarket ?? 0;
    const previous = data[data.length - 2]?.avgDaysOnMarket ?? latest;
    const change = previous ? ((latest - previous) / previous) * 100 : 0;

    // Calculate 3-month average vs 3-month prior
    const recentAvg =
      data.slice(-3).reduce((sum, d) => sum + d.avgDaysOnMarket, 0) / Math.min(3, data.length);
    const priorAvg =
      data.slice(-6, -3).reduce((sum, d) => sum + d.avgDaysOnMarket, 0) /
      Math.min(3, data.slice(-6, -3).length || 1);
    const trendDirection =
      recentAvg < priorAvg ? 'improving' : recentAvg > priorAvg ? 'worsening' : 'stable';

    return {
      categories,
      daysOnMarket,
      currentDays: latest,
      change,
      avgDays: Math.round(daysOnMarket.reduce((a, b) => a + b, 0) / daysOnMarket.length),
      trendDirection,
    };
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
      zoom: { enabled: false },
    },
    colors: ['#8b5cf6'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: { colors: '#6b7280', fontSize: '12px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6b7280', fontSize: '12px' },
        formatter: (val: number) => `${val} dias`,
      },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val: number) => `${val} dias` },
    },
    annotations: {
      yaxis: [
        {
          y: chartData.avgDays,
          borderColor: '#f59e0b',
          strokeDashArray: 5,
          label: {
            text: `Promedio: ${chartData.avgDays} dias`,
            style: {
              color: '#fff',
              background: '#f59e0b',
              fontSize: '11px',
            },
            position: 'left',
          },
        },
      ],
    },
  };

  const series = [{ name: 'Dias en Mercado', data: chartData.daysOnMarket }];

  const zoneName = zone.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // For days on market, lower is better, so we invert the icon logic
  const isImproving = chartData.change < 0;
  const TrendIcon = isImproving ? TrendingDown : TrendingUp;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dias en Mercado - {zoneName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tiempo promedio hasta vender/alquilar
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Clock className="h-5 w-5 text-violet-500" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {chartData.currentDays} dias
            </p>
          </div>
          <p
            className={`flex items-center justify-end gap-1 text-sm ${
              isImproving ? 'text-success-600' : 'text-error-600'
            }`}
          >
            <TrendIcon className="h-4 w-4" />
            {chartData.change >= 0 ? '+' : ''}
            {chartData.change.toFixed(1)}% vs mes anterior
          </p>
        </div>
      </div>

      {/* Trend indicator */}
      <div className="mb-4 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
        {chartData.trendDirection === 'improving' ? (
          <>
            <div className="w-2 h-2 rounded-full bg-success-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tendencia: <span className="text-success-600 font-medium">Mejorando</span> - Las
              propiedades se venden/alquilan mas rapido
            </span>
          </>
        ) : chartData.trendDirection === 'worsening' ? (
          <>
            <div className="w-2 h-2 rounded-full bg-error-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tendencia: <span className="text-error-600 font-medium">Empeorando</span> - Las
              propiedades tardan mas en venderse/alquilarse
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tendencia: <span className="font-medium">Estable</span>
            </span>
          </>
        )}
      </div>

      <Chart options={options} series={series} type="area" height={250} />
    </div>
  );
}
