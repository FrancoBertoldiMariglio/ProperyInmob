import { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@propery-agents/ui';
import { useVisits, useProperties, useLeads } from '@propery-agents/core';
import type { Visit, CreateVisitInput } from '@propery-agents/api-client';
import { CalendarHeader, MonthView, WeekView, DayView, ScheduleModal } from '@/components/calendar';

type ViewMode = 'month' | 'week' | 'day';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [initialDate, setInitialDate] = useState<Date | undefined>();
  const [initialHour, setInitialHour] = useState<number | undefined>();

  const startDate = useMemo(
    () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString(),
    [currentDate]
  );
  const endDate = useMemo(
    () => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString(),
    [currentDate]
  );

  const { data: visits = [], refetch } = useVisits(startDate, endDate);
  const { data: propertiesData } = useProperties({});
  const { data: leadsData } = useLeads({});

  const properties = useMemo(() => propertiesData?.data ?? [], [propertiesData]);
  const leads = useMemo(() => leadsData?.data ?? [], [leadsData]);

  const handlePrevious = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === 'month') {
        newDate.setMonth(prev.getMonth() - 1);
      } else if (viewMode === 'week') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() - 1);
      }
      return newDate;
    });
  }, [viewMode]);

  const handleNext = useCallback(() => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === 'month') {
        newDate.setMonth(prev.getMonth() + 1);
      } else if (viewMode === 'week') {
        newDate.setDate(prev.getDate() + 7);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  }, [viewMode]);

  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleVisitClick = useCallback((visit: Visit) => {
    setSelectedVisit(visit);
    setInitialDate(undefined);
    setInitialHour(undefined);
    setShowScheduleModal(true);
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    setCurrentDate(date);
    setViewMode('day');
  }, []);

  const handleTimeSlotClick = useCallback((date: Date, hour: number) => {
    setSelectedVisit(null);
    setInitialDate(date);
    setInitialHour(hour);
    setShowScheduleModal(true);
  }, []);

  const handleCreateNew = useCallback(() => {
    setSelectedVisit(null);
    setInitialDate(new Date());
    setInitialHour(10);
    setShowScheduleModal(true);
  }, []);

  const handleSubmitVisit = useCallback(
    (data: CreateVisitInput) => {
      // TODO: Implement create/update mutation
      console.log('Submit visit:', data);
      setShowScheduleModal(false);
      refetch();
    },
    [refetch]
  );

  const handleDeleteVisit = useCallback(
    (visit: Visit) => {
      if (window.confirm('Eliminar esta visita?')) {
        // TODO: Implement delete mutation
        console.log('Delete visit:', visit.id);
        setShowScheduleModal(false);
        refetch();
      }
    },
    [refetch]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Calendario</h1>
          <p className="text-gray-500">
            {visits.length} visita{visits.length !== 1 ? 's' : ''} programada
            {visits.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva visita
        </Button>
      </div>

      {/* Calendar Navigation */}
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewModeChange={setViewMode}
      />

      {/* Calendar Views */}
      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          visits={visits}
          onVisitClick={handleVisitClick}
          onDayClick={handleDayClick}
        />
      )}

      {viewMode === 'week' && (
        <WeekView
          currentDate={currentDate}
          visits={visits}
          onVisitClick={handleVisitClick}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}

      {viewMode === 'day' && (
        <DayView
          currentDate={currentDate}
          visits={visits}
          onVisitClick={handleVisitClick}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={showScheduleModal}
        visit={selectedVisit || undefined}
        initialDate={initialDate}
        initialHour={initialHour}
        properties={properties}
        leads={leads}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleSubmitVisit}
        onDelete={selectedVisit ? handleDeleteVisit : undefined}
      />
    </div>
  );
}

export default Calendar;
