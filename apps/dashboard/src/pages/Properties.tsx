import { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@propery-agents/ui';
import { useProperties } from '@propery-agents/core';
import type {
  Property,
  PropertyFilters as Filters,
  CreatePropertyInput,
} from '@propery-agents/api-client';
import {
  PropertyFilters,
  PropertyTable,
  PropertyForm,
  PropertyDetail,
  PublishModal,
} from '@/components/properties';

type ViewMode = 'list' | 'detail' | 'create' | 'edit';

function Properties() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [showPublishModal, setShowPublishModal] = useState(false);

  const { data: propertiesData, isLoading, refetch } = useProperties(filters);
  const properties = useMemo(() => propertiesData?.data ?? [], [propertiesData]);

  const handleView = useCallback((property: Property) => {
    setSelectedProperty(property);
    setViewMode('detail');
  }, []);

  const handleEdit = useCallback((property: Property) => {
    setSelectedProperty(property);
    setViewMode('edit');
  }, []);

  const handleCreate = useCallback(() => {
    setSelectedProperty(null);
    setViewMode('create');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProperty(null);
    setViewMode('list');
  }, []);

  const handleToggleStatus = useCallback(
    (property: Property) => {
      // TODO: Implement status toggle mutation
      console.log('Toggle status:', property.id);
      refetch();
    },
    [refetch]
  );

  const handleDelete = useCallback(
    (property: Property) => {
      if (window.confirm(`¿Estás seguro de eliminar "${property.title}"?`)) {
        // TODO: Implement delete mutation
        console.log('Delete:', property.id);
        refetch();
      }
    },
    [refetch]
  );

  const handlePublish = useCallback((property: Property) => {
    setSelectedProperty(property);
    setShowPublishModal(true);
  }, []);

  const handlePublishPortals = useCallback(
    (portalIds: string[]) => {
      // TODO: Implement publish mutation
      console.log('Publish to portals:', portalIds);
      setShowPublishModal(false);
      refetch();
    },
    [refetch]
  );

  const handleUnpublishPortals = useCallback(
    (portalIds: string[]) => {
      // TODO: Implement unpublish mutation
      console.log('Unpublish from portals:', portalIds);
      setShowPublishModal(false);
      refetch();
    },
    [refetch]
  );

  const handleSubmitForm = useCallback(
    (data: CreatePropertyInput) => {
      // TODO: Implement create/update mutation
      console.log('Submit form:', data);
      setViewMode('list');
      refetch();
    },
    [refetch]
  );

  const handleBulkAction = useCallback(
    (action: string, selectedProperties: Property[]) => {
      // TODO: Implement bulk actions
      console.log(
        'Bulk action:',
        action,
        selectedProperties.map((p) => p.id)
      );
      refetch();
    },
    [refetch]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Detail View
  if (viewMode === 'detail' && selectedProperty) {
    return (
      <PropertyDetail
        property={selectedProperty}
        onBack={handleBack}
        onEdit={() => handleEdit(selectedProperty)}
        onPublish={() => handlePublish(selectedProperty)}
        onDelete={() => handleDelete(selectedProperty)}
      />
    );
  }

  // Create/Edit Form
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {viewMode === 'create' ? 'Nueva Propiedad' : 'Editar Propiedad'}
        </h1>
        <PropertyForm
          property={selectedProperty || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleBack}
        />
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Propiedades</h1>
          <p className="text-gray-500">
            {properties.length} propiedad{properties.length !== 1 ? 'es' : ''} en tu cartera
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva propiedad
        </Button>
      </div>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Table */}
      <PropertyTable
        properties={properties}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        onPublish={handlePublish}
        onBulkAction={handleBulkAction}
      />

      {/* Publish Modal */}
      {selectedProperty && (
        <PublishModal
          property={selectedProperty}
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          onPublish={handlePublishPortals}
          onUnpublish={handleUnpublishPortals}
        />
      )}
    </div>
  );
}

export default Properties;
