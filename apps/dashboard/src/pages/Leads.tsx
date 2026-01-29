import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@propery-agents/ui';
import { useLeads } from '@propery-agents/core';
import type { Lead, LeadStatus } from '@propery-agents/api-client';
import { LeadPipeline, LeadFilters, LeadTable, LeadDetail } from '@/components/leads';

type ViewMode = 'kanban' | 'table';
type PageMode = 'list' | 'detail';

interface FiltersState {
  search?: string;
  status?: LeadStatus;
  source?: string;
  priority?: string;
}

function Leads() {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [pageMode, setPageMode] = useState<PageMode>('list');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<FiltersState>({});

  const { data: leads = [], isLoading, refetch } = useLeads(filters);

  const handleViewLead = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setPageMode('detail');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedLead(null);
    setPageMode('list');
  }, []);

  const handleStatusChange = useCallback(
    (leadId: string, newStatus: LeadStatus) => {
      // TODO: Implement status change mutation
      console.log('Status change:', leadId, newStatus);
      refetch();
    },
    [refetch]
  );

  const handleQuickAction = useCallback((lead: Lead, action: string) => {
    switch (action) {
      case 'call':
        if (lead.phone) window.open(`tel:${lead.phone}`);
        break;
      case 'email':
        window.open(`mailto:${lead.email}`);
        break;
      case 'whatsapp':
        if (lead.phone) {
          window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`);
        }
        break;
      default:
        console.log('Quick action:', action, lead.id);
    }
  }, []);

  const handleDelete = useCallback(() => {
    if (selectedLead && window.confirm(`¿Eliminar lead "${selectedLead.name}"?`)) {
      // TODO: Implement delete mutation
      console.log('Delete lead:', selectedLead.id);
      handleBack();
      refetch();
    }
  }, [selectedLead, handleBack, refetch]);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Detail View
  if (pageMode === 'detail' && selectedLead) {
    return (
      <LeadDetail
        lead={selectedLead}
        onBack={handleBack}
        onEdit={() => console.log('Edit lead')}
        onDelete={handleDelete}
        onStatusChange={(status) => handleStatusChange(selectedLead.id, status as LeadStatus)}
        onScheduleVisit={() => console.log('Schedule visit')}
        onAddActivity={() => console.log('Add activity')}
      />
    );
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Leads</h1>
          <p className="text-gray-500">
            {leads.length} lead{leads.length !== 1 ? 's' : ''} en tu pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo lead
        </Button>
      </div>

      {/* Filters */}
      <LeadFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">Cargando leads...</p>
        </div>
      ) : viewMode === 'kanban' ? (
        <LeadPipeline
          leads={leads}
          onStatusChange={handleStatusChange}
          onViewLead={handleViewLead}
          onQuickAction={handleQuickAction}
        />
      ) : (
        <LeadTable
          leads={leads}
          isLoading={isLoading}
          onView={handleViewLead}
          onQuickAction={handleQuickAction}
        />
      )}
    </div>
  );
}

export default Leads;
