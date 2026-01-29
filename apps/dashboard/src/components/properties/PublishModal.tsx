import { useState } from 'react';
import { X, ExternalLink, Check, AlertCircle, Clock } from 'lucide-react';
import { Button, Badge, Card } from '@propery-agents/ui';
import type { Property, PortalPublishing } from '@propery-agents/api-client';

interface PublishModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onPublish: (portalIds: string[]) => void;
  onUnpublish: (portalIds: string[]) => void;
}

interface Portal {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const availablePortals: Portal[] = [
  {
    id: 'zonaprop',
    name: 'ZonaProp',
    logo: 'https://placehold.co/40x40/f97316/white?text=ZP',
    description: 'Portal líder en Argentina',
  },
  {
    id: 'argenprop',
    name: 'ArgenProp',
    logo: 'https://placehold.co/40x40/3b82f6/white?text=AP',
    description: 'Gran alcance nacional',
  },
  {
    id: 'mercadolibre',
    name: 'Mercado Libre',
    logo: 'https://placehold.co/40x40/fbbf24/black?text=ML',
    description: 'Marketplace más grande de LATAM',
  },
  {
    id: 'properati',
    name: 'Properati',
    logo: 'https://placehold.co/40x40/10b981/white?text=PR',
    description: 'Portal especializado en propiedades',
  },
  {
    id: 'inmuebles24',
    name: 'Inmuebles24',
    logo: 'https://placehold.co/40x40/8b5cf6/white?text=I24',
    description: 'Parte del grupo Navent',
  },
];

const getPortalStatus = (
  portalId: string,
  portals: PortalPublishing[]
): PortalPublishing | undefined => {
  return portals.find((p) => p.portalId === portalId);
};

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  published: 'success',
  pending: 'warning',
  failed: 'destructive',
  unpublished: 'default',
};

const statusLabels: Record<string, string> = {
  published: 'Publicada',
  pending: 'Pendiente',
  failed: 'Error',
  unpublished: 'No publicada',
};

export function PublishModal({
  property,
  isOpen,
  onClose,
  onPublish,
  onUnpublish,
}: PublishModalProps) {
  const [selectedPortals, setSelectedPortals] = useState<string[]>([]);

  if (!isOpen) return null;

  const togglePortal = (portalId: string) => {
    setSelectedPortals((prev) =>
      prev.includes(portalId) ? prev.filter((id) => id !== portalId) : [...prev, portalId]
    );
  };

  const handlePublish = () => {
    if (selectedPortals.length > 0) {
      onPublish(selectedPortals);
      setSelectedPortals([]);
    }
  };

  const handleUnpublish = () => {
    const publishedPortals = property.portals
      .filter((p) => p.status === 'published')
      .map((p) => p.portalId);
    const toUnpublish = selectedPortals.filter((id) => publishedPortals.includes(id));
    if (toUnpublish.length > 0) {
      onUnpublish(toUnpublish);
      setSelectedPortals([]);
    }
  };

  const hasSelectedPublished = selectedPortals.some((id) =>
    property.portals.some((p) => p.portalId === id && p.status === 'published')
  );

  const hasSelectedUnpublished = selectedPortals.some(
    (id) => !property.portals.some((p) => p.portalId === id && p.status === 'published')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Publicar propiedad
            </h2>
            <p className="mt-1 text-sm text-gray-500">{property.title}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Portal List */}
        <div className="space-y-3">
          {availablePortals.map((portal) => {
            const status = getPortalStatus(portal.id, property.portals);
            const isSelected = selectedPortals.includes(portal.id);
            const isPublished = status?.status === 'published';

            return (
              <Card
                key={portal.id}
                className={`
                  cursor-pointer p-4 transition-all
                  ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800' : ''}
                `}
                onClick={() => togglePortal(portal.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <div
                    className={`
                      flex h-5 w-5 items-center justify-center rounded border-2
                      ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }
                    `}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>

                  {/* Logo */}
                  <img src={portal.logo} alt={portal.name} className="h-10 w-10 rounded-lg" />

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {portal.name}
                      </span>
                      {status && (
                        <Badge variant={statusColors[status.status]}>
                          {status.status === 'published' && <Check className="mr-1 h-3 w-3" />}
                          {status.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                          {status.status === 'failed' && <AlertCircle className="mr-1 h-3 w-3" />}
                          {statusLabels[status.status]}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{portal.description}</p>
                    {status?.publishedAt && (
                      <p className="mt-1 text-xs text-gray-400">
                        Publicada: {new Date(status.publishedAt).toLocaleDateString('es-AR')}
                      </p>
                    )}
                  </div>

                  {/* External Link */}
                  {status?.url && (
                    <a
                      href={status.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        {selectedPortals.length > 0 && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedPortals.length} portal(es) seleccionado(s)
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {hasSelectedPublished && (
            <Button variant="destructive" onClick={handleUnpublish}>
              Despublicar
            </Button>
          )}
          {hasSelectedUnpublished && (
            <Button onClick={handlePublish}>Publicar seleccionados</Button>
          )}
        </div>
      </div>
    </div>
  );
}
