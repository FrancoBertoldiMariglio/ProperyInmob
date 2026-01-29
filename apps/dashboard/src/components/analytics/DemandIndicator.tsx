import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import type { DemandIndicators } from '@propery-agents/api-client';
import { TrendingUp, TrendingDown, Minus, Search, Clock } from 'lucide-react';

interface DemandIndicatorProps {
  data: DemandIndicators;
  className?: string;
}

function getDemandColor(level: DemandIndicators['demandLevel']): string {
  switch (level) {
    case 'very_high':
      return '#22c55e';
    case 'high':
      return '#84cc16';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#ef4444';
    default:
      return '#6b7280';
  }
}

function getDemandLabel(level: DemandIndicators['demandLevel']): string {
  switch (level) {
    case 'very_high':
      return 'Muy Alta';
    case 'high':
      return 'Alta';
    case 'medium':
      return 'Media';
    case 'low':
      return 'Baja';
    default:
      return '-';
  }
}

export function DemandIndicator({ data, className }: DemandIndicatorProps) {
  const gaugeOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'radialBar',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            size: '65%',
          },
          track: {
            background: '#e5e7eb',
            strokeWidth: '100%',
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 500,
              color: '#6b7280',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '28px',
              fontWeight: 700,
              color: getDemandColor(data.demandLevel),
              offsetY: 5,
              formatter: () => getDemandLabel(data.demandLevel),
            },
          },
        },
      },
      colors: [getDemandColor(data.demandLevel)],
      labels: ['Demanda'],
    }),
    [data.demandLevel]
  );

  const donutOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'donut',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      labels: data.topSearchedTypes.map((t) => t.type),
      colors: ['#0ea5e9', '#8b5cf6', '#22c55e', '#f59e0b', '#6b7280'],
      dataLabels: { enabled: false },
      legend: {
        position: 'bottom',
        labels: { colors: '#6b7280' },
        fontSize: '12px',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { fontSize: '12px', color: '#6b7280' },
              value: {
                fontSize: '16px',
                fontWeight: 600,
                color: '#111827',
                formatter: (val: string) => `${val}%`,
              },
            },
          },
        },
      },
      tooltip: { theme: 'light' },
    }),
    [data.topSearchedTypes]
  );

  const TrendIcon =
    data.searchTrend === 'up' ? TrendingUp : data.searchTrend === 'down' ? TrendingDown : Minus;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Indicadores de Demanda - {data.zone}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Gauge */}
        <div className="flex flex-col items-center">
          <Chart options={gaugeOptions} series={[data.demandScore]} type="radialBar" height={220} />
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span>{data.searchVolume.toLocaleString()} busquedas</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendIcon
                className={`h-4 w-4 ${
                  data.searchTrend === 'up'
                    ? 'text-success-600'
                    : data.searchTrend === 'down'
                      ? 'text-error-600'
                      : 'text-gray-500'
                }`}
              />
              <span className="capitalize">
                {data.searchTrend === 'up'
                  ? 'Subiendo'
                  : data.searchTrend === 'down'
                    ? 'Bajando'
                    : 'Estable'}
              </span>
            </div>
          </div>
        </div>

        {/* Top Searched Types */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
            Tipos Mas Buscados
          </p>
          <Chart
            options={donutOptions}
            series={data.topSearchedTypes.map((t) => t.percentage)}
            type="donut"
            height={220}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Tiempo promedio de venta</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.avgTimeToSell} dias
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Ratio Precio/Alquiler</div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.priceToRentRatio}x
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">años para recuperar inversión</p>
        </div>
      </div>
    </div>
  );
}
