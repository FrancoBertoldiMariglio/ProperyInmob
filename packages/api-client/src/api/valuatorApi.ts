import type { Valuation, ValuationInput, Comparable } from '../types';
import { mockValuations, mockComparables, generateValuation } from '../mocks/valuatorMocks';
import { sleep } from '@propery-agents/config';

const API_DELAY = 1000; // Longer delay for "AI processing"

export const valuatorApi = {
  async getValuations(): Promise<Valuation[]> {
    await sleep(500);
    return mockValuations;
  },

  async getValuation(id: string): Promise<Valuation | null> {
    await sleep(500);
    return mockValuations.find((v) => v.id === id) || null;
  },

  async getComparables(_propertyId: string): Promise<Comparable[]> {
    await sleep(500);
    // Return a subset of comparables for the given property
    return mockComparables.slice(0, 8);
  },

  async createValuation(input: ValuationInput): Promise<Valuation> {
    await sleep(API_DELAY);
    const valuation = generateValuation(input);
    mockValuations.push(valuation);
    return valuation;
  },

  async generateReport(valuationId: string): Promise<{ url: string }> {
    await sleep(API_DELAY);
    // Simulate PDF generation
    const valuation = mockValuations.find((v) => v.id === valuationId);
    if (!valuation) throw new Error('Valuation not found');

    valuation.reportUrl = `/reports/valuation-${valuationId}.pdf`;
    return { url: valuation.reportUrl };
  },
};
