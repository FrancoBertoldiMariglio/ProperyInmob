import type { Property, CreatePropertyInput, PropertyFilters, PaginatedResponse } from '../types';
import { mockProperties } from '../mocks/propertyMocks';
import { sleep } from '@propery-agents/config';

// Simulated API delay
const API_DELAY = 500;

export const propertyApi = {
  async getProperties(filters?: PropertyFilters): Promise<PaginatedResponse<Property>> {
    await sleep(API_DELAY);

    let result = [...mockProperties];

    // Apply filters
    if (filters) {
      if (filters.type) {
        const types = Array.isArray(filters.type) ? filters.type : [filters.type];
        result = result.filter((p) => types.includes(p.type));
      }
      if (filters.operation) {
        const ops = Array.isArray(filters.operation) ? filters.operation : [filters.operation];
        result = result.filter((p) => ops.includes(p.operation));
      }
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        result = result.filter((p) => statuses.includes(p.status));
      }
      if (filters.priceMin) {
        result = result.filter((p) => p.price >= filters.priceMin!);
      }
      if (filters.priceMax) {
        result = result.filter((p) => p.price <= filters.priceMax!);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(search) ||
            p.address.neighborhood.toLowerCase().includes(search) ||
            p.address.city.toLowerCase().includes(search)
        );
      }
    }

    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paginatedData = result.slice(start, start + pageSize);

    return {
      data: paginatedData,
      total: result.length,
      page,
      pageSize,
      totalPages: Math.ceil(result.length / pageSize),
    };
  },

  async getProperty(id: string): Promise<Property | null> {
    await sleep(API_DELAY);
    return mockProperties.find((p) => p.id === id) || null;
  },

  async createProperty(data: CreatePropertyInput): Promise<Property> {
    await sleep(API_DELAY);
    const newProperty: Property = {
      id: Math.random().toString(36).slice(2),
      ...data,
      status: data.status || 'draft',
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
        ...data.amenities,
      },
      images: data.images?.map((img, i) => ({ ...img, id: `img-${i}` })) || [],
      portals: [],
      stats: {
        views: 0,
        leads: 0,
        visits: 0,
        daysOnMarket: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProperties.push(newProperty);
    return newProperty;
  },

  async updateProperty(id: string, data: Partial<Property>): Promise<Property> {
    await sleep(API_DELAY);
    const index = mockProperties.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Property not found');

    mockProperties[index] = {
      ...mockProperties[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockProperties[index];
  },

  async deleteProperty(id: string): Promise<void> {
    await sleep(API_DELAY);
    const index = mockProperties.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProperties.splice(index, 1);
    }
  },
};
