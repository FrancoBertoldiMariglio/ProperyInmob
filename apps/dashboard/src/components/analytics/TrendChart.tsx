import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { MarketTrend } from '@propery-agents/api-client';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendChartProps {
  data: MarketTrend[];
  zone: string;
  showRent?: boolean;
  className?: string;
}

export function TrendChart({ data, zone, showRent = true, className }: TrendChartProps) {
  const chartData = useMemo(() => {
    const categories = data.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('es-AR', { month: 'short', year: '2-digit' });
    });

    const salePrices = data.map((d) => d.avgPricePerSqm);
    const rentPrices = data.map((d) => d.avgPricePerSqmRent ?? 0);

    // Calculate price change
    const latestPrice = salePrices[salePrices.length - 1] ?? 0;
    const previousPrice = salePrices[salePrices.length - 2] ?? latestPrice;
    const priceChange = previousPrice ? ((latestPrice - previousPrice) / previousPrice) * 100 : 0;

    return { categories, salePrices, rentPrices, latestPrice, priceChange };
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
      zoom: { enabled: false },
    },
    colors: ['#0ea5e9', '#8b5cf6'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: { colors: '#6b7280', fontSize: '12px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: 'Precio Venta (USD/m²)', style: { color: '#6b7280' } },
        labels: {
          style: { colors: '#6b7280', fontSize: '12px' },
          formatter: (val: number) => `$${val.toLocaleString()}`,
        },
      },
      ...(showRent
        ? [
            {
              opposite: true,
              title: { text: 'Precio Alquiler (USD/m²)', style: { color: '#6b7280' } },
              labels: {
                style: { colors: '#6b7280', fontSize: '12px' },
                formatter: (val: number) => `$${val.toFixed(1)}`,
              },
            },
          ]
        : []),
    ],
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
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
    { name: 'Venta', data: chartData.salePrices },
    ...(showRent ? [{ name: 'Alquiler', data: chartData.rentPrices }] : []),
  ];

  const zoneName = zone.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tendencia de Precios - {zoneName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Precio promedio por m² (12 meses)
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            USD {chartData.latestPrice.toLocaleString()}/m²
          </p>
          <p
            className={`flex items-center justify-end gap-1 text-sm ${
              chartData.priceChange >= 0 ? 'text-success-600' : 'text-error-600'
            }`}
          >
            {chartData.priceChange >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {chartData.priceChange >= 0 ? '+' : ''}
            {chartData.priceChange.toFixed(1)}% vs mes anterior
          </p>
        </div>
      </div>
      <Chart options={options} series={series} type="line" height={320} />
    </div>
  );
}
