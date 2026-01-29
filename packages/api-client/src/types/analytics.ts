export interface KPI {
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  format: 'number' | 'currency' | 'percentage';
  currency?: 'USD' | 'ARS';
  sparklineData?: number[];
}

export interface AgentKPIs {
  totalLeads: KPI;
  activeProperties: KPI;
  scheduledVisits: KPI;
  monthlyRevenue: KPI;
  conversionRate: KPI;
  avgDaysOnMarket: KPI;
}

export interface MarketTrend {
  date: string;
  avgPricePerSqm: number;
  avgPricePerSqmRent?: number;
  totalListings: number;
  newListings: number;
  soldProperties: number;
  avgDaysOnMarket: number;
}

export interface PriceHistoryPoint {
  date: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  medianPrice: number;
  count: number;
}

export interface DemandIndicators {
  zone: string;
  demandLevel: 'low' | 'medium' | 'high' | 'very_high';
  demandScore: number; // 0-100
  searchVolume: number;
  searchTrend: 'up' | 'down' | 'stable';
  topSearchedTypes: Array<{
    type: string;
    percentage: number;
  }>;
  avgTimeToSell: number; // days
  priceToRentRatio: number;
}

export interface ZoneComparison {
  zone: string;
  avgPricePerSqm: number;
  avgRentPerSqm: number;
  totalListings: number;
  demandScore: number;
  avgDaysOnMarket: number;
  priceChange30d: number;
}

export interface AnalyticsFilters {
  propertyType?: string;
  operation?: 'sale' | 'rent';
  dateFrom?: string;
  dateTo?: string;
}
