import type {
  AgentKPIs,
  MarketTrend,
  PriceHistoryPoint,
  DemandIndicators,
  ZoneComparison,
} from '../types';

export const mockKPIs: AgentKPIs = {
  totalLeads: {
    label: 'Leads Totales',
    value: 47,
    previousValue: 38,
    change: 23.7,
    changeType: 'increase',
    format: 'number',
    sparklineData: [32, 35, 38, 42, 40, 45, 47],
  },
  activeProperties: {
    label: 'Propiedades Activas',
    value: 12,
    previousValue: 10,
    change: 20,
    changeType: 'increase',
    format: 'number',
    sparklineData: [8, 9, 10, 10, 11, 11, 12],
  },
  scheduledVisits: {
    label: 'Visitas Programadas',
    value: 8,
    previousValue: 6,
    change: 33.3,
    changeType: 'increase',
    format: 'number',
    sparklineData: [4, 5, 6, 5, 7, 6, 8],
  },
  monthlyRevenue: {
    label: 'Comisiones del Mes',
    value: 15500,
    previousValue: 12000,
    change: 29.2,
    changeType: 'increase',
    format: 'currency',
    currency: 'USD',
    sparklineData: [8000, 10000, 12000, 11500, 13000, 14000, 15500],
  },
  conversionRate: {
    label: 'Tasa de Conversion',
    value: 12.5,
    previousValue: 10.2,
    change: 22.5,
    changeType: 'increase',
    format: 'percentage',
    sparklineData: [8, 9, 10.2, 11, 10.5, 11.8, 12.5],
  },
  avgDaysOnMarket: {
    label: 'Dias Promedio en Mercado',
    value: 45,
    previousValue: 52,
    change: -13.5,
    changeType: 'decrease',
    format: 'number',
    sparklineData: [58, 55, 52, 50, 48, 46, 45],
  },
};

// Generate 12 months of market trends
const generateMarketTrends = (basePrice: number, zone: string): MarketTrend[] => {
  const trends: MarketTrend[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const variation = (Math.random() - 0.5) * 0.1;
    trends.push({
      date: date.toISOString().split('T')[0],
      avgPricePerSqm: Math.round(basePrice * (1 + variation)),
      avgPricePerSqmRent: Math.round((basePrice / 200) * (1 + variation)),
      totalListings: Math.round(500 + Math.random() * 200),
      newListings: Math.round(50 + Math.random() * 30),
      soldProperties: Math.round(40 + Math.random() * 20),
      avgDaysOnMarket: Math.round(40 + Math.random() * 20),
    });
  }
  return trends;
};

export const mockMarketTrends: Record<string, MarketTrend[]> = {
  palermo: generateMarketTrends(3500, 'palermo'),
  belgrano: generateMarketTrends(3200, 'belgrano'),
  recoleta: generateMarketTrends(3800, 'recoleta'),
  'villa-crespo': generateMarketTrends(2800, 'villa-crespo'),
  'puerto-madero': generateMarketTrends(5500, 'puerto-madero'),
};

// Generate price history
const generatePriceHistory = (basePrice: number): PriceHistoryPoint[] => {
  const history: PriceHistoryPoint[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const variation = (Math.random() - 0.5) * 0.15;
    const avg = Math.round(basePrice * (1 + variation));
    history.push({
      date: date.toISOString().split('T')[0],
      avgPrice: avg,
      minPrice: Math.round(avg * 0.7),
      maxPrice: Math.round(avg * 1.4),
      medianPrice: Math.round(avg * 0.98),
      count: Math.round(100 + Math.random() * 50),
    });
  }
  return history;
};

export const mockPriceHistory: Record<string, PriceHistoryPoint[]> = {
  palermo: generatePriceHistory(185000),
  belgrano: generatePriceHistory(165000),
  recoleta: generatePriceHistory(210000),
  'villa-crespo': generatePriceHistory(145000),
  'puerto-madero': generatePriceHistory(350000),
};

export const mockDemandIndicators: Record<string, DemandIndicators> = {
  palermo: {
    zone: 'Palermo',
    demandLevel: 'very_high',
    demandScore: 85,
    searchVolume: 12500,
    searchTrend: 'up',
    topSearchedTypes: [
      { type: 'Departamento 2 amb', percentage: 35 },
      { type: 'Departamento 3 amb', percentage: 28 },
      { type: 'PH', percentage: 18 },
      { type: 'Monoambiente', percentage: 12 },
      { type: 'Otros', percentage: 7 },
    ],
    avgTimeToSell: 42,
    priceToRentRatio: 22,
  },
  belgrano: {
    zone: 'Belgrano',
    demandLevel: 'high',
    demandScore: 72,
    searchVolume: 9800,
    searchTrend: 'stable',
    topSearchedTypes: [
      { type: 'Departamento 3 amb', percentage: 32 },
      { type: 'Departamento 4 amb', percentage: 25 },
      { type: 'Casa', percentage: 20 },
      { type: 'Departamento 2 amb', percentage: 15 },
      { type: 'Otros', percentage: 8 },
    ],
    avgTimeToSell: 55,
    priceToRentRatio: 24,
  },
  recoleta: {
    zone: 'Recoleta',
    demandLevel: 'high',
    demandScore: 68,
    searchVolume: 8500,
    searchTrend: 'stable',
    topSearchedTypes: [
      { type: 'Departamento 3 amb', percentage: 30 },
      { type: 'Departamento 2 amb', percentage: 28 },
      { type: 'Departamento 4 amb', percentage: 22 },
      { type: 'PH', percentage: 12 },
      { type: 'Otros', percentage: 8 },
    ],
    avgTimeToSell: 60,
    priceToRentRatio: 26,
  },
  'villa-crespo': {
    zone: 'Villa Crespo',
    demandLevel: 'very_high',
    demandScore: 88,
    searchVolume: 7200,
    searchTrend: 'up',
    topSearchedTypes: [
      { type: 'PH', percentage: 32 },
      { type: 'Departamento 2 amb', percentage: 28 },
      { type: 'Departamento 3 amb', percentage: 22 },
      { type: 'Monoambiente', percentage: 12 },
      { type: 'Otros', percentage: 6 },
    ],
    avgTimeToSell: 35,
    priceToRentRatio: 20,
  },
  'puerto-madero': {
    zone: 'Puerto Madero',
    demandLevel: 'medium',
    demandScore: 52,
    searchVolume: 3200,
    searchTrend: 'down',
    topSearchedTypes: [
      { type: 'Departamento 3 amb', percentage: 35 },
      { type: 'Departamento 4 amb', percentage: 30 },
      { type: 'Oficina', percentage: 20 },
      { type: 'Loft', percentage: 10 },
      { type: 'Otros', percentage: 5 },
    ],
    avgTimeToSell: 90,
    priceToRentRatio: 32,
  },
};

export const mockZoneComparisons: Record<string, ZoneComparison> = {
  palermo: {
    zone: 'Palermo',
    avgPricePerSqm: 3500,
    avgRentPerSqm: 17.5,
    totalListings: 650,
    demandScore: 85,
    avgDaysOnMarket: 42,
    priceChange30d: 2.3,
  },
  belgrano: {
    zone: 'Belgrano',
    avgPricePerSqm: 3200,
    avgRentPerSqm: 13.3,
    totalListings: 480,
    demandScore: 72,
    avgDaysOnMarket: 55,
    priceChange30d: 0.8,
  },
  recoleta: {
    zone: 'Recoleta',
    avgPricePerSqm: 3800,
    avgRentPerSqm: 14.6,
    totalListings: 520,
    demandScore: 68,
    avgDaysOnMarket: 60,
    priceChange30d: -0.5,
  },
  'villa-crespo': {
    zone: 'Villa Crespo',
    avgPricePerSqm: 2800,
    avgRentPerSqm: 14,
    totalListings: 320,
    demandScore: 88,
    avgDaysOnMarket: 35,
    priceChange30d: 4.2,
  },
  'puerto-madero': {
    zone: 'Puerto Madero',
    avgPricePerSqm: 5500,
    avgRentPerSqm: 17.2,
    totalListings: 180,
    demandScore: 52,
    avgDaysOnMarket: 90,
    priceChange30d: -1.2,
  },
};
