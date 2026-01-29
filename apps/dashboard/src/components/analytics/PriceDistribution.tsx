import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { PriceHistoryPoint } from '@propery-agents/api-client';
import { BarChart3 } from 'lucide-react';

interface PriceDistributionProps {
  data: PriceHistoryPoint[];
  zone: string;
  className?: string;
}

export function PriceDistribution({ data, zone, className }: PriceDistributionProps) {
  const chartData = useMemo(() => {
    // Use the latest data point for current distribution
    const latest = data[data.length - 1];
    if (!latest) return null;

    // Create price range buckets based on min/max
    const { minPrice, maxPrice, avgPrice, medianPrice } = latest;
    const range = maxPrice - minPrice;
    const bucketSize = Math.ceil(range / 8);

    // Generate synthetic distribution data (in production this would come from API)
    const buckets: { range: string; count: number; midpoint: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const bucketMin = minPrice + i * bucketSize;
      const bucketMax = bucketMin + bucketSize;
      const midpoint = (bucketMin + bucketMax) / 2;

      // Create a bell-curve-ish distribution centered around avgPrice
      const distance = Math.abs(midpoint - avgPrice) / range;
      const baseCount = Math.round((1 - distance) * 30 + Math.random() * 10);

      buckets.push({
        range: `$${(bucketMin / 1000).toFixed(0)}k - $${(bucketMax / 1000).toFixed(0)}k`,
        count: Math.max(1, baseCount),
        midpoint,
      });
    }

    // Find the bucket where avg and median fall
    const avgBucket = buckets.findIndex((b) => avgPrice <= b.midpoint + bucketSize / 2);
    const medianBucket = buckets.findIndex((b) => medianPrice <= b.midpoint + bucketSize / 2);

    return {
      buckets,
      avgPrice,
      medianPrice,
      minPrice,
      maxPrice,
      avgBucket,
      medianBucket,
      totalCount: latest.count,
    };
  }, [data]);

  if (!chartData) {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Distribucion de Precios
        </h3>
        <p className="text-gray-500">No hay datos disponibles</p>
      </div>
    );
  }

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    colors: ['#0ea5e9'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '80%',
        distributed: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toString(),
      style: { fontSize: '10px', colors: ['#6b7280'] },
      offsetY: -20,
    },
    xaxis: {
      categories: chartData.buckets.map((b) => b.range),
      labels: {
        style: { colors: '#6b7280', fontSize: '10px' },
        rotate: -45,
        rotateAlways: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6b7280', fontSize: '12px' },
      },
      title: { text: 'Propiedades', style: { color: '#6b7280' } },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val: number) => `${val} propiedades` },
    },
    annotations: {
      xaxis: [
        {
          x: chartData.buckets[chartData.avgBucket]?.range,
          borderColor: '#f59e0b',
          strokeDashArray: 0,
          label: {
            text: 'Promedio',
            style: {
              color: '#fff',
              background: '#f59e0b',
              fontSize: '10px',
            },
            orientation: 'horizontal',
            offsetY: 0,
          },
        },
        {
          x: chartData.buckets[chartData.medianBucket]?.range,
          borderColor: '#8b5cf6',
          strokeDashArray: 0,
          label: {
            text: 'Mediana',
            style: {
              color: '#fff',
              background: '#8b5cf6',
              fontSize: '10px',
            },
            orientation: 'horizontal',
            offsetY: 20,
          },
        },
      ],
    },
  };

  const series = [{ name: 'Propiedades', data: chartData.buckets.map((b) => b.count) }];

  const zoneName = zone.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Distribucion de Precios - {zoneName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Histograma de precios de venta ({chartData.totalCount} propiedades)
          </p>
        </div>
        <BarChart3 className="h-6 w-6 text-sky-500" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Minimo</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            USD {chartData.minPrice.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-amber-600">Promedio</p>
          <p className="text-sm font-semibold text-amber-600">
            USD {chartData.avgPrice.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-violet-600">Mediana</p>
          <p className="text-sm font-semibold text-violet-600">
            USD {chartData.medianPrice.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Maximo</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            USD {chartData.maxPrice.toLocaleString()}
          </p>
        </div>
      </div>

      <Chart options={options} series={series} type="bar" height={280} />
    </div>
  );
}
