import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

// Mock the layout components
vi.mock('@/components/layout', () => ({
  Sidebar: () => <aside data-testid="sidebar">Sidebar</aside>,
  Header: ({ onMenuClick }: { onMenuClick: () => void }) => (
    <header data-testid="header">
      <button data-testid="menu-button" onClick={onMenuClick}>
        Menu
      </button>
    </header>
  ),
  Breadcrumb: () => <nav data-testid="breadcrumb">Breadcrumb</nav>,
  CommandPalette: () => <div data-testid="command-palette">CommandPalette</div>,
  MobileSidebar: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="mobile-sidebar">
        <button data-testid="close-sidebar" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

// Wrapper with router
const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('DashboardLayout', () => {
  describe('Component Structure', () => {
    it('renders all layout components', () => {
      renderWithRouter(<DashboardLayout />);

      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      expect(screen.getByTestId('command-palette')).toBeInTheDocument();
    });

    it('has correct layout structure classes', () => {
      const { container } = renderWithRouter(<DashboardLayout />);

      const root = container.firstChild;
      expect(root).toHaveClass('flex', 'h-screen');
    });
  });

  describe('Mobile Menu', () => {
    it('mobile sidebar is hidden by default', () => {
      renderWithRouter(<DashboardLayout />);

      expect(screen.queryByTestId('mobile-sidebar')).not.toBeInTheDocument();
    });

    it('opens mobile sidebar when menu button is clicked', () => {
      renderWithRouter(<DashboardLayout />);

      const menuButton = screen.getByTestId('menu-button');
      fireEvent.click(menuButton);

      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();
    });

    it('closes mobile sidebar when close button is clicked', () => {
      renderWithRouter(<DashboardLayout />);

      // Open the sidebar
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();

      // Close the sidebar
      fireEvent.click(screen.getByTestId('close-sidebar'));
      expect(screen.queryByTestId('mobile-sidebar')).not.toBeInTheDocument();
    });

    it('toggle menu state correctly', () => {
      renderWithRouter(<DashboardLayout />);

      // Toggle on
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();

      // Close
      fireEvent.click(screen.getByTestId('close-sidebar'));
      expect(screen.queryByTestId('mobile-sidebar')).not.toBeInTheDocument();

      // Toggle on again
      fireEvent.click(screen.getByTestId('menu-button'));
      expect(screen.getByTestId('mobile-sidebar')).toBeInTheDocument();
    });
  });

  describe('Main Content Area', () => {
    it('renders main element with correct classes', () => {
      renderWithRouter(<DashboardLayout />);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('flex-1', 'overflow-y-auto');
    });
  });
});
