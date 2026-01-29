import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Building2,
  Globe,
  Instagram,
  Facebook,
  MoreHorizontal,
} from 'lucide-react';
import { Badge, Button } from '@propery-agents/ui';
import type { Lead } from '@propery-agents/api-client';

interface LeadCardProps {
  lead: Lead;
  onView: (lead: Lead) => void;
  onQuickAction: (lead: Lead, action: string) => void;
}

const priorityColors: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  high: 'error',
  medium: 'warning',
  low: 'default',
};

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const sourceIcons: Record<string, React.ReactNode> = {
  zonaprop: <Globe className="h-3 w-3" />,
  argenprop: <Globe className="h-3 w-3" />,
  mercadolibre: <Globe className="h-3 w-3" />,
  instagram: <Instagram className="h-3 w-3" />,
  facebook: <Facebook className="h-3 w-3" />,
  whatsapp: <MessageCircle className="h-3 w-3" />,
  referral: <Building2 className="h-3 w-3" />,
  direct: <Phone className="h-3 w-3" />,
  website: <Globe className="h-3 w-3" />,
};

const getTimeSinceLastContact = (date: string): string => {
  const now = new Date();
  const lastContact = new Date(date);
  const diffMs = now.getTime() - lastContact.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  return 'Ahora';
};

export function LeadCard({ lead, onView, onQuickAction }: LeadCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const lastActivity = lead.activities?.[0];
  const timeSinceContact = lastActivity
    ? getTimeSinceLastContact(lastActivity.createdAt)
    : 'Sin contacto';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        group cursor-grab rounded-lg border border-gray-200 bg-white p-3 shadow-sm
        transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800
        ${isDragging ? 'opacity-50 shadow-lg' : ''}
      `}
      onClick={() => onView(lead)}
    >
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</h4>
          {lead.propertyTitle && (
            <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{lead.propertyTitle}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={priorityColors[lead.priority]} className="text-[10px]">
            {priorityLabels[lead.priority]}
          </Badge>
        </div>
      </div>

      {/* Meta */}
      <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1" title={`Fuente: ${lead.source}`}>
          {sourceIcons[lead.source] || <Globe className="h-3 w-3" />}
          <span className="capitalize">{lead.source}</span>
        </span>
        <span className="flex items-center gap-1" title="Último contacto">
          <Clock className="h-3 w-3" />
          {timeSinceContact}
        </span>
      </div>

      {/* Quick Actions */}
      <div
        className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0"
          onClick={() => onQuickAction(lead, 'call')}
          title="Llamar"
        >
          <Phone className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0"
          onClick={() => onQuickAction(lead, 'email')}
          title="Email"
        >
          <Mail className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0"
          onClick={() => onQuickAction(lead, 'whatsapp')}
          title="WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="ml-auto h-7 w-7 p-0"
          onClick={() => onQuickAction(lead, 'more')}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
