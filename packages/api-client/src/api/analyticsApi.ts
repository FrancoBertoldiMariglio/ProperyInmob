import type {
  AgentKPIs,
  MarketTrend,
  PriceHistoryPoint,
  DemandIndicators,
  ZoneComparison,
  AnalyticsFilters,
} from '../types';
import {
  mockKPIs,
  mockMarketTrends,
  mockPriceHistory,
  mockDemandIndicators,
  mockZoneComparisons,
} from '../mocks/analyticsMocks';
import { sleep } from '@propery-agents/config';

const API_DELAY = 500;

export const analyticsApi = {
  async getKPIs(): Promise<AgentKPIs> {
    await sleep(API_DELAY);
    return mockKPIs;
  },

  async getMarketTrends(zone: string, _filters?: AnalyticsFilters): Promise<MarketTrend[]> {
    await sleep(API_DELAY);
    return mockMarketTrends[zone] || mockMarketTrends['palermo'];
  },

  async getPriceHistory(zone: string, _months: number = 12): Promise<PriceHistoryPoint[]> {
    await sleep(API_DELAY);
    return mockPriceHistory[zone] || mockPriceHistory['palermo'];
  },

  async getDemandIndicators(zone: string): Promise<DemandIndicators> {
    await sleep(API_DELAY);
    return mockDemandIndicators[zone] || mockDemandIndicators['palermo'];
  },

  async getComparativeAnalysis(zones: string[]): Promise<ZoneComparison[]> {
    await sleep(API_DELAY);
    return zones.map((zone) => mockZoneComparisons[zone] || mockZoneComparisons['palermo']);
  },
};
