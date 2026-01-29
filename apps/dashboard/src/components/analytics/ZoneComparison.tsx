import type { ZoneComparison as ZoneComparisonType } from '@propery-agents/api-client';
import { TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { Button } from '@propery-agents/ui';

interface ZoneComparisonProps {
  zones: ZoneComparisonType[];
  onRemoveZone?: (zone: string) => void;
  className?: string;
}

function getDemandBadge(score: number) {
  if (score >= 80)
    return (
      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
        Muy Alta
      </span>
    );
  if (score >= 60)
    return (
      <span className="px-2 py-0.5 text-xs font-medium bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400 rounded-full">
        Alta
      </span>
    );
  if (score >= 40)
    return (
      <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
        Media
      </span>
    );
  return (
    <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
      Baja
    </span>
  );
}

function PriceChangeIndicator({ change }: { change: number }) {
  const Icon = change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
  const color =
    change > 0
      ? 'text-success-600'
      : change < 0
        ? 'text-error-600'
        : 'text-gray-500 dark:text-gray-400';

  return (
    <span className={`flex items-center gap-1 ${color}`}>
      <Icon className="h-4 w-4" />
      {change > 0 ? '+' : ''}
      {change.toFixed(1)}%
    </span>
  );
}

export function ZoneComparison({ zones, onRemoveZone, className }: ZoneComparisonProps) {
  if (zones.length === 0) {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Comparativo de Zonas
        </h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Selecciona zonas para comparar</p>
        </div>
      </div>
    );
  }

  // Find best values for highlighting
  const bestPriceIdx = zones.reduce(
    (best, z, i) => (z.avgPricePerSqm < zones[best].avgPricePerSqm ? i : best),
    0
  );
  const bestDemandIdx = zones.reduce(
    (best, z, i) => (z.demandScore > zones[best].demandScore ? i : best),
    0
  );
  const bestDaysIdx = zones.reduce(
    (best, z, i) => (z.avgDaysOnMarket < zones[best].avgDaysOnMarket ? i : best),
    0
  );

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Comparativo de Zonas
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Zona
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Precio/m² Venta
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Precio/m² Alquiler
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Demanda
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Publicaciones
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Dias Prom.
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">
                Cambio 30d
              </th>
              {onRemoveZone && <th className="w-10" />}
            </tr>
          </thead>
          <tbody>
            {zones.map((zone, idx) => (
              <tr
                key={zone.zone}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-900 dark:text-white">{zone.zone}</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`font-medium ${idx === bestPriceIdx ? 'text-success-600' : 'text-gray-900 dark:text-white'}`}
                  >
                    USD {zone.avgPricePerSqm.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  USD {zone.avgRentPerSqm.toFixed(1)}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {getDemandBadge(zone.demandScore)}
                    <span
                      className={`text-xs ${idx === bestDemandIdx ? 'text-success-600 font-medium' : 'text-gray-500'}`}
                    >
                      {zone.demandScore}/100
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-gray-900 dark:text-white">
                  {zone.totalListings}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`font-medium ${idx === bestDaysIdx ? 'text-success-600' : 'text-gray-900 dark:text-white'}`}
                  >
                    {zone.avgDaysOnMarket} dias
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <PriceChangeIndicator change={zone.priceChange30d} />
                </td>
                {onRemoveZone && (
                  <td className="py-3 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveZone(zone.zone.toLowerCase().replace(' ', '-'))}
                      className="p-1 h-auto"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="text-success-600">Verde</span> = Mejor valor en esa categoria
      </div>
    </div>
  );
}
