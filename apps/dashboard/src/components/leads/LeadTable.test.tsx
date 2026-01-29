import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { LeadTable } from './LeadTable';
import type { Lead } from '@propery-agents/api-client';

// Helper to create test leads
const createLead = (overrides: Partial<Lead> = {}): Lead => ({
  id: 'lead-1',
  name: 'Juan Pérez',
  contact: {
    phone: '+54 11 1234-5678',
    email: 'juan@email.com',
    preferredContact: 'whatsapp',
  },
  propertyId: 'prop-1',
  propertyTitle: 'Depto en Palermo',
  status: 'new',
  source: 'zonaprop',
  priority: 'high',
  activities: [],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  ...overrides,
});

describe('LeadTable', () => {
  const mockOnView = vi.fn();
  const mockOnQuickAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders table headers', () => {
      render(<LeadTable leads={[]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText('Lead')).toBeInTheDocument();
      expect(screen.getByText('Propiedad')).toBeInTheDocument();
      expect(screen.getByText('Estado')).toBeInTheDocument();
      expect(screen.getByText('Prioridad')).toBeInTheDocument();
      expect(screen.getByText('Fuente')).toBeInTheDocument();
      expect(screen.getByText('Fecha')).toBeInTheDocument();
    });

    it('renders lead data correctly', () => {
      const lead = createLead();
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('juan@email.com')).toBeInTheDocument();
      expect(screen.getByText('Depto en Palermo')).toBeInTheDocument();
    });

    it('shows empty state when no leads', () => {
      render(<LeadTable leads={[]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText('No se encontraron leads')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(
        <LeadTable
          leads={[]}
          isLoading={true}
          onView={mockOnView}
          onQuickAction={mockOnQuickAction}
        />
      );

      expect(screen.getByText('Cargando leads...')).toBeInTheDocument();
    });

    it('shows dash for missing property title', () => {
      const lead = createLead({ propertyTitle: undefined });
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText('-')).toBeInTheDocument();
    });
  });

  describe('Status Badges', () => {
    it.each([
      ['new', 'Nuevo'],
      ['contacted', 'Contactado'],
      ['visited', 'Visito'],
      ['negotiating', 'Negociando'],
      ['closed', 'Cerrado'],
      ['lost', 'Perdido'],
    ] as const)('renders %s status as "%s"', (status, label) => {
      const lead = createLead({ status });
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe('Priority Badges', () => {
    it.each([
      ['high', 'Alta'],
      ['medium', 'Media'],
      ['low', 'Baja'],
    ] as const)('renders %s priority as "%s"', (priority, label) => {
      const lead = createLead({ priority });
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onView when row is clicked', () => {
      const lead = createLead();
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      const row = screen.getByText('Juan Pérez').closest('tr');
      fireEvent.click(row!);

      expect(mockOnView).toHaveBeenCalledWith(lead);
    });

    it('calls onQuickAction with "call" when phone button clicked', () => {
      const lead = createLead();
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      const row = screen.getByText('Juan Pérez').closest('tr');
      const buttons = within(row!).getAllByRole('button');
      fireEvent.click(buttons[0]); // First button is phone

      expect(mockOnQuickAction).toHaveBeenCalledWith(lead, 'call');
      expect(mockOnView).not.toHaveBeenCalled(); // Should stop propagation
    });

    it('calls onQuickAction with "email" when email button clicked', () => {
      const lead = createLead();
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      const row = screen.getByText('Juan Pérez').closest('tr');
      const buttons = within(row!).getAllByRole('button');
      fireEvent.click(buttons[1]); // Second button is email

      expect(mockOnQuickAction).toHaveBeenCalledWith(lead, 'email');
    });

    it('calls onQuickAction with "whatsapp" when whatsapp button clicked', () => {
      const lead = createLead();
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      const row = screen.getByText('Juan Pérez').closest('tr');
      const buttons = within(row!).getAllByRole('button');
      fireEvent.click(buttons[2]); // Third button is whatsapp

      expect(mockOnQuickAction).toHaveBeenCalledWith(lead, 'whatsapp');
    });
  });

  describe('Pagination', () => {
    it('shows total lead count', () => {
      const leads = [createLead({ id: '1' }), createLead({ id: '2' })];
      render(<LeadTable leads={leads} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      expect(screen.getByText('2 leads')).toBeInTheDocument();
    });

    it('shows singular "lead" for single item', () => {
      render(
        <LeadTable leads={[createLead()]} onView={mockOnView} onQuickAction={mockOnQuickAction} />
      );

      expect(screen.getByText('1 lead')).toBeInTheDocument();
    });

    it('shows page information', () => {
      render(
        <LeadTable leads={[createLead()]} onView={mockOnView} onQuickAction={mockOnQuickAction} />
      );

      expect(screen.getByText(/Pagina 1 de/)).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('formats date in Spanish locale', () => {
      const lead = createLead({ createdAt: '2024-03-15T10:00:00Z' });
      render(<LeadTable leads={[lead]} onView={mockOnView} onQuickAction={mockOnQuickAction} />);

      // Should show day and abbreviated month in Spanish
      expect(screen.getByText(/15/)).toBeInTheDocument();
    });
  });
});
