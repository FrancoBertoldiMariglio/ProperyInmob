import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Leads from './Leads';
import type { Lead } from '@propery-agents/api-client';

// Mock lead data
const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Juan Pérez',
    contact: {
      phone: '+5411123456',
      email: 'juan@test.com',
      preferredContact: 'email',
    },
    propertyId: 'prop-1',
    propertyTitle: 'Depto en Palermo',
    status: 'new',
    source: 'zonaprop',
    priority: 'high',
    activities: [],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'lead-2',
    name: 'María García',
    contact: {
      phone: '+5411654321',
      email: 'maria@test.com',
      preferredContact: 'whatsapp',
    },
    propertyId: 'prop-2',
    status: 'contacted',
    source: 'website',
    priority: 'medium',
    activities: [],
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
];

// Mock useLeads hook
vi.mock('@propery-agents/core', () => ({
  useLeads: vi.fn(() => ({
    data: { data: mockLeads, total: 2, page: 1, pageSize: 10, totalPages: 1 },
    isLoading: false,
    refetch: vi.fn(),
  })),
}));

// Mock lead components
vi.mock('@/components/leads', () => ({
  LeadPipeline: ({ leads, onViewLead }: { leads: Lead[]; onViewLead: (lead: Lead) => void }) => (
    <div data-testid="lead-pipeline">
      {leads.map((lead) => (
        <div key={lead.id} data-testid="pipeline-lead" onClick={() => onViewLead(lead)}>
          {lead.name}
        </div>
      ))}
    </div>
  ),
  LeadFilters: ({
    viewMode,
    onViewModeChange,
  }: {
    viewMode: string;
    onViewModeChange: (mode: 'kanban' | 'table') => void;
  }) => (
    <div data-testid="lead-filters">
      <button
        data-testid="view-mode-toggle"
        onClick={() => onViewModeChange(viewMode === 'kanban' ? 'table' : 'kanban')}
      >
        Toggle View ({viewMode})
      </button>
    </div>
  ),
  LeadTable: ({ leads, onView }: { leads: Lead[]; onView: (lead: Lead) => void }) => (
    <div data-testid="lead-table">
      {leads.map((lead) => (
        <div key={lead.id} data-testid="table-lead" onClick={() => onView(lead)}>
          {lead.name}
        </div>
      ))}
    </div>
  ),
  LeadDetail: ({ lead, onBack }: { lead: Lead; onBack: () => void }) => (
    <div data-testid="lead-detail">
      <h2>{lead.name}</h2>
      <button data-testid="back-button" onClick={onBack}>
        Volver
      </button>
    </div>
  ),
}));

// Helper to render with QueryClient
const renderWithQueryClient = (component: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

// Import the hook for mocking
import * as coreModule from '@propery-agents/core';

describe('Leads Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock to default
    vi.mocked(coreModule.useLeads).mockReturnValue({
      data: { data: mockLeads, total: 2, page: 1, pageSize: 10, totalPages: 1 },
      isLoading: false,
      refetch: vi.fn(),
    } as ReturnType<typeof coreModule.useLeads>);
  });

  describe('List View', () => {
    it('renders page header', () => {
      renderWithQueryClient(<Leads />);

      expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument();
      expect(screen.getByText('2 leads en tu pipeline')).toBeInTheDocument();
    });

    it('renders "Nuevo lead" button', () => {
      renderWithQueryClient(<Leads />);

      expect(screen.getByRole('button', { name: /Nuevo lead/i })).toBeInTheDocument();
    });

    it('renders filters component', () => {
      renderWithQueryClient(<Leads />);

      expect(screen.getByTestId('lead-filters')).toBeInTheDocument();
    });

    it('renders kanban view by default', () => {
      renderWithQueryClient(<Leads />);

      expect(screen.getByTestId('lead-pipeline')).toBeInTheDocument();
      expect(screen.queryByTestId('lead-table')).not.toBeInTheDocument();
    });

    it('renders lead data in pipeline', () => {
      renderWithQueryClient(<Leads />);

      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('María García')).toBeInTheDocument();
    });
  });

  describe('View Mode Toggle', () => {
    it('switches to table view when toggled', () => {
      renderWithQueryClient(<Leads />);

      const toggleButton = screen.getByTestId('view-mode-toggle');
      fireEvent.click(toggleButton);

      expect(screen.getByTestId('lead-table')).toBeInTheDocument();
      expect(screen.queryByTestId('lead-pipeline')).not.toBeInTheDocument();
    });

    it('switches back to kanban view', () => {
      renderWithQueryClient(<Leads />);

      const toggleButton = screen.getByTestId('view-mode-toggle');

      // Switch to table
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('lead-table')).toBeInTheDocument();

      // Switch back to kanban
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('lead-pipeline')).toBeInTheDocument();
    });
  });

  describe('Detail View', () => {
    it('shows detail view when lead is clicked in pipeline', async () => {
      renderWithQueryClient(<Leads />);

      const leadItem = screen.getByText('Juan Pérez');
      fireEvent.click(leadItem);

      await waitFor(() => {
        expect(screen.getByTestId('lead-detail')).toBeInTheDocument();
      });
    });

    it('shows detail view when lead is clicked in table', async () => {
      renderWithQueryClient(<Leads />);

      // Switch to table view
      fireEvent.click(screen.getByTestId('view-mode-toggle'));

      const leadItem = screen.getByText('Juan Pérez');
      fireEvent.click(leadItem);

      await waitFor(() => {
        expect(screen.getByTestId('lead-detail')).toBeInTheDocument();
      });
    });

    it('returns to list view when back button is clicked', async () => {
      renderWithQueryClient(<Leads />);

      // Go to detail
      fireEvent.click(screen.getByText('Juan Pérez'));

      await waitFor(() => {
        expect(screen.getByTestId('lead-detail')).toBeInTheDocument();
      });

      // Go back
      fireEvent.click(screen.getByTestId('back-button'));

      await waitFor(() => {
        expect(screen.getByTestId('lead-pipeline')).toBeInTheDocument();
      });
    });
  });

  describe('Singular/Plural Text', () => {
    it('shows "lead" (singular) for single lead', () => {
      // Update mock for single lead
      vi.mocked(coreModule.useLeads).mockReturnValue({
        data: { data: [mockLeads[0]], total: 1, page: 1, pageSize: 10, totalPages: 1 },
        isLoading: false,
        refetch: vi.fn(),
      } as ReturnType<typeof coreModule.useLeads>);

      renderWithQueryClient(<Leads />);

      expect(screen.getByText('1 lead en tu pipeline')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading message when data is loading', () => {
      vi.mocked(coreModule.useLeads).mockReturnValue({
        data: { data: [], total: 0, page: 1, pageSize: 10, totalPages: 0 },
        isLoading: true,
        refetch: vi.fn(),
      } as ReturnType<typeof coreModule.useLeads>);

      renderWithQueryClient(<Leads />);

      expect(screen.getByText('Cargando leads...')).toBeInTheDocument();
    });
  });
});
