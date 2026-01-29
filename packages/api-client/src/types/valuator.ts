import type { PropertyType, OperationType, PropertyFeatures, PropertyAmenities } from './property';
import type { Address } from './common';

export interface ValuationInput {
  type: PropertyType;
  operation: OperationType;
  address: Partial<Address>;
  features: Partial<PropertyFeatures>;
  amenities?: Partial<PropertyAmenities>;
  photos?: string[]; // URLs for AI analysis
}

export interface Comparable {
  id: string;
  address: string;
  type: PropertyType;
  operation: OperationType;
  price: number;
  pricePerSqm: number;
  totalArea: number;
  coveredArea: number;
  bedrooms?: number;
  bathrooms?: number;
  soldDate?: string;
  daysOnMarket?: number;
  distance: number; // meters from target property
  similarityScore: number; // 0-100
  imageUrl?: string;
}

export interface ValuationResult {
  estimatedPrice: number;
  pricePerSqm: number;
  confidenceScore: number; // 0-100
  priceRange: {
    min: number;
    max: number;
  };
  methodology: string;
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
}

export interface MarketContext {
  zone: string;
  avgPricePerSqm: number;
  pricePerSqmRange: {
    min: number;
    max: number;
  };
  demandLevel: 'low' | 'medium' | 'high' | 'very_high';
  trendDirection: 'up' | 'down' | 'stable';
  trendPercentage: number;
  estimatedTimeToSell: number; // days
}

export interface PriceRecommendation {
  suggestedPrice: number;
  strategy: 'aggressive' | 'neutral' | 'conservative';
  reasoning: string;
  expectedTimeToSell: number;
}

export interface Valuation {
  id: string;
  input: ValuationInput;
  result: ValuationResult;
  comparables: Comparable[];
  marketContext: MarketContext;
  recommendation: PriceRecommendation;
  createdAt: string;
  reportUrl?: string;
}
