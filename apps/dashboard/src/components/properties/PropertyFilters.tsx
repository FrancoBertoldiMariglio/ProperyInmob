import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button, Input, Select } from '@propery-agents/ui';
import type {
  PropertyFilters as Filters,
  PropertyType,
  OperationType,
  PropertyStatus,
} from '@propery-agents/api-client';

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'apartment', label: 'Departamento' },
  { value: 'house', label: 'Casa' },
  { value: 'ph', label: 'PH' },
  { value: 'land', label: 'Terreno' },
  { value: 'office', label: 'Oficina' },
  { value: 'commercial', label: 'Local' },
  { value: 'warehouse', label: 'Galpon' },
  { value: 'garage', label: 'Cochera' },
];

const operationTypes: { value: OperationType; label: string }[] = [
  { value: 'sale', label: 'Venta' },
  { value: 'rent', label: 'Alquiler' },
  { value: 'temporary_rent', label: 'Alquiler Temporario' },
];

const statusOptions: { value: PropertyStatus; label: string }[] = [
  { value: 'active', label: 'Activa' },
  { value: 'paused', label: 'Pausada' },
  { value: 'draft', label: 'Borrador' },
  { value: 'sold', label: 'Vendida' },
  { value: 'rented', label: 'Alquilada' },
  { value: 'reserved', label: 'Reservada' },
];

export function PropertyFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: PropertyFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    filters.type ||
    filters.operation ||
    filters.status ||
    filters.search ||
    filters.priceMin ||
    filters.priceMax;

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por direccion, titulo..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Type */}
        <Select
          value={(filters.type as string) || ''}
          onChange={(e) => updateFilter('type', e.target.value as PropertyType)}
          placeholder="Tipo"
          options={[{ value: '', label: 'Todos los tipos' }, ...propertyTypes]}
          className="w-[160px]"
        />

        {/* Operation */}
        <Select
          value={(filters.operation as string) || ''}
          onChange={(e) => updateFilter('operation', e.target.value as OperationType)}
          placeholder="Operacion"
          options={[{ value: '', label: 'Todas' }, ...operationTypes]}
          className="w-[180px]"
        />

        {/* Status */}
        <Select
          value={(filters.status as string) || ''}
          onChange={(e) => updateFilter('status', e.target.value as PropertyStatus)}
          placeholder="Estado"
          options={[{ value: '', label: 'Todos' }, ...statusOptions]}
          className="w-[150px]"
        />

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] text-white">
              !
            </span>
          )}
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Precio minimo (USD)
              </label>
              <Input
                type="number"
                placeholder="Desde"
                value={filters.priceMin || ''}
                onChange={(e) =>
                  updateFilter('priceMin', e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Precio maximo (USD)
              </label>
              <Input
                type="number"
                placeholder="Hasta"
                value={filters.priceMax || ''}
                onChange={(e) =>
                  updateFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Superficie minima (m2)
              </label>
              <Input
                type="number"
                placeholder="Desde"
                value={filters.areaMin || ''}
                onChange={(e) =>
                  updateFilter('areaMin', e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dormitorios
              </label>
              <Select
                value={filters.bedrooms?.toString() || ''}
                onChange={(e) =>
                  updateFilter('bedrooms', e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="Cualquiera"
                options={[
                  { value: '', label: 'Cualquiera' },
                  { value: '1', label: '1+' },
                  { value: '2', label: '2+' },
                  { value: '3', label: '3+' },
                  { value: '4', label: '4+' },
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
