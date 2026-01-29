import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageUploader } from './ImageUploader';
import type { PropertyImage } from '@propery-agents/api-client';

// Helper to create test images
const createImage = (overrides: Partial<PropertyImage> = {}): PropertyImage => ({
  id: 'img-1',
  url: 'https://example.com/image.jpg',
  thumbnailUrl: 'https://example.com/image-thumb.jpg',
  isMain: false,
  order: 0,
  ...overrides,
});

// Mock URL.createObjectURL
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.createObjectURL = mockCreateObjectURL;

describe('ImageUploader', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders drop zone with instructions', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      expect(screen.getByText(/Arrastra imágenes aquí/)).toBeInTheDocument();
      expect(screen.getByText(/PNG, JPG, WEBP/)).toBeInTheDocument();
    });

    it('shows image count', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} maxImages={20} />);

      expect(screen.getByText('0/20 imágenes')).toBeInTheDocument();
    });

    it('shows current image count when images exist', () => {
      const images = [createImage({ id: '1' }), createImage({ id: '2' })];
      render(<ImageUploader images={images} onChange={mockOnChange} maxImages={20} />);

      expect(screen.getByText('2/20 imágenes')).toBeInTheDocument();
    });

    it('shows empty state when no images', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      expect(screen.getByText('No hay imágenes cargadas')).toBeInTheDocument();
    });

    it('shows custom maxImages value', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} maxImages={10} />);

      expect(screen.getByText(/Máximo 10 imágenes/)).toBeInTheDocument();
    });
  });

  describe('Image Display', () => {
    it('renders images in grid', () => {
      const images = [
        createImage({ id: '1', thumbnailUrl: 'thumb1.jpg' }),
        createImage({ id: '2', thumbnailUrl: 'thumb2.jpg' }),
      ];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      const imgs = screen.getAllByRole('img');
      expect(imgs).toHaveLength(2);
    });

    it('shows "Principal" badge on main image', () => {
      const images = [createImage({ id: '1', isMain: true })];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      expect(screen.getByText('Principal')).toBeInTheDocument();
    });

    it('shows order number on images', () => {
      const images = [createImage({ id: '1', order: 0 }), createImage({ id: '2', order: 1 })];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('File Input', () => {
    it('renders hidden file input', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('accept', 'image/*');
      expect(input).toHaveAttribute('multiple');
    });

    it('handles file selection', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(input, 'files', { value: [file] });

      fireEvent.change(input);

      expect(mockOnChange).toHaveBeenCalled();
      const newImages = mockOnChange.mock.calls[0][0];
      expect(newImages).toHaveLength(1);
      expect(newImages[0].isMain).toBe(true); // First image is main
    });

    it('sets first image as main when adding to empty list', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(input, 'files', { value: [file] });

      fireEvent.change(input);

      const newImages = mockOnChange.mock.calls[0][0];
      expect(newImages[0].isMain).toBe(true);
    });

    it('does not set new images as main when images already exist', () => {
      const existingImages = [createImage({ id: '1', isMain: true })];
      render(<ImageUploader images={existingImages} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(input, 'files', { value: [file] });

      fireEvent.change(input);

      const allImages = mockOnChange.mock.calls[0][0];
      const newImage = allImages.find((img: PropertyImage) => img.id !== '1');
      expect(newImage.isMain).toBe(false);
    });

    it('respects maxImages limit when adding files', () => {
      const existingImages = [createImage({ id: '1' })];
      render(<ImageUploader images={existingImages} onChange={mockOnChange} maxImages={2} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const files = [
        new File(['1'], 'test1.jpg', { type: 'image/jpeg' }),
        new File(['2'], 'test2.jpg', { type: 'image/jpeg' }),
        new File(['3'], 'test3.jpg', { type: 'image/jpeg' }),
      ];
      Object.defineProperty(input, 'files', { value: files });

      fireEvent.change(input);

      const allImages = mockOnChange.mock.calls[0][0];
      // Should only add 1 image (2 max - 1 existing = 1 slot)
      expect(allImages).toHaveLength(2);
    });

    it('filters non-image files', () => {
      render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const files = [
        new File(['image'], 'test.jpg', { type: 'image/jpeg' }),
        new File(['text'], 'test.txt', { type: 'text/plain' }),
      ];
      Object.defineProperty(input, 'files', { value: files });

      fireEvent.change(input);

      const newImages = mockOnChange.mock.calls[0][0];
      expect(newImages).toHaveLength(1);
    });
  });

  describe('Drag and Drop', () => {
    it('changes style on drag over', () => {
      const { container } = render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const dropZone = container.querySelector('.border-dashed');

      fireEvent.dragOver(dropZone!, { preventDefault: () => {} });

      expect(dropZone).toHaveClass('border-indigo-500');
    });

    it('resets style on drag leave', () => {
      const { container } = render(<ImageUploader images={[]} onChange={mockOnChange} />);

      const dropZone = container.querySelector('.border-dashed');

      fireEvent.dragOver(dropZone!);
      fireEvent.dragLeave(dropZone!);

      expect(dropZone).not.toHaveClass('border-indigo-500');
    });
  });

  describe('Image Actions', () => {
    it('removes image when delete button is clicked', () => {
      const images = [
        createImage({ id: '1', isMain: true }),
        createImage({ id: '2', isMain: false }),
      ];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      // Find delete buttons (with X icon)
      const deleteButtons = screen.getAllByTitle('Eliminar');
      fireEvent.click(deleteButtons[0]);

      const updatedImages = mockOnChange.mock.calls[0][0];
      expect(updatedImages).toHaveLength(1);
      expect(updatedImages[0].id).toBe('2');
    });

    it('sets new main image when main is removed', () => {
      const images = [
        createImage({ id: '1', isMain: true }),
        createImage({ id: '2', isMain: false }),
      ];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      const deleteButtons = screen.getAllByTitle('Eliminar');
      fireEvent.click(deleteButtons[0]); // Remove main image

      const updatedImages = mockOnChange.mock.calls[0][0];
      expect(updatedImages[0].isMain).toBe(true);
    });

    it('sets image as main when star button is clicked', () => {
      const images = [
        createImage({ id: '1', isMain: true }),
        createImage({ id: '2', isMain: false }),
      ];
      render(<ImageUploader images={images} onChange={mockOnChange} />);

      // Find the "set as main" buttons
      const starButtons = screen.getAllByTitle('Marcar como principal');
      fireEvent.click(starButtons[0]); // Click on non-main image's star

      const updatedImages = mockOnChange.mock.calls[0][0];
      const mainImage = updatedImages.find((img: PropertyImage) => img.isMain);
      expect(mainImage.id).toBe('2');
    });
  });
});
