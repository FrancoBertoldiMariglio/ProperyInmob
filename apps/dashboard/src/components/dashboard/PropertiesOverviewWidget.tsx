import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Clock } from 'lucide-react';

interface PropertiesOverviewWidgetProps {
  className?: string;
}

export function PropertiesOverviewWidget({ className }: PropertiesOverviewWidgetProps) {
  // Mock data
  const data = useMemo(
    () => ({
      active: 12,
      sold: 5,
      rented: 3,
      paused: 2,
      avgDaysOnMarket: 45,
    }),
    []
  );

  const total = data.active + data.sold + data.rented + data.paused;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    labels: ['Activas', 'Vendidas', 'Alquiladas', 'Pausadas'],
    colors: ['#0ea5e9', '#22c55e', '#8b5cf6', '#9ca3af'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6b7280',
              formatter: () => total.toString(),
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    tooltip: {
      y: { formatter: (val: number) => `${val} propiedades` },
    },
  };

  const chartSeries = [data.active, data.sold, data.rented, data.paused];

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Resumen de Propiedades
      </h3>

      <div className="flex items-center gap-6">
        {/* Chart */}
        <div className="w-32 h-32">
          <Chart options={chartOptions} series={chartSeries} type="donut" height={128} />
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Activas</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {data.active}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Vendidas</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.sold}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Alquiladas</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {data.rented}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Pausadas</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {data.paused}
            </span>
          </div>
        </div>
      </div>

      {/* Avg days on market */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="p-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
          <Clock className="w-5 h-5 text-warning-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Dias promedio en mercado</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.avgDaysOnMarket} dias
          </p>
        </div>
      </div>
    </div>
  );
}
