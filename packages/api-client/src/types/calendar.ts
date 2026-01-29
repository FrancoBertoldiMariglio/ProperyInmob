export type VisitStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle?: string;
  propertyAddress?: string;
  leadId: string;
  leadName?: string;
  leadPhone?: string;
  date: string; // ISO date string
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  duration: number; // in minutes
  status: VisitStatus;
  notes?: string;
  feedback?: string;
  rating?: number; // 1-5 lead interest rating after visit
  createdAt: string;
  updatedAt: string;
}

export interface CreateVisitInput {
  propertyId: string;
  leadId: string;
  date: string;
  startTime: string;
  duration: number;
  notes?: string;
}

export interface VisitFilters {
  propertyId?: string;
  leadId?: string;
  status?: VisitStatus | VisitStatus[];
  dateFrom?: string;
  dateTo?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'visit' | 'meeting' | 'reminder';
  status?: VisitStatus;
  propertyId?: string;
  leadId?: string;
  color?: string;
}
