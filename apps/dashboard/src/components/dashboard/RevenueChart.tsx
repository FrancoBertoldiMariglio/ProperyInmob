import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className }: RevenueChartProps) {
  // Mock data for revenue over last 6 months
  const chartData = useMemo(() => {
    const categories = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
    const actual = [8500, 12000, 9500, 11000, 14500, 15500];
    const projected = [null, null, null, null, null, 15500, 17000, 18500];

    return { categories: [...categories, 'Feb', 'Mar'], actual, projected };
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
      zoom: { enabled: false },
    },
    colors: ['#0ea5e9', '#94a3b8'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: [2, 2],
      dashArray: [0, 5],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
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
        formatter: (val: number) => `$${(val / 1000).toFixed(0)}k`,
      },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#6b7280' },
      markers: { radius: 4 },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val: number) => (val ? `USD ${val.toLocaleString()}` : '-'),
      },
    },
  };

  const series = [
    { name: 'Comisiones', data: chartData.actual },
    {
      name: 'Proyeccion',
      data: chartData.projected as (number | null)[],
    },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Comisiones Mensuales
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ultimos 6 meses + proyeccion</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            USD {(15500).toLocaleString()}
          </p>
          <p className="text-sm text-success-600">+29.2% vs mes anterior</p>
        </div>
      </div>
      <Chart options={options} series={series} type="area" height={280} />
    </div>
  );
}
