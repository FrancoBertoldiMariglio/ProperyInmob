import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { MarketTrend } from '@propery-agents/api-client';
import { Building2, Plus, ShoppingBag } from 'lucide-react';

interface SupplyChartProps {
  data: MarketTrend[];
  className?: string;
}

export function SupplyChart({ data, className }: SupplyChartProps) {
  const chartData = useMemo(() => {
    const categories = data.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('es-AR', { month: 'short' });
    });

    const totalListings = data.map((d) => d.totalListings);
    const newListings = data.map((d) => d.newListings);
    const soldProperties = data.map((d) => d.soldProperties);

    // Get latest stats
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];

    const listingsChange = previous
      ? ((latest.totalListings - previous.totalListings) / previous.totalListings) * 100
      : 0;

    return {
      categories,
      totalListings,
      newListings,
      soldProperties,
      currentListings: latest?.totalListings ?? 0,
      currentNew: latest?.newListings ?? 0,
      currentSold: latest?.soldProperties ?? 0,
      listingsChange,
    };
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    colors: ['#0ea5e9', '#22c55e', '#f59e0b'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
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
      },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: '#6b7280' },
      markers: { size: 6 },
    },
    tooltip: {
      theme: 'light',
      shared: true,
      intersect: false,
    },
  };

  const series = [
    { name: 'Publicaciones Activas', data: chartData.totalListings },
    { name: 'Nuevas Publicaciones', data: chartData.newListings },
    { name: 'Vendidas/Alquiladas', data: chartData.soldProperties },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Oferta del Mercado
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Publicaciones activas y movimiento
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3 text-center">
          <Building2 className="h-5 w-5 text-sky-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {chartData.currentListings}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Activas</p>
          <p
            className={`text-xs ${chartData.listingsChange >= 0 ? 'text-success-600' : 'text-error-600'}`}
          >
            {chartData.listingsChange >= 0 ? '+' : ''}
            {chartData.listingsChange.toFixed(1)}%
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <Plus className="h-5 w-5 text-green-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">{chartData.currentNew}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Nuevas este mes</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
          <ShoppingBag className="h-5 w-5 text-amber-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900 dark:text-white">{chartData.currentSold}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Vendidas/Alquiladas</p>
        </div>
      </div>

      <Chart options={options} series={series} type="bar" height={280} />
    </div>
  );
}
