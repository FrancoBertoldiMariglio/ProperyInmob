import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Lead, LeadStatus } from '@propery-agents/api-client';
import { LeadCard } from './LeadCard';

interface LeadColumnProps {
  status: LeadStatus;
  leads: Lead[];
  title: string;
  color: string;
  onViewLead: (lead: Lead) => void;
  onQuickAction: (lead: Lead, action: string) => void;
}

export function LeadColumn({
  status,
  leads,
  title,
  color,
  onViewLead,
  onQuickAction,
}: LeadColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div
      className={`
        flex h-full min-w-[280px] flex-col rounded-lg bg-gray-100 dark:bg-gray-800/50
        ${isOver ? 'ring-2 ring-indigo-500' : ''}
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gray-200 px-2 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {leads.length}
        </span>
      </div>

      {/* Column Content */}
      <div ref={setNodeRef} className="flex-1 space-y-2 overflow-y-auto p-2">
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onView={onViewLead} onQuickAction={onQuickAction} />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400 dark:border-gray-600">
            Sin leads
          </div>
        )}
      </div>
    </div>
  );
}
