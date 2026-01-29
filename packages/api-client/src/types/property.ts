import type { Address, Owner, PortalPublishing } from './common';

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'ph'
  | 'land'
  | 'office'
  | 'commercial'
  | 'warehouse'
  | 'garage';

export type OperationType = 'sale' | 'rent' | 'temporary_rent';

export type PropertyStatus = 'draft' | 'active' | 'paused' | 'sold' | 'rented' | 'reserved';

export type Currency = 'USD' | 'ARS';

export interface PropertyImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  isMain: boolean;
  order: number;
  alt?: string;
}

export interface PropertyFeatures {
  totalArea: number;
  coveredArea: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  age?: number;
  floors?: number;
  orientation?: 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'needs_work';
}

export interface PropertyAmenities {
  pool: boolean;
  gym: boolean;
  security: boolean;
  laundry: boolean;
  rooftop: boolean;
  parking: boolean;
  balcony: boolean;
  terrace: boolean;
  garden: boolean;
  heating: boolean;
  airConditioning: boolean;
  elevator: boolean;
  storage: boolean;
  petFriendly: boolean;
}

export interface PropertyStats {
  views: number;
  leads: number;
  visits: number;
  daysOnMarket: number;
  lastViewedAt?: string;
}

export interface Property {
  id: string;
  type: PropertyType;
  operation: OperationType;
  status: PropertyStatus;
  title: string;
  description: string;
  address: Address;
  price: number;
  currency: Currency;
  expenses?: number;
  features: PropertyFeatures;
  amenities: PropertyAmenities;
  images: PropertyImage[];
  owner?: Owner;
  commission?: number;
  portals: PortalPublishing[];
  stats: PropertyStats;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyInput {
  type: PropertyType;
  operation: OperationType;
  status?: PropertyStatus;
  title: string;
  description: string;
  address: Address;
  price: number;
  currency: Currency;
  expenses?: number;
  features: PropertyFeatures;
  amenities: Partial<PropertyAmenities>;
  images?: Omit<PropertyImage, 'id'>[];
  owner?: Owner;
  commission?: number;
}

export interface PropertyFilters {
  type?: PropertyType | PropertyType[];
  operation?: OperationType | OperationType[];
  status?: PropertyStatus | PropertyStatus[];
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number;
  neighborhood?: string;
  city?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: keyof Property;
  sortOrder?: 'asc' | 'desc';
}
