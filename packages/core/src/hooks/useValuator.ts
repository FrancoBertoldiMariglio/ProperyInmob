import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ValuationInput, Valuation } from '@propery-agents/api-client';
import { valuatorApi } from '@propery-agents/api-client';

export const valuatorKeys = {
  all: ['valuator'] as const,
  valuations: () => [...valuatorKeys.all, 'list'] as const,
  valuation: (id: string) => [...valuatorKeys.all, 'detail', id] as const,
  comparables: (propertyId: string) => [...valuatorKeys.all, 'comparables', propertyId] as const,
};

export function useValuations() {
  return useQuery({
    queryKey: valuatorKeys.valuations(),
    queryFn: () => valuatorApi.getValuations(),
  });
}

export function useValuation(id: string) {
  return useQuery({
    queryKey: valuatorKeys.valuation(id),
    queryFn: () => valuatorApi.getValuation(id),
    enabled: !!id,
  });
}

export function useComparables(propertyId: string) {
  return useQuery({
    queryKey: valuatorKeys.comparables(propertyId),
    queryFn: () => valuatorApi.getComparables(propertyId),
    enabled: !!propertyId,
  });
}

export function useCreateValuation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ValuationInput) => valuatorApi.createValuation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: valuatorKeys.valuations() });
    },
  });
}

export function useGenerateValuationReport() {
  return useMutation({
    mutationFn: (valuationId: string) => valuatorApi.generateReport(valuationId),
  });
}
