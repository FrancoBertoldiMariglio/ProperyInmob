import { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Share2,
  Trash2,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Calendar,
  Eye,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button, Badge, Card } from '@propery-agents/ui';
import type { Property } from '@propery-agents/api-client';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onEdit: () => void;
  onPublish: () => void;
  onDelete: () => void;
}

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  active: 'success',
  paused: 'warning',
  draft: 'default',
  sold: 'default',
  rented: 'default',
  reserved: 'warning',
};

const statusLabels: Record<string, string> = {
  active: 'Activa',
  paused: 'Pausada',
  draft: 'Borrador',
  sold: 'Vendida',
  rented: 'Alquilada',
  reserved: 'Reservada',
};

const typeLabels: Record<string, string> = {
  apartment: 'Departamento',
  house: 'Casa',
  ph: 'PH',
  land: 'Terreno',
  office: 'Oficina',
  commercial: 'Local Comercial',
  warehouse: 'Galpón',
  garage: 'Cochera',
};

const operationLabels: Record<string, string> = {
  sale: 'Venta',
  rent: 'Alquiler',
  temporary_rent: 'Alquiler Temporario',
};

const amenityLabels: Record<string, string> = {
  pool: 'Pileta',
  gym: 'Gimnasio',
  security: 'Seguridad 24hs',
  laundry: 'Lavadero',
  rooftop: 'Rooftop',
  parking: 'Estacionamiento',
  balcony: 'Balcón',
  terrace: 'Terraza',
  garden: 'Jardín',
  heating: 'Calefacción',
  airConditioning: 'Aire acondicionado',
  elevator: 'Ascensor',
  storage: 'Baulera',
  petFriendly: 'Acepta mascotas',
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyDetail({
  property,
  onBack,
  onEdit,
  onPublish,
  onDelete,
}: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sortedImages = [...property.images].sort((a, b) => {
    if (a.isMain) return -1;
    if (b.isMain) return 1;
    return a.order - b.order;
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  };

  const activeAmenities = Object.entries(property.amenities)
    .filter(([, value]) => value)
    .map(([key]) => amenityLabels[key]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {property.title}
              </h1>
              <Badge variant={statusColors[property.status]}>{statusLabels[property.status]}</Badge>
            </div>
            <p className="flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4" />
              {property.address.street} {property.address.number}, {property.address.neighborhood}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onPublish}>
            <Share2 className="mr-2 h-4 w-4" />
            Publicar
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            {sortedImages.length > 0 ? (
              <div className="relative">
                <img
                  src={sortedImages[currentImageIndex].url}
                  alt={sortedImages[currentImageIndex].alt || property.title}
                  className="aspect-[16/10] w-full object-cover"
                />
                {sortedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {sortedImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-400">Sin imágenes</p>
              </div>
            )}

            {/* Thumbnails */}
            {sortedImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-4">
                {sortedImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                      index === currentImageIndex
                        ? 'border-indigo-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={image.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Descripción
            </h2>
            <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
              {property.description}
            </p>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Características
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3">
                <Maximize className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Superficie Total</p>
                  <p className="font-medium">{property.features.totalArea} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Maximize className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Superficie Cubierta</p>
                  <p className="font-medium">{property.features.coveredArea} m²</p>
                </div>
              </div>
              {property.features.bedrooms && (
                <div className="flex items-center gap-3">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Dormitorios</p>
                    <p className="font-medium">{property.features.bedrooms}</p>
                  </div>
                </div>
              )}
              {property.features.bathrooms && (
                <div className="flex items-center gap-3">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Baños</p>
                    <p className="font-medium">{property.features.bathrooms}</p>
                  </div>
                </div>
              )}
              {property.features.garages && (
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Cocheras</p>
                    <p className="font-medium">{property.features.garages}</p>
                  </div>
                </div>
              )}
              {property.features.age !== undefined && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Antigüedad</p>
                    <p className="font-medium">
                      {property.features.age === 0 ? 'A estrenar' : `${property.features.age} años`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Amenities */}
          {activeAmenities.length > 0 && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeAmenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <Card className="p-6">
            <div className="mb-2 text-sm text-gray-500">
              {typeLabels[property.type]} en {operationLabels[property.operation]}
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {formatPrice(property.price, property.currency)}
            </div>
            {property.expenses && (
              <div className="mt-1 text-sm text-gray-500">
                + {formatPrice(property.expenses, 'ARS')} expensas
              </div>
            )}
          </Card>

          {/* Stats Card */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Estadísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye className="h-4 w-4" />
                  Vistas
                </div>
                <span className="font-medium">{property.stats.views}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="h-4 w-4" />
                  Leads
                </div>
                <span className="font-medium">{property.stats.leads}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Visitas
                </div>
                <span className="font-medium">{property.stats.visits}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  Días en mercado
                </div>
                <span className="font-medium">{property.stats.daysOnMarket}</span>
              </div>
            </div>
          </Card>

          {/* Owner Card */}
          {property.owner && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Propietario</h3>
              <div className="space-y-2">
                <p className="font-medium">{property.owner.name}</p>
                {property.owner.contact?.email && (
                  <p className="text-sm text-gray-500">{property.owner.contact.email}</p>
                )}
                {property.owner.contact?.phone && (
                  <p className="text-sm text-gray-500">{property.owner.contact.phone}</p>
                )}
              </div>
            </Card>
          )}

          {/* Commission */}
          {property.commission && (
            <Card className="p-6">
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Comisión</h3>
              <p className="text-2xl font-bold text-green-600">{property.commission}%</p>
              <p className="text-sm text-gray-500">
                ≈ {formatPrice((property.price * property.commission) / 100, property.currency)}
              </p>
            </Card>
          )}

          {/* Portals */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Publicaciones</h3>
            {property.portals.length > 0 ? (
              <div className="space-y-3">
                {property.portals.map((pub) => (
                  <div key={pub.portal} className="flex items-center justify-between text-sm">
                    <span className="capitalize">{pub.portal}</span>
                    <Badge
                      variant={
                        pub.status === 'published'
                          ? 'success'
                          : pub.status === 'pending'
                            ? 'warning'
                            : 'error'
                      }
                    >
                      {pub.status === 'published'
                        ? 'Activa'
                        : pub.status === 'pending'
                          ? 'Pendiente'
                          : 'Error'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No publicada en portales</p>
            )}
            <Button className="mt-4 w-full" variant="outline" onClick={onPublish}>
              Gestionar publicaciones
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
