import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Lead, LeadFilters, CreateLeadInput } from '@propery-agents/api-client';
import { leadApi } from '@propery-agents/api-client';

export const leadKeys = {
  all: ['leads'] as const,
  lists: () => [...leadKeys.all, 'list'] as const,
  list: (filters: LeadFilters) => [...leadKeys.lists(), filters] as const,
  details: () => [...leadKeys.all, 'detail'] as const,
  detail: (id: string) => [...leadKeys.details(), id] as const,
  pipeline: () => [...leadKeys.all, 'pipeline'] as const,
};

export function useLeads(filters?: LeadFilters) {
  return useQuery({
    queryKey: leadKeys.list(filters || {}),
    queryFn: () => leadApi.getLeads(filters),
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),
    queryFn: () => leadApi.getLead(id),
    enabled: !!id,
  });
}

export function useLeadPipeline() {
  return useQuery({
    queryKey: leadKeys.pipeline(),
    queryFn: () => leadApi.getLeadPipeline(),
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadInput) => leadApi.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.pipeline() });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => leadApi.updateLead(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.pipeline() });
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Lead['status'] }) =>
      leadApi.updateLeadStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.pipeline() });
    },
  });
}
