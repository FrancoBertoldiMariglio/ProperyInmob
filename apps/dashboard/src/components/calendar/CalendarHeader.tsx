import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@propery-agents/ui';

type ViewMode = 'month' | 'week' | 'day';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const formatTitle = (date: Date, mode: ViewMode): string => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  if (mode === 'month') {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  if (mode === 'week') {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${months[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
    }
    return `${startOfWeek.getDate()} ${months[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${months[endOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
  }

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export function CalendarHeader({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  onViewModeChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Hoy
        </Button>
        <h2 className="ml-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          {formatTitle(currentDate, viewMode)}
        </h2>
      </div>

      <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
        {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
          <Button
            key={mode}
            variant={viewMode === mode ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange(mode)}
            className={`rounded-none first:rounded-l-lg last:rounded-r-lg`}
          >
            {mode === 'month' ? 'Mes' : mode === 'week' ? 'Semana' : 'Día'}
          </Button>
        ))}
      </div>
    </div>
  );
}
