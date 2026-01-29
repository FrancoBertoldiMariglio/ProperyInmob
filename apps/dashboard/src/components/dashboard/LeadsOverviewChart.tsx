import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface LeadsOverviewChartProps {
  className?: string;
}

export function LeadsOverviewChart({ className }: LeadsOverviewChartProps) {
  // Mock data for leads by status over last 7 days
  const chartData = useMemo(() => {
    const categories = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    const series = [
      { name: 'Nuevos', data: [4, 6, 3, 5, 8, 2, 4] },
      { name: 'Contactados', data: [2, 3, 4, 2, 3, 1, 2] },
      { name: 'Visitaron', data: [1, 2, 1, 3, 2, 0, 1] },
      { name: 'Negociando', data: [1, 1, 2, 1, 1, 1, 0] },
    ];
    return { categories, series };
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    colors: ['#0ea5e9', '#8b5cf6', '#22c55e', '#f59e0b'],
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
      markers: { radius: 4 },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val: number) => `${val} leads` },
    },
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leads por Estado</h3>
        <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <option>Ultimos 7 dias</option>
          <option>Ultimos 30 dias</option>
          <option>Este mes</option>
        </select>
      </div>
      <Chart options={options} series={chartData.series} type="bar" height={280} />
    </div>
  );
}
