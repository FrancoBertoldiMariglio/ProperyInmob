import type {
  Lead,
  CreateLeadInput,
  LeadFilters,
  LeadPipeline,
  LeadStatus,
  PaginatedResponse,
} from '../types';
import { mockLeads } from '../mocks/leadMocks';
import { sleep } from '@propery-agents/config';

const API_DELAY = 500;

export const leadApi = {
  async getLeads(filters?: LeadFilters): Promise<PaginatedResponse<Lead>> {
    await sleep(API_DELAY);

    let result = [...mockLeads];

    if (filters) {
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        result = result.filter((l) => statuses.includes(l.status));
      }
      if (filters.source) {
        const sources = Array.isArray(filters.source) ? filters.source : [filters.source];
        result = result.filter((l) => sources.includes(l.source));
      }
      if (filters.priority) {
        const priorities = Array.isArray(filters.priority) ? filters.priority : [filters.priority];
        result = result.filter((l) => priorities.includes(l.priority));
      }
      if (filters.propertyId) {
        result = result.filter((l) => l.propertyId === filters.propertyId);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        result = result.filter(
          (l) =>
            l.name.toLowerCase().includes(search) ||
            l.contact.email.toLowerCase().includes(search) ||
            l.contact.phone.includes(search)
        );
      }
    }

    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 20;
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

  async getLead(id: string): Promise<Lead | null> {
    await sleep(API_DELAY);
    return mockLeads.find((l) => l.id === id) || null;
  },

  async getLeadPipeline(): Promise<LeadPipeline> {
    await sleep(API_DELAY);

    const pipeline: LeadPipeline = {
      new: [],
      contacted: [],
      visited: [],
      negotiating: [],
      closed: [],
      lost: [],
    };

    mockLeads.forEach((lead) => {
      if (pipeline[lead.status]) {
        pipeline[lead.status].push(lead);
      }
    });

    return pipeline;
  },

  async createLead(data: CreateLeadInput): Promise<Lead> {
    await sleep(API_DELAY);
    const newLead: Lead = {
      id: Math.random().toString(36).slice(2),
      ...data,
      status: 'new',
      priority: data.priority || 'medium',
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockLeads.push(newLead);
    return newLead;
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    await sleep(API_DELAY);
    const index = mockLeads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Lead not found');

    mockLeads[index] = {
      ...mockLeads[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockLeads[index];
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
    await sleep(API_DELAY);
    const index = mockLeads.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('Lead not found');

    const oldStatus = mockLeads[index].status;
    mockLeads[index] = {
      ...mockLeads[index],
      status,
      updatedAt: new Date().toISOString(),
      activities: [
        ...mockLeads[index].activities,
        {
          id: Math.random().toString(36).slice(2),
          type: 'status_change',
          description: `Estado cambiado de "${oldStatus}" a "${status}"`,
          createdAt: new Date().toISOString(),
          createdBy: 'system',
        },
      ],
    };
    return mockLeads[index];
  },
};
