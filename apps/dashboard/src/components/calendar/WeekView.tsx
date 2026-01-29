import type { Visit } from '@propery-agents/api-client';
import { VisitCard } from './VisitCard';

interface WeekViewProps {
  currentDate: Date;
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

const getWeekDays = (date: Date): Date[] => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push(d);
  }
  return days;
};

const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const formatDayName = (date: Date): string => {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return days[date.getDay()];
};

export function WeekView({ currentDate, visits, onVisitClick, onTimeSlotClick }: WeekViewProps) {
  const weekDays = getWeekDays(currentDate);

  const getVisitsForDayAndHour = (date: Date, hour: number): Visit[] => {
    return visits.filter((visit) => {
      const visitDate = new Date(visit.date);
      const [visitHour] = visit.startTime.split(':').map(Number);
      return isSameDay(visitDate, date) && visitHour === hour;
    });
  };

  return (
    <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="sticky top-0 z-10 grid grid-cols-8 bg-gray-50 dark:bg-gray-800">
          <div className="border-b border-r border-gray-200 p-2 dark:border-gray-700" />
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`
                border-b border-r border-gray-200 p-2 text-center dark:border-gray-700
                ${isToday(day) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}
              `}
            >
              <div className="text-sm text-gray-500">{formatDayName(day)}</div>
              <div
                className={`
                  mx-auto mt-1 flex h-8 w-8 items-center justify-center rounded-full text-lg font-medium
                  ${isToday(day) ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-100'}
                `}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid grid-cols-8">
          {hours.map((hour) => (
            <div key={hour} className="contents">
              {/* Time Label */}
              <div className="border-b border-r border-gray-200 p-2 text-right text-sm text-gray-500 dark:border-gray-700">
                {hour.toString().padStart(2, '0')}:00
              </div>

              {/* Day Columns */}
              {weekDays.map((day, dayIndex) => {
                const dayVisits = getVisitsForDayAndHour(day, hour);

                return (
                  <div
                    key={dayIndex}
                    onClick={() => onTimeSlotClick(day, hour)}
                    className={`
                      min-h-[60px] cursor-pointer border-b border-r border-gray-200 p-1
                      transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800
                      ${isToday(day) ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}
                    `}
                  >
                    {dayVisits.map((visit) => (
                      <VisitCard key={visit.id} visit={visit} onClick={onVisitClick} compact />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
