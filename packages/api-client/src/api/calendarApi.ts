import type { Visit, CreateVisitInput } from '../types';
import { mockVisits } from '../mocks/calendarMocks';
import { sleep } from '@propery-agents/config';

const API_DELAY = 500;

export const calendarApi = {
  async getVisits(startDate: string, endDate: string): Promise<Visit[]> {
    await sleep(API_DELAY);
    return mockVisits.filter((v) => {
      const visitDate = new Date(v.date);
      return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
    });
  },

  async getVisit(id: string): Promise<Visit | null> {
    await sleep(API_DELAY);
    return mockVisits.find((v) => v.id === id) || null;
  },

  async getTodayVisits(): Promise<Visit[]> {
    await sleep(API_DELAY);
    const today = new Date().toISOString().split('T')[0];
    return mockVisits.filter((v) => v.date.startsWith(today));
  },

  async createVisit(data: CreateVisitInput): Promise<Visit> {
    await sleep(API_DELAY);

    // Calculate end time
    const [hours, minutes] = data.startTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes + data.duration);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    const newVisit: Visit = {
      id: Math.random().toString(36).slice(2),
      ...data,
      endTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockVisits.push(newVisit);
    return newVisit;
  },

  async updateVisit(id: string, data: Partial<Visit>): Promise<Visit> {
    await sleep(API_DELAY);
    const index = mockVisits.findIndex((v) => v.id === id);
    if (index === -1) throw new Error('Visit not found');

    mockVisits[index] = {
      ...mockVisits[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockVisits[index];
  },

  async deleteVisit(id: string): Promise<void> {
    await sleep(API_DELAY);
    const index = mockVisits.findIndex((v) => v.id === id);
    if (index !== -1) {
      mockVisits.splice(index, 1);
    }
  },
};
