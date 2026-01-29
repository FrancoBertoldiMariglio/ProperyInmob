import type { Visit } from '@propery-agents/api-client';
import { VisitCard } from './VisitCard';

interface DayViewProps {
  currentDate: Date;
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export function DayView({ currentDate, visits, onVisitClick, onTimeSlotClick }: DayViewProps) {
  const dayVisits = visits.filter((visit) => isSameDay(new Date(visit.scheduledAt), currentDate));

  const getVisitsForHour = (hour: number): Visit[] => {
    return dayVisits.filter((visit) => {
      const visitDate = new Date(visit.scheduledAt);
      return visitDate.getHours() === hour;
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Time Grid */}
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          {hours.map((hour) => {
            const hourVisits = getVisitsForHour(hour);

            return (
              <div
                key={hour}
                onClick={() => onTimeSlotClick(currentDate, hour)}
                className="flex min-h-[80px] cursor-pointer border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <div className="w-20 flex-shrink-0 border-r border-gray-200 p-3 text-right text-sm text-gray-500 dark:border-gray-700">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="flex-1 space-y-2 p-2">
                  {hourVisits.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} onClick={onVisitClick} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda Sidebar */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Agenda del día ({dayVisits.length} visitas)
        </h3>

        {dayVisits.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
            <p className="text-gray-500">No hay visitas programadas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dayVisits
              .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
              .map((visit) => (
                <VisitCard key={visit.id} visit={visit} onClick={onVisitClick} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
