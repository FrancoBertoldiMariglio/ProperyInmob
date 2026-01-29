import { Search, Filter, X, LayoutGrid, List } from 'lucide-react';
import { Button, Input, Select } from '@propery-agents/ui';
import type { LeadStatus, LeadSource, LeadPriority } from '@propery-agents/api-client';

interface LeadFiltersState {
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  priority?: LeadPriority;
  propertyId?: string;
}

interface LeadFiltersProps {
  filters: LeadFiltersState;
  onFiltersChange: (filters: LeadFiltersState) => void;
  onClearFilters: () => void;
  viewMode: 'kanban' | 'table';
  onViewModeChange: (mode: 'kanban' | 'table') => void;
}

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'new', label: 'Nuevos' },
  { value: 'contacted', label: 'Contactados' },
  { value: 'qualified', label: 'Calificados' },
  { value: 'visited', label: 'Visitaron' },
  { value: 'negotiating', label: 'Negociando' },
  { value: 'closed_won', label: 'Cerrados' },
  { value: 'closed_lost', label: 'Perdidos' },
];

const sourceOptions = [
  { value: '', label: 'Todas las fuentes' },
  { value: 'zonaprop', label: 'ZonaProp' },
  { value: 'argenprop', label: 'ArgenProp' },
  { value: 'mercadolibre', label: 'MercadoLibre' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'referral', label: 'Referido' },
  { value: 'direct', label: 'Directo' },
  { value: 'website', label: 'Web' },
];

const priorityOptions = [
  { value: '', label: 'Todas las prioridades' },
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Baja' },
];

export function LeadFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
}: LeadFiltersProps) {
  const hasActiveFilters = filters.search || filters.status || filters.source || filters.priority;

  const updateFilter = <K extends keyof LeadFiltersState>(key: K, value: LeadFiltersState[K]) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por nombre, email, teléfono..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status */}
      <Select
        value={filters.status || ''}
        onValueChange={(value) => updateFilter('status', value as LeadStatus)}
        placeholder="Estado"
        options={statusOptions}
        className="w-[160px]"
      />

      {/* Source */}
      <Select
        value={filters.source || ''}
        onValueChange={(value) => updateFilter('source', value as LeadSource)}
        placeholder="Fuente"
        options={sourceOptions}
        className="w-[160px]"
      />

      {/* Priority */}
      <Select
        value={filters.priority || ''}
        onValueChange={(value) => updateFilter('priority', value as LeadPriority)}
        placeholder="Prioridad"
        options={priorityOptions}
        className="w-[160px]"
      />

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Limpiar
        </Button>
      )}

      {/* View Mode Toggle */}
      <div className="ml-auto flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
        <Button
          variant={viewMode === 'kanban' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('kanban')}
          className="rounded-r-none"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('table')}
          className="rounded-l-none"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
