import { useState, useCallback } from 'react';
import { Card } from '@propery-agents/ui';
import {
  useMarketTrends,
  usePriceHistory,
  useDemandIndicators,
  useComparativeAnalysis,
} from '@propery-agents/core';
import {
  ZoneSelector,
  TrendChart,
  DemandIndicator,
  SupplyChart,
  ZoneComparison,
  DaysOnMarketChart,
  PriceDistribution,
  ZONES,
} from '../components/analytics';
import { Loader2, Plus, BarChart2 } from 'lucide-react';

function Analytics() {
  const [selectedZone, setSelectedZone] = useState('palermo');
  const [comparisonZones, setComparisonZones] = useState<string[]>(['palermo', 'belgrano']);

  // Fetch data for selected zone
  const { data: marketTrends, isLoading: trendsLoading } = useMarketTrends(selectedZone);
  const { data: priceHistory, isLoading: priceLoading } = usePriceHistory(selectedZone);
  const { data: demandData, isLoading: demandLoading } = useDemandIndicators(selectedZone);

  // Fetch comparison data
  const { data: comparisonData, isLoading: comparisonLoading } =
    useComparativeAnalysis(comparisonZones);

  const handleAddZoneToComparison = useCallback((zone: string) => {
    setComparisonZones((prev) => {
      if (prev.includes(zone)) return prev;
      if (prev.length >= 5) return prev; // Max 5 zones
      return [...prev, zone];
    });
  }, []);

  const handleRemoveZoneFromComparison = useCallback((zone: string) => {
    setComparisonZones((prev) => prev.filter((z) => z !== zone));
  }, []);

  const availableForComparison = ZONES.filter((z) => !comparisonZones.includes(z.id));

  const isLoading = trendsLoading || priceLoading || demandLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics de Mercado</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analiza tendencias del mercado inmobiliario por zona
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Datos de los ultimos 12 meses
          </span>
        </div>
      </div>

      {/* Zone Selector */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Zona seleccionada:
          </span>
          <ZoneSelector
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
            variant="tabs"
            className="flex-1"
          />
        </div>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Cargando datos...</span>
        </div>
      ) : (
        <>
          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Trend Chart */}
            <Card className="p-6">
              {marketTrends && (
                <TrendChart data={marketTrends} zone={selectedZone} showRent={true} />
              )}
            </Card>

            {/* Demand Indicator */}
            <Card className="p-6">{demandData && <DemandIndicator data={demandData} />}</Card>
          </div>

          {/* Supply and Days on Market */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Supply Chart */}
            <Card className="p-6">{marketTrends && <SupplyChart data={marketTrends} />}</Card>

            {/* Days on Market */}
            <Card className="p-6">
              {marketTrends && <DaysOnMarketChart data={marketTrends} zone={selectedZone} />}
            </Card>
          </div>

          {/* Price Distribution */}
          <Card className="p-6">
            {priceHistory && <PriceDistribution data={priceHistory} zone={selectedZone} />}
          </Card>

          {/* Zone Comparison Section */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comparativo de Zonas
              </h3>
              {availableForComparison.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Agregar zona:</span>
                  <div className="flex flex-wrap gap-2">
                    {availableForComparison.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => handleAddZoneToComparison(zone.id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        {zone.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {comparisonLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
              </div>
            ) : (
              comparisonData && (
                <ZoneComparison
                  zones={comparisonData}
                  onRemoveZone={handleRemoveZoneFromComparison}
                />
              )
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default Analytics;
