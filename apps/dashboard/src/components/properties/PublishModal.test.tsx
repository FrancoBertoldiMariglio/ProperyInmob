import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PublishModal } from './PublishModal';
import type { Property } from '@propery-agents/api-client';

// Helper to create test property
const createProperty = (overrides: Partial<Property> = {}): Property => ({
  id: 'prop-1',
  type: 'apartment',
  operation: 'sale',
  status: 'active',
  title: 'Depto en Palermo',
  description: 'Test description',
  address: {
    street: 'Thames',
    number: '1234',
    neighborhood: 'Palermo',
    city: 'CABA',
    province: 'Buenos Aires',
    postalCode: '1414',
    country: 'Argentina',
  },
  price: 150000,
  currency: 'USD',
  features: {
    totalArea: 80,
    coveredArea: 75,
    condition: 'excellent',
  },
  amenities: {
    pool: false,
    gym: false,
    security: false,
    laundry: false,
    rooftop: false,
    parking: false,
    balcony: false,
    terrace: false,
    garden: false,
    heating: false,
    airConditioning: false,
    elevator: false,
    storage: false,
    petFriendly: false,
  },
  images: [],
  portals: [],
  stats: { views: 0, leads: 0, visits: 0, daysOnMarket: 0 },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('PublishModal', () => {
  const mockOnClose = vi.fn();
  const mockOnPublish = vi.fn();
  const mockOnUnpublish = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    property: createProperty(),
    isOpen: true,
    onClose: mockOnClose,
    onPublish: mockOnPublish,
    onUnpublish: mockOnUnpublish,
  };

  describe('Rendering', () => {
    it('renders modal when isOpen is true', () => {
      render(<PublishModal {...defaultProps} />);

      expect(screen.getByText('Publicar propiedad')).toBeInTheDocument();
      expect(screen.getByText('Depto en Palermo')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<PublishModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Publicar propiedad')).not.toBeInTheDocument();
    });

    it('renders all available portals', () => {
      render(<PublishModal {...defaultProps} />);

      expect(screen.getByText('ZonaProp')).toBeInTheDocument();
      expect(screen.getByText('ArgenProp')).toBeInTheDocument();
      expect(screen.getByText('Mercado Libre')).toBeInTheDocument();
      expect(screen.getByText('Properati')).toBeInTheDocument();
    });

    it('shows portal descriptions', () => {
      render(<PublishModal {...defaultProps} />);

      expect(screen.getByText('Portal lider en Argentina')).toBeInTheDocument();
      expect(screen.getByText('Gran alcance nacional')).toBeInTheDocument();
    });
  });

  describe('Portal Status', () => {
    it('shows "Publicada" badge for published portals', () => {
      const property = createProperty({
        portals: [
          {
            portal: 'zonaprop',
            status: 'published',
            publishedAt: '2024-01-15T00:00:00Z',
          },
        ],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      expect(screen.getByText('Publicada')).toBeInTheDocument();
    });

    it('shows "Pendiente" badge for pending portals', () => {
      const property = createProperty({
        portals: [
          {
            portal: 'zonaprop',
            status: 'pending',
          },
        ],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      expect(screen.getByText('Pendiente')).toBeInTheDocument();
    });

    it('shows "Error" badge for failed portals', () => {
      const property = createProperty({
        portals: [
          {
            portal: 'zonaprop',
            status: 'error',
          },
        ],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('shows published date for published portals', () => {
      const property = createProperty({
        portals: [
          {
            portal: 'zonaprop',
            status: 'published',
            publishedAt: '2024-01-15T00:00:00Z',
          },
        ],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      expect(screen.getByText(/Publicada:/)).toBeInTheDocument();
    });
  });

  describe('Portal Selection', () => {
    it('selects portal when clicked', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      expect(screen.getByText('1 portal(es) seleccionado(s)')).toBeInTheDocument();
    });

    it('deselects portal when clicked again', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);
      fireEvent.click(zonapropCard!);

      expect(screen.queryByText(/portal\(es\) seleccionado/)).not.toBeInTheDocument();
    });

    it('can select multiple portals', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      const argenpropCard = screen.getByText('ArgenProp').closest('[class*="cursor-pointer"]');

      fireEvent.click(zonapropCard!);
      fireEvent.click(argenpropCard!);

      expect(screen.getByText('2 portal(es) seleccionado(s)')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('calls onClose when Cancel button is clicked', () => {
      render(<PublishModal {...defaultProps} />);

      fireEvent.click(screen.getByText('Cancelar'));

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', () => {
      const { container } = render(<PublishModal {...defaultProps} />);

      const backdrop = container.querySelector('.bg-black\\/50');
      fireEvent.click(backdrop!);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('shows "Publicar seleccionados" button when unpublished portal is selected', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      expect(screen.getByText('Publicar seleccionados')).toBeInTheDocument();
    });

    it('calls onPublish with selected portal IDs', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      fireEvent.click(screen.getByText('Publicar seleccionados'));

      expect(mockOnPublish).toHaveBeenCalledWith(['zonaprop']);
    });

    it('shows "Despublicar" button when published portal is selected', () => {
      const property = createProperty({
        portals: [{ portal: 'zonaprop', status: 'published' }],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      expect(screen.getByText('Despublicar')).toBeInTheDocument();
    });

    it('calls onUnpublish with selected published portal IDs', () => {
      const property = createProperty({
        portals: [{ portal: 'zonaprop', status: 'published' }],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      fireEvent.click(screen.getByText('Despublicar'));

      expect(mockOnUnpublish).toHaveBeenCalledWith(['zonaprop']);
    });

    it('resets selection after publishing', () => {
      render(<PublishModal {...defaultProps} />);

      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);
      fireEvent.click(screen.getByText('Publicar seleccionados'));

      expect(screen.queryByText(/portal\(es\) seleccionado/)).not.toBeInTheDocument();
    });
  });

  describe('Mixed Selection', () => {
    it('shows both publish and unpublish buttons when mixed selection', () => {
      const property = createProperty({
        portals: [{ portal: 'zonaprop', status: 'published' }],
      });
      render(<PublishModal {...defaultProps} property={property} />);

      // Select published portal
      const zonapropCard = screen.getByText('ZonaProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(zonapropCard!);

      // Select unpublished portal
      const argenpropCard = screen.getByText('ArgenProp').closest('[class*="cursor-pointer"]');
      fireEvent.click(argenpropCard!);

      expect(screen.getByText('Despublicar')).toBeInTheDocument();
      expect(screen.getByText('Publicar seleccionados')).toBeInTheDocument();
    });
  });
});
