import { create } from 'zustand';
import type { CreatePropertyInput, PropertyType, OperationType } from '@propery-agents/api-client';

interface PropertyFormState {
  // Form data
  formData: Partial<CreatePropertyInput>;

  // Current step (for multi-step form)
  currentStep: number;
  totalSteps: number;

  // Image upload state
  uploadingImages: boolean;
  images: Array<{
    id: string;
    url: string;
    isMain: boolean;
    order: number;
  }>;

  // Actions
  setFormData: (data: Partial<CreatePropertyInput>) => void;
  updateField: <K extends keyof CreatePropertyInput>(
    field: K,
    value: CreatePropertyInput[K]
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;

  // Image actions
  addImage: (url: string) => void;
  removeImage: (id: string) => void;
  setMainImage: (id: string) => void;
  reorderImages: (startIndex: number, endIndex: number) => void;
  setUploadingImages: (uploading: boolean) => void;

  // Reset
  resetForm: () => void;
}

const initialFormData: Partial<CreatePropertyInput> = {
  type: 'apartment' as PropertyType,
  operation: 'sale' as OperationType,
  status: 'draft',
};

export const usePropertyFormStore = create<PropertyFormState>((set, get) => ({
  // Initial state
  formData: initialFormData,
  currentStep: 0,
  totalSteps: 5, // Basic, Location, Features, Amenities, Photos
  uploadingImages: false,
  images: [],

  // Form data actions
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  // Step navigation
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep: Math.max(0, Math.min(step, state.totalSteps - 1)),
    })),

  // Image actions
  addImage: (url) =>
    set((state) => ({
      images: [
        ...state.images,
        {
          id: Math.random().toString(36).slice(2),
          url,
          isMain: state.images.length === 0,
          order: state.images.length,
        },
      ],
    })),

  removeImage: (id) =>
    set((state) => ({
      images: state.images
        .filter((img) => img.id !== id)
        .map((img, index) => ({ ...img, order: index })),
    })),

  setMainImage: (id) =>
    set((state) => ({
      images: state.images.map((img) => ({
        ...img,
        isMain: img.id === id,
      })),
    })),

  reorderImages: (startIndex, endIndex) =>
    set((state) => {
      const newImages = [...state.images];
      const [removed] = newImages.splice(startIndex, 1);
      newImages.splice(endIndex, 0, removed);
      return {
        images: newImages.map((img, index) => ({ ...img, order: index })),
      };
    }),

  setUploadingImages: (uploading) => set({ uploadingImages: uploading }),

  // Reset
  resetForm: () =>
    set({
      formData: initialFormData,
      currentStep: 0,
      images: [],
      uploadingImages: false,
    }),
}));
