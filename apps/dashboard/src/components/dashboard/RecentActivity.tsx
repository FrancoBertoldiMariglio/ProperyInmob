import { useMemo } from 'react';
import { formatRelativeTime } from '@propery-agents/config';
import { Avatar } from '@propery-agents/ui';
import { Building2, UserPlus, Calendar, DollarSign, Eye, MessageSquare } from 'lucide-react';
import { cn } from '@propery-agents/config';

interface Activity {
  id: string;
  type: 'lead' | 'visit' | 'property' | 'sale' | 'view' | 'message';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface RecentActivityProps {
  className?: string;
}

const activityIcons = {
  lead: {
    icon: UserPlus,
    color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
  },
  visit: {
    icon: Calendar,
    color: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
  },
  property: {
    icon: Building2,
    color: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
  },
  sale: {
    icon: DollarSign,
    color: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
  },
  view: { icon: Eye, color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
  message: {
    icon: MessageSquare,
    color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
  },
};

export function RecentActivity({ className }: RecentActivityProps) {
  // Mock recent activity
  const activities: Activity[] = useMemo(
    () => [
      {
        id: '1',
        type: 'lead',
        title: 'Nuevo lead recibido',
        description: 'Juan Perez interesado en Depto Palermo',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
        user: 'Juan Perez',
      },
      {
        id: '2',
        type: 'visit',
        title: 'Visita confirmada',
        description: 'Carolina Martinez - Casa Martinez',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        user: 'Carolina Martinez',
      },
      {
        id: '3',
        type: 'sale',
        title: 'Reserva firmada!',
        description: 'PH Villa Crespo - USD 220,000',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        id: '4',
        type: 'property',
        title: 'Propiedad publicada',
        description: 'Depto 3 amb Belgrano en ZonaProp',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      },
      {
        id: '5',
        type: 'message',
        title: 'Nuevo mensaje',
        description: 'Consulta sobre Oficina Puerto Madero',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        user: 'Empresa Tech SA',
      },
    ],
    []
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actividad Reciente</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver todo
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const { icon: Icon, color } = activityIcons[activity.type];

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn('p-2 rounded-lg shrink-0', color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
              {activity.user && <Avatar name={activity.user} size="sm" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
