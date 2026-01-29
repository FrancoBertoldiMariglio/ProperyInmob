import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Lead, LeadStatus } from '@propery-agents/api-client';
import { LeadColumn } from './LeadColumn';
import { LeadCard } from './LeadCard';

interface LeadPipelineProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onViewLead: (lead: Lead) => void;
  onQuickAction: (lead: Lead, action: string) => void;
}

interface ColumnConfig {
  status: LeadStatus;
  title: string;
  color: string;
}

const columns: ColumnConfig[] = [
  { status: 'new', title: 'Nuevos', color: 'bg-blue-500' },
  { status: 'contacted', title: 'Contactados', color: 'bg-yellow-500' },
  { status: 'visited', title: 'Visitaron', color: 'bg-cyan-500' },
  { status: 'negotiating', title: 'Negociando', color: 'bg-orange-500' },
  { status: 'closed', title: 'Cerrados', color: 'bg-green-500' },
  { status: 'lost', title: 'Perdidos', color: 'bg-gray-500' },
];

export function LeadPipeline({
  leads,
  onStatusChange,
  onViewLead,
  onQuickAction,
}: LeadPipelineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);

  // Update local leads when props change
  useMemo(() => {
    setLocalLeads(leads);
  }, [leads]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const leadsByStatus = useMemo(() => {
    const grouped: Record<LeadStatus, Lead[]> = {
      new: [],
      contacted: [],
      visited: [],
      negotiating: [],
      closed: [],
      lost: [],
    };

    localLeads.forEach((lead) => {
      if (grouped[lead.status]) {
        grouped[lead.status].push(lead);
      }
    });

    return grouped;
  }, [localLeads]);

  const activeLead = useMemo(
    () => localLeads.find((l) => l.id === activeId),
    [localLeads, activeId]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = localLeads.find((l) => l.id === activeId);
    if (!activeLead) return;

    // Check if dropping on a column
    const overColumn = columns.find((c) => c.status === overId);
    if (overColumn && activeLead.status !== overColumn.status) {
      setLocalLeads((prev) =>
        prev.map((lead) => (lead.id === activeId ? { ...lead, status: overColumn.status } : lead))
      );
    }

    // Check if dropping on another lead
    const overLead = localLeads.find((l) => l.id === overId);
    if (overLead && activeLead.status !== overLead.status) {
      setLocalLeads((prev) =>
        prev.map((lead) => (lead.id === activeId ? { ...lead, status: overLead.status } : lead))
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeLead = localLeads.find((l) => l.id === activeId);
    if (!activeLead) return;

    // Find original lead to check if status changed
    const originalLead = leads.find((l) => l.id === activeId);
    if (originalLead && originalLead.status !== activeLead.status) {
      onStatusChange(activeId, activeLead.status);
    }

    // Reorder within column
    const overLead = localLeads.find((l) => l.id === overId);
    if (overLead && activeLead.status === overLead.status && activeId !== overId) {
      const columnLeads = leadsByStatus[activeLead.status];
      const oldIndex = columnLeads.findIndex((l) => l.id === activeId);
      const newIndex = columnLeads.findIndex((l) => l.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(columnLeads, oldIndex, newIndex);
        setLocalLeads((prev) => {
          const otherLeads = prev.filter((l) => l.status !== activeLead.status);
          return [...otherLeads, ...reordered];
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-220px)] gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <LeadColumn
            key={column.status}
            status={column.status}
            leads={leadsByStatus[column.status]}
            title={column.title}
            color={column.color}
            onViewLead={onViewLead}
            onQuickAction={onQuickAction}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead && (
          <div className="rotate-3 opacity-90">
            <LeadCard lead={activeLead} onView={() => {}} onQuickAction={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
