import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KPICard } from './KPICard';
import type { KPI } from '@propery-agents/api-client';

// Helper to create test KPIs
const createKPI = (overrides: Partial<KPI> = {}): KPI => ({
  label: 'Test KPI',
  value: 1000,
  format: 'number',
  ...overrides,
});

describe('KPICard', () => {
  describe('Value Formatting', () => {
    it('formats number values correctly (es-AR locale)', () => {
      const kpi = createKPI({ value: 12345, format: 'number' });
      render(<KPICard kpi={kpi} icon={<span data-testid="icon">📊</span>} />);

      // es-AR locale uses dot as thousands separator
      expect(screen.getByText('12.345')).toBeInTheDocument();
    });

    it('formats currency values in USD (es-AR locale)', () => {
      const kpi = createKPI({ value: 50000, format: 'currency', currency: 'USD' });
      render(<KPICard kpi={kpi} icon={<span>💵</span>} />);

      // es-AR locale formats USD with space: "US$ 50.000"
      expect(screen.getByText('US$ 50.000')).toBeInTheDocument();
    });

    it('formats currency values in ARS (es-AR locale)', () => {
      const kpi = createKPI({ value: 150000, format: 'currency', currency: 'ARS' });
      render(<KPICard kpi={kpi} icon={<span>💵</span>} />);

      // es-AR locale formats ARS with space: "$ 150.000"
      expect(screen.getByText('$ 150.000')).toBeInTheDocument();
    });

    it('formats percentage values with one decimal', () => {
      const kpi = createKPI({ value: 85.7, format: 'percentage' });
      render(<KPICard kpi={kpi} icon={<span>📈</span>} />);

      expect(screen.getByText('85.7%')).toBeInTheDocument();
    });
  });

  describe('Label Display', () => {
    it('displays the KPI label', () => {
      const kpi = createKPI({ label: 'Total Properties' });
      render(<KPICard kpi={kpi} icon={<span>🏠</span>} />);

      expect(screen.getByText('Total Properties')).toBeInTheDocument();
    });
  });

  describe('Change Indicator', () => {
    it('shows positive change with + prefix', () => {
      const kpi = createKPI({ change: 12.5, changeType: 'increase' });
      render(<KPICard kpi={kpi} icon={<span>📈</span>} />);

      expect(screen.getByText('+12.5%')).toBeInTheDocument();
      expect(screen.getByText('vs mes anterior')).toBeInTheDocument();
    });

    it('shows negative change without prefix', () => {
      const kpi = createKPI({ change: -8.3, changeType: 'decrease' });
      render(<KPICard kpi={kpi} icon={<span>📉</span>} />);

      expect(screen.getByText('-8.3%')).toBeInTheDocument();
    });

    it('does not show change indicator when undefined', () => {
      const kpi = createKPI({ change: undefined });
      render(<KPICard kpi={kpi} icon={<span>📊</span>} />);

      expect(screen.queryByText('vs mes anterior')).not.toBeInTheDocument();
    });

    it('applies success color for increase', () => {
      const kpi = createKPI({ change: 10, changeType: 'increase' });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📈</span>} />);

      const changeElement = container.querySelector('.text-success-600');
      expect(changeElement).toBeInTheDocument();
    });

    it('applies error color for decrease', () => {
      const kpi = createKPI({ change: -5, changeType: 'decrease' });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📉</span>} />);

      const changeElement = container.querySelector('.text-error-600');
      expect(changeElement).toBeInTheDocument();
    });
  });

  describe('Icon', () => {
    it('renders the provided icon', () => {
      const kpi = createKPI();
      render(<KPICard kpi={kpi} icon={<span data-testid="custom-icon">🏠</span>} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Sparkline', () => {
    it('renders sparkline when data is provided', () => {
      const kpi = createKPI({ sparklineData: [10, 20, 15, 25, 30] });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📈</span>} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('does not render sparkline when data is empty', () => {
      const kpi = createKPI({ sparklineData: [] });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📊</span>} />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('does not render sparkline when data is undefined', () => {
      const kpi = createKPI({ sparklineData: undefined });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📊</span>} />);

      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('applies correct stroke color based on changeType', () => {
      const kpi = createKPI({
        sparklineData: [10, 20, 30],
        changeType: 'increase',
      });
      const { container } = render(<KPICard kpi={kpi} icon={<span>📈</span>} />);

      const path = container.querySelector('path[stroke="#16a34a"]');
      expect(path).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const kpi = createKPI();
      const { container } = render(
        <KPICard kpi={kpi} icon={<span>📊</span>} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
