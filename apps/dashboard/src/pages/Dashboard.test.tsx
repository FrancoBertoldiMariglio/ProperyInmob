import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './Dashboard';

// Mock the dashboard components
vi.mock('@/components/dashboard', () => ({
  KPICard: ({ kpi }: { kpi: { label: string } }) => <div data-testid="kpi-card">{kpi.label}</div>,
  LeadsOverviewChart: () => <div data-testid="leads-chart">Leads Chart</div>,
  PropertiesOverviewWidget: () => <div data-testid="properties-widget">Properties Widget</div>,
  RevenueChart: () => <div data-testid="revenue-chart">Revenue Chart</div>,
  QuickActions: () => <div data-testid="quick-actions">Quick Actions</div>,
  RecentActivity: () => <div data-testid="recent-activity">Recent Activity</div>,
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

describe('Dashboard Page', () => {
  describe('Layout', () => {
    it('renders welcome message', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByText(/Bienvenido de vuelta/)).toBeInTheDocument();
      expect(screen.getByText(/resumen de tu actividad/)).toBeInTheDocument();
    });

    it('renders all KPI cards', () => {
      renderWithQueryClient(<Dashboard />);

      const kpiCards = screen.getAllByTestId('kpi-card');
      expect(kpiCards).toHaveLength(6);
    });

    it('renders expected KPI labels', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByText('Leads Totales')).toBeInTheDocument();
      expect(screen.getByText('Propiedades Activas')).toBeInTheDocument();
      expect(screen.getByText('Visitas Programadas')).toBeInTheDocument();
      expect(screen.getByText('Comisiones del Mes')).toBeInTheDocument();
      expect(screen.getByText('Tasa de Conversion')).toBeInTheDocument();
      expect(screen.getByText('Dias Promedio')).toBeInTheDocument();
    });
  });

  describe('Charts and Widgets', () => {
    it('renders revenue chart', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByTestId('revenue-chart')).toBeInTheDocument();
    });

    it('renders leads overview chart', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByTestId('leads-chart')).toBeInTheDocument();
    });

    it('renders quick actions widget', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByTestId('quick-actions')).toBeInTheDocument();
    });

    it('renders properties overview widget', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByTestId('properties-widget')).toBeInTheDocument();
    });

    it('renders recent activity widget', () => {
      renderWithQueryClient(<Dashboard />);

      expect(screen.getByTestId('recent-activity')).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('has correct grid classes for KPIs', () => {
      const { container } = renderWithQueryClient(<Dashboard />);

      const kpiGrid = container.querySelector('.grid.grid-cols-1');
      expect(kpiGrid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-6');
    });

    it('has correct grid classes for main content', () => {
      const { container } = renderWithQueryClient(<Dashboard />);

      const mainGrid = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3');
      expect(mainGrid).toBeInTheDocument();
    });
  });
});
