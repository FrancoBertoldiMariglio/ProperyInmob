import { useState, useCallback } from 'react';
import { Upload, X, Star, GripVertical, Image as ImageIcon } from 'lucide-react';
import { Button } from '@propery-agents/ui';
import type { PropertyImage } from '@propery-agents/api-client';

interface ImageUploaderProps {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 20 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      );

      if (files.length === 0) return;

      const remainingSlots = maxImages - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      const newImages: PropertyImage[] = filesToAdd.map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        isMain: images.length === 0 && index === 0,
        order: images.length + index,
      }));

      onChange([...images, ...newImages]);
    },
    [images, maxImages, onChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith('image/')
      );

      if (files.length === 0) return;

      const remainingSlots = maxImages - images.length;
      const filesToAdd = files.slice(0, remainingSlots);

      const newImages: PropertyImage[] = filesToAdd.map((file, index) => ({
        id: `temp-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        isMain: images.length === 0 && index === 0,
        order: images.length + index,
      }));

      onChange([...images, ...newImages]);
      e.target.value = '';
    },
    [images, maxImages, onChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const filtered = images.filter((img) => img.id !== id);
      // If we removed the main image, set the first one as main
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0] = { ...filtered[0], isMain: true };
      }
      onChange(filtered);
    },
    [images, onChange]
  );

  const handleSetMain = useCallback(
    (id: string) => {
      const updated = images.map((img) => ({
        ...img,
        isMain: img.id === id,
      }));
      onChange(updated);
    },
    [images, onChange]
  );

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleReorder = useCallback(
    (targetIndex: number) => {
      if (draggedIndex === null || draggedIndex === targetIndex) return;

      const newImages = [...images];
      const [removed] = newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, removed);

      // Update order
      const reordered = newImages.map((img, index) => ({
        ...img,
        order: index,
      }));

      onChange(reordered);
      setDraggedIndex(null);
    },
    [draggedIndex, images, onChange]
  );

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center
          rounded-lg border-2 border-dashed transition-colors
          ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
          }
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className={`mb-2 h-10 w-10 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Arrastra imágenes aquí o haz clic para seleccionar
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, WEBP hasta 10MB • Máximo {maxImages} imágenes
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {images.length}/{maxImages} imágenes
        </p>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images
            .sort((a, b) => a.order - b.order)
            .map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedIndex !== null && draggedIndex !== index) {
                    handleReorder(index);
                  }
                }}
                className={`
                  group relative aspect-square overflow-hidden rounded-lg border-2
                  ${image.isMain ? 'border-indigo-500' : 'border-transparent'}
                  ${draggedIndex === index ? 'opacity-50' : ''}
                `}
              >
                <img
                  src={image.thumbnailUrl}
                  alt={image.alt || `Imagen ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    size="sm"
                    variant={image.isMain ? 'default' : 'secondary'}
                    onClick={() => handleSetMain(image.id)}
                    title={image.isMain ? 'Imagen principal' : 'Marcar como principal'}
                  >
                    <Star className={`h-4 w-4 ${image.isMain ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(image.id)}
                    title="Eliminar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Drag Handle */}
                <div className="absolute left-1 top-1 cursor-grab rounded bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-4 w-4 text-white" />
                </div>

                {/* Main Badge */}
                {image.isMain && (
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 py-1 text-center text-xs font-medium text-white">
                    Principal
                  </div>
                )}

                {/* Order Number */}
                <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs font-medium text-white">
                  {index + 1}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-8 dark:border-gray-600">
          <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-500">No hay imágenes cargadas</p>
        </div>
      )}
    </div>
  );
}
