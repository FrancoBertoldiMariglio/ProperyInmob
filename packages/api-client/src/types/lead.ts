import type { ContactInfo } from './common';

export type LeadStatus = 'new' | 'contacted' | 'visited' | 'negotiating' | 'closed' | 'lost';

export type LeadSource =
  | 'zonaprop'
  | 'argenprop'
  | 'mercadolibre'
  | 'properati'
  | 'website'
  | 'referral'
  | 'walk_in'
  | 'phone'
  | 'other';

export type LeadPriority = 'low' | 'medium' | 'high';

export type ActivityType = 'call' | 'email' | 'whatsapp' | 'visit' | 'note' | 'status_change';

export interface LeadActivity {
  id: string;
  type: ActivityType;
  description: string;
  createdAt: string;
  createdBy: string;
}

export interface LeadQualification {
  budget: number;
  budgetCurrency: 'USD' | 'ARS';
  hasFinancing: boolean;
  financingApproved?: boolean;
  timeline: 'immediate' | '1_3_months' | '3_6_months' | '6_12_months' | 'exploring';
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  contact: ContactInfo;
  propertyId: string;
  propertyTitle?: string;
  status: LeadStatus;
  source: LeadSource;
  priority: LeadPriority;
  qualification?: LeadQualification;
  activities: LeadActivity[];
  nextFollowUp?: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
}

export interface CreateLeadInput {
  name: string;
  contact: ContactInfo;
  propertyId: string;
  source: LeadSource;
  priority?: LeadPriority;
  qualification?: LeadQualification;
  notes?: string;
}

export interface LeadFilters {
  status?: LeadStatus | LeadStatus[];
  source?: LeadSource | LeadSource[];
  priority?: LeadPriority | LeadPriority[];
  propertyId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: keyof Lead;
  sortOrder?: 'asc' | 'desc';
}

export interface LeadPipeline {
  [key: string]: Lead[];
}
