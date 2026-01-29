import { create } from 'zustand';

type CalendarView = 'month' | 'week' | 'day' | 'agenda';

interface CalendarState {
  // Current date in view
  currentDate: Date;

  // View mode
  view: CalendarView;

  // Selected date for new event
  selectedDate: Date | null;

  // Schedule modal
  scheduleModalOpen: boolean;
  editingVisitId: string | null;

  // Actions
  setCurrentDate: (date: Date) => void;
  goToToday: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  setView: (view: CalendarView) => void;
  selectDate: (date: Date | null) => void;

  // Modal actions
  openScheduleModal: (date?: Date, visitId?: string) => void;
  closeScheduleModal: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Initial state
  currentDate: new Date(),
  view: 'month',
  selectedDate: null,
  scheduleModalOpen: false,
  editingVisitId: null,

  // Actions
  setCurrentDate: (date) => set({ currentDate: date }),

  goToToday: () => set({ currentDate: new Date() }),

  goToPrevious: () =>
    set((state) => {
      const date = new Date(state.currentDate);
      switch (state.view) {
        case 'month':
          date.setMonth(date.getMonth() - 1);
          break;
        case 'week':
          date.setDate(date.getDate() - 7);
          break;
        case 'day':
        case 'agenda':
          date.setDate(date.getDate() - 1);
          break;
      }
      return { currentDate: date };
    }),

  goToNext: () =>
    set((state) => {
      const date = new Date(state.currentDate);
      switch (state.view) {
        case 'month':
          date.setMonth(date.getMonth() + 1);
          break;
        case 'week':
          date.setDate(date.getDate() + 7);
          break;
        case 'day':
        case 'agenda':
          date.setDate(date.getDate() + 1);
          break;
      }
      return { currentDate: date };
    }),

  setView: (view) => set({ view }),

  selectDate: (date) => set({ selectedDate: date }),

  // Modal actions
  openScheduleModal: (date, visitId) =>
    set({
      scheduleModalOpen: true,
      selectedDate: date || null,
      editingVisitId: visitId || null,
    }),

  closeScheduleModal: () =>
    set({
      scheduleModalOpen: false,
      selectedDate: null,
      editingVisitId: null,
    }),
}));
