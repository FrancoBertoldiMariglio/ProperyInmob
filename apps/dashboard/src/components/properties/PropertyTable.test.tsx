import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { PropertyTable } from './PropertyTable';
import type { Property } from '@propery-agents/api-client';

// Helper to create test properties
const createProperty = (overrides: Partial<Property> = {}): Property => ({
  id: 'prop-1',
  type: 'apartment',
  operation: 'sale',
  status: 'active',
  title: 'Depto 3 amb en Palermo',
  description: 'Hermoso departamento',
  address: {
    street: 'Thames',
    number: '1234',
    floor: '5',
    apartment: 'A',
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
    bedrooms: 2,
    bathrooms: 1,
    condition: 'excellent',
  },
  amenities: {
    pool: false,
    gym: true,
    security: true,
    laundry: true,
    rooftop: false,
    parking: true,
    balcony: true,
    terrace: false,
    garden: false,
    heating: true,
    airConditioning: true,
    elevator: true,
    storage: false,
    petFriendly: true,
  },
  images: [
    {
      id: 'img-1',
      url: 'https://example.com/img1.jpg',
      thumbnailUrl: 'https://example.com/img1-thumb.jpg',
      isMain: true,
      order: 0,
    },
  ],
  portals: [],
  stats: {
    views: 150,
    leads: 5,
    visits: 3,
    daysOnMarket: 15,
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
  ...overrides,
});

describe('PropertyTable', () => {
  const mockOnView = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnToggleStatus = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnPublish = vi.fn();
  const mockOnBulkAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    properties: [] as Property[],
    onView: mockOnView,
    onEdit: mockOnEdit,
    onToggleStatus: mockOnToggleStatus,
    onDelete: mockOnDelete,
    onPublish: mockOnPublish,
  };

  describe('Rendering', () => {
    it('renders table headers', () => {
      render(<PropertyTable {...defaultProps} />);

      expect(screen.getByText('Propiedad')).toBeInTheDocument();
      expect(screen.getByText('Precio')).toBeInTheDocument();
      expect(screen.getByText('Estado')).toBeInTheDocument();
      expect(screen.getByText('Leads')).toBeInTheDocument();
      expect(screen.getByText('Días')).toBeInTheDocument();
    });

    it('renders property data correctly', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText('Depto 3 amb en Palermo')).toBeInTheDocument();
      expect(screen.getByText(/Thames 1234/)).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument(); // Leads count
      expect(screen.getByText('15d')).toBeInTheDocument(); // Days on market
    });

    it('shows empty state when no properties', () => {
      render(<PropertyTable {...defaultProps} />);

      expect(screen.getByText('No se encontraron propiedades')).toBeInTheDocument();
    });

    it('shows loading state', () => {
      render(<PropertyTable {...defaultProps} isLoading={true} />);

      expect(screen.getByText('Cargando propiedades...')).toBeInTheDocument();
    });

    it('shows "Sin foto" when property has no images', () => {
      const property = createProperty({ images: [] });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText('Sin foto')).toBeInTheDocument();
    });
  });

  describe('Status Badges', () => {
    it.each([
      ['active', 'Activa'],
      ['paused', 'Pausada'],
      ['draft', 'Borrador'],
      ['sold', 'Vendida'],
      ['rented', 'Alquilada'],
      ['reserved', 'Reservada'],
    ] as const)('renders %s status as "%s"', (status, label) => {
      const property = createProperty({ status });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe('Price Formatting', () => {
    it('formats USD prices correctly', () => {
      const property = createProperty({ price: 250000, currency: 'USD' });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText('US$ 250.000')).toBeInTheDocument();
    });

    it('formats ARS prices correctly', () => {
      const property = createProperty({ price: 5000000, currency: 'ARS' });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText('$ 5.000.000')).toBeInTheDocument();
    });

    it('shows operation type label', () => {
      const property = createProperty({ operation: 'rent' });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText('Alquiler')).toBeInTheDocument();
    });
  });

  describe('Dropdown Menu Actions', () => {
    // Helper to find the actions menu button (last button in the row)
    const findMenuButton = () => {
      const rows = screen.getAllByRole('row');
      const dataRow = rows[1]; // First row is header, second is data
      const buttons = within(dataRow).getAllByRole('button');
      // The menu button is the one with MoreHorizontal (the last one in actions column)
      return buttons[buttons.length - 1];
    };

    it('opens dropdown menu on click', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      expect(screen.getByText('Ver detalle')).toBeInTheDocument();
      expect(screen.getByText('Editar')).toBeInTheDocument();
      expect(screen.getByText('Publicar')).toBeInTheDocument();
      expect(screen.getByText('Pausar')).toBeInTheDocument();
      expect(screen.getByText('Eliminar')).toBeInTheDocument();
    });

    it('shows "Activar" for paused properties', () => {
      const property = createProperty({ status: 'paused' });
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      expect(screen.getByText('Activar')).toBeInTheDocument();
    });

    it('calls onView when "Ver detalle" is clicked', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      fireEvent.click(screen.getByText('Ver detalle'));

      expect(mockOnView).toHaveBeenCalledWith(property);
    });

    it('calls onEdit when "Editar" is clicked', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      fireEvent.click(screen.getByText('Editar'));

      expect(mockOnEdit).toHaveBeenCalledWith(property);
    });

    it('calls onPublish when "Publicar" is clicked', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      fireEvent.click(screen.getByText('Publicar'));

      expect(mockOnPublish).toHaveBeenCalledWith(property);
    });

    it('calls onToggleStatus when "Pausar" is clicked', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      fireEvent.click(screen.getByText('Pausar'));

      expect(mockOnToggleStatus).toHaveBeenCalledWith(property);
    });

    it('calls onDelete when "Eliminar" is clicked', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      const menuButton = findMenuButton();
      fireEvent.click(menuButton);

      fireEvent.click(screen.getByText('Eliminar'));

      expect(mockOnDelete).toHaveBeenCalledWith(property);
    });
  });

  describe('Row Selection', () => {
    it('selects a single row with checkbox', () => {
      const property = createProperty();
      render(
        <PropertyTable {...defaultProps} properties={[property]} onBulkAction={mockOnBulkAction} />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      // First checkbox is header, second is row
      fireEvent.click(checkboxes[1]);

      expect(screen.getByText('1 seleccionada(s)')).toBeInTheDocument();
    });

    it('selects all rows with header checkbox', () => {
      const properties = [createProperty({ id: '1' }), createProperty({ id: '2' })];
      render(
        <PropertyTable {...defaultProps} properties={properties} onBulkAction={mockOnBulkAction} />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]); // Header checkbox

      expect(screen.getByText('2 seleccionada(s)')).toBeInTheDocument();
    });
  });

  describe('Bulk Actions', () => {
    it('shows bulk action buttons when rows are selected', () => {
      const property = createProperty();
      render(
        <PropertyTable {...defaultProps} properties={[property]} onBulkAction={mockOnBulkAction} />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      expect(screen.getByRole('button', { name: /Pausar/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Activar/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
    });

    it('calls onBulkAction with "pause" and selected properties', () => {
      const property = createProperty();
      render(
        <PropertyTable {...defaultProps} properties={[property]} onBulkAction={mockOnBulkAction} />
      );

      // Select row
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      // Click bulk pause
      const bulkPauseBtn = screen.getAllByRole('button', { name: /Pausar/i })[0];
      fireEvent.click(bulkPauseBtn);

      expect(mockOnBulkAction).toHaveBeenCalledWith('pause', [property]);
    });
  });

  describe('Pagination', () => {
    it('shows correct property count', () => {
      const properties = [
        createProperty({ id: '1' }),
        createProperty({ id: '2' }),
        createProperty({ id: '3' }),
      ];
      render(<PropertyTable {...defaultProps} properties={properties} />);

      expect(screen.getByText(/de 3 propiedades/)).toBeInTheDocument();
    });

    it('shows page information', () => {
      const property = createProperty();
      render(<PropertyTable {...defaultProps} properties={[property]} />);

      expect(screen.getByText(/Página 1 de/)).toBeInTheDocument();
    });
  });
});
