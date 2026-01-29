import { useNavigate } from 'react-router-dom';
import { Building2, UserPlus, CalendarPlus, Calculator } from 'lucide-react';
import { cn } from '@propery-agents/config';

interface QuickActionsProps {
  className?: string;
}

const actions = [
  {
    id: 'new-property',
    name: 'Nueva Propiedad',
    description: 'Agregar propiedad',
    icon: Building2,
    href: '/properties/new',
    color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
  },
  {
    id: 'new-lead',
    name: 'Nuevo Lead',
    description: 'Registrar cliente',
    icon: UserPlus,
    href: '/leads/new',
    color: 'bg-success-50 text-success-600 dark:bg-success-900/20 dark:text-success-400',
  },
  {
    id: 'new-visit',
    name: 'Agendar Visita',
    description: 'Programar visita',
    icon: CalendarPlus,
    href: '/calendar?action=new',
    color: 'bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-400',
  },
  {
    id: 'new-valuation',
    name: 'Valuacion',
    description: 'Generar valuacion',
    icon: Calculator,
    href: '/valuator',
    color: 'bg-warning-50 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400',
  },
];

export function QuickActions({ className }: QuickActionsProps) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acciones Rapidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.href)}
            className={cn(
              'flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700',
              'hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all',
              'bg-white dark:bg-gray-800'
            )}
          >
            <div className={cn('p-3 rounded-lg mb-2', action.color)}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
