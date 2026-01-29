import { Clock, MapPin, User, Check, X } from 'lucide-react';
import { Badge } from '@propery-agents/ui';
import type { Visit } from '@propery-agents/api-client';

interface VisitCardProps {
  visit: Visit;
  onClick: (visit: Visit) => void;
  compact?: boolean;
}

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  scheduled: 'default',
  confirmed: 'success',
  completed: 'success',
  cancelled: 'destructive',
  no_show: 'warning',
};

const statusLabels: Record<string, string> = {
  scheduled: 'Agendada',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
  no_show: 'No asistió',
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function VisitCard({ visit, onClick, compact = false }: VisitCardProps) {
  if (compact) {
    return (
      <button
        onClick={() => onClick(visit)}
        className={`
          w-full truncate rounded px-2 py-1 text-left text-xs
          ${
            visit.status === 'confirmed'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : visit.status === 'cancelled'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
          }
        `}
      >
        <span className="font-medium">{formatTime(visit.scheduledAt)}</span>
        {' - '}
        {visit.lead?.name || 'Sin lead'}
      </button>
    );
  }

  return (
    <div
      onClick={() => onClick(visit)}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="font-medium">
            {formatTime(visit.scheduledAt)}
            {visit.duration && ` (${visit.duration} min)`}
          </span>
        </div>
        <Badge variant={statusColors[visit.status]}>{statusLabels[visit.status]}</Badge>
      </div>

      {visit.property && (
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="truncate">
            {visit.property.address.street} {visit.property.address.number}
          </span>
        </div>
      )}

      {visit.lead && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <User className="h-4 w-4 text-gray-400" />
          <span>{visit.lead.name}</span>
        </div>
      )}

      {visit.notes && <p className="mt-2 text-sm text-gray-500 line-clamp-2">{visit.notes}</p>}
    </div>
  );
}
