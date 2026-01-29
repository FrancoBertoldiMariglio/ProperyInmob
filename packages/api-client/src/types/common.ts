// Common types used across the application

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface Address {
  street: string;
  number: string;
  floor?: string;
  apartment?: string;
  neighborhood: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
}

export interface Owner {
  id: string;
  name: string;
  contact: ContactInfo;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

// Portal types for property publishing
export type Portal = 'zonaprop' | 'argenprop' | 'mercadolibre' | 'properati' | 'internal';

export interface PortalPublishing {
  portal: Portal;
  status: 'published' | 'paused' | 'pending' | 'error';
  externalId?: string;
  publishedAt?: string;
  lastSyncAt?: string;
}
