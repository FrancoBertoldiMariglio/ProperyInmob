import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Visit, CreateVisitInput } from '@propery-agents/api-client';
import { calendarApi } from '@propery-agents/api-client';

export const calendarKeys = {
  all: ['calendar'] as const,
  visits: () => [...calendarKeys.all, 'visits'] as const,
  visitsByDate: (startDate: string, endDate: string) =>
    [...calendarKeys.visits(), startDate, endDate] as const,
  visit: (id: string) => [...calendarKeys.all, 'visit', id] as const,
  todayVisits: () => [...calendarKeys.all, 'today'] as const,
};

export function useVisits(startDate: string, endDate: string) {
  return useQuery({
    queryKey: calendarKeys.visitsByDate(startDate, endDate),
    queryFn: () => calendarApi.getVisits(startDate, endDate),
  });
}

export function useVisit(id: string) {
  return useQuery({
    queryKey: calendarKeys.visit(id),
    queryFn: () => calendarApi.getVisit(id),
    enabled: !!id,
  });
}

export function useTodayVisits() {
  return useQuery({
    queryKey: calendarKeys.todayVisits(),
    queryFn: () => calendarApi.getTodayVisits(),
  });
}

export function useCreateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVisitInput) => calendarApi.createVisit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.visits() });
      queryClient.invalidateQueries({ queryKey: calendarKeys.todayVisits() });
    },
  });
}

export function useUpdateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Visit> }) =>
      calendarApi.updateVisit(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.visit(id) });
      queryClient.invalidateQueries({ queryKey: calendarKeys.visits() });
      queryClient.invalidateQueries({ queryKey: calendarKeys.todayVisits() });
    },
  });
}

export function useDeleteVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => calendarApi.deleteVisit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: calendarKeys.visits() });
      queryClient.invalidateQueries({ queryKey: calendarKeys.todayVisits() });
    },
  });
}
