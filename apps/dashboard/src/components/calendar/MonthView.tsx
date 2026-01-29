import type { Visit } from '@propery-agents/api-client';
import { VisitCard } from './VisitCard';

interface MonthViewProps {
  currentDate: Date;
  visits: Visit[];
  onVisitClick: (visit: Visit) => void;
  onDayClick: (date: Date) => void;
}

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: Date[] = [];

  // Add days from previous month to fill the first week
  const startDayOfWeek = firstDay.getDay();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push(d);
  }

  // Add all days of the current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month to fill the last week
  const endDayOfWeek = lastDay.getDay();
  for (let i = 1; i < 7 - endDayOfWeek; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

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

export function MonthView({ currentDate, visits, onVisitClick, onDayClick }: MonthViewProps) {
  const days = getDaysInMonth(currentDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getVisitsForDay = (date: Date): Visit[] => {
    return visits.filter((visit) => isSameDay(new Date(visit.date), date));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-b border-gray-200 px-2 py-3 text-center text-sm font-medium text-gray-500 dark:border-gray-700"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayVisits = getVisitsForDay(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const today = isToday(day);

          return (
            <div
              key={index}
              onClick={() => onDayClick(day)}
              className={`
                min-h-[120px] cursor-pointer border-b border-r border-gray-200 p-2 transition-colors
                hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800
                ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-900'}
              `}
            >
              <div
                className={`
                  mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm
                  ${today ? 'bg-indigo-600 font-bold text-white' : ''}
                  ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900 dark:text-gray-100'}
                `}
              >
                {day.getDate()}
              </div>

              <div className="space-y-1">
                {dayVisits.slice(0, 3).map((visit) => (
                  <VisitCard key={visit.id} visit={visit} onClick={onVisitClick} compact />
                ))}
                {dayVisits.length > 3 && (
                  <div className="text-xs text-gray-500">+{dayVisits.length - 3} más</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
