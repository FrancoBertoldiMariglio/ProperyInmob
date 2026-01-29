import { useQuery } from '@tanstack/react-query';
import type { AnalyticsFilters } from '@propery-agents/api-client';
import { analyticsApi } from '@propery-agents/api-client';

export const analyticsKeys = {
  all: ['analytics'] as const,
  kpis: () => [...analyticsKeys.all, 'kpis'] as const,
  marketTrends: (zone: string) => [...analyticsKeys.all, 'market', zone] as const,
  priceHistory: (zone: string) => [...analyticsKeys.all, 'priceHistory', zone] as const,
  demand: (zone: string) => [...analyticsKeys.all, 'demand', zone] as const,
  comparativeAnalysis: (zones: string[]) =>
    [...analyticsKeys.all, 'comparative', ...zones] as const,
};

export function useKPIs() {
  return useQuery({
    queryKey: analyticsKeys.kpis(),
    queryFn: () => analyticsApi.getKPIs(),
  });
}

export function useMarketTrends(zone: string, filters?: AnalyticsFilters) {
  return useQuery({
    queryKey: analyticsKeys.marketTrends(zone),
    queryFn: () => analyticsApi.getMarketTrends(zone, filters),
    enabled: !!zone,
  });
}

export function usePriceHistory(zone: string, months: number = 12) {
  return useQuery({
    queryKey: analyticsKeys.priceHistory(zone),
    queryFn: () => analyticsApi.getPriceHistory(zone, months),
    enabled: !!zone,
  });
}

export function useDemandIndicators(zone: string) {
  return useQuery({
    queryKey: analyticsKeys.demand(zone),
    queryFn: () => analyticsApi.getDemandIndicators(zone),
    enabled: !!zone,
  });
}

export function useComparativeAnalysis(zones: string[]) {
  return useQuery({
    queryKey: analyticsKeys.comparativeAnalysis(zones),
    queryFn: () => analyticsApi.getComparativeAnalysis(zones),
    enabled: zones.length > 0,
  });
}
