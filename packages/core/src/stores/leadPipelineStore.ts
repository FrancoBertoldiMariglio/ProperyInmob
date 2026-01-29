import { create } from 'zustand';
import type { Lead, LeadStatus } from '@propery-agents/api-client';

interface LeadPipelineState {
  // Pipeline columns
  columns: LeadStatus[];

  // View mode
  viewMode: 'kanban' | 'list';

  // Selected lead for detail view
  selectedLeadId: string | null;

  // Dragging state
  draggingLeadId: string | null;

  // Filters
  filters: {
    propertyId?: string;
    source?: string;
    priority?: 'low' | 'medium' | 'high';
    dateRange?: {
      start: string;
      end: string;
    };
  };

  // Actions
  setViewMode: (mode: 'kanban' | 'list') => void;
  selectLead: (leadId: string | null) => void;
  setDraggingLead: (leadId: string | null) => void;
  setFilters: (filters: Partial<LeadPipelineState['filters']>) => void;
  clearFilters: () => void;
}

export const useLeadPipelineStore = create<LeadPipelineState>((set) => ({
  // Initial state
  columns: ['new', 'contacted', 'visited', 'negotiating', 'closed', 'lost'],
  viewMode: 'kanban',
  selectedLeadId: null,
  draggingLeadId: null,
  filters: {},

  // Actions
  setViewMode: (mode) => set({ viewMode: mode }),

  selectLead: (leadId) => set({ selectedLeadId: leadId }),

  setDraggingLead: (leadId) => set({ draggingLeadId: leadId }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () => set({ filters: {} }),
}));
