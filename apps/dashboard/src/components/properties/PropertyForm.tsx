import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button, Input, Select, Card } from '@propery-agents/ui';
import type { Property, CreatePropertyInput } from '@propery-agents/api-client';

const propertySchema = z.object({
  type: z.enum(['apartment', 'house', 'ph', 'land', 'office', 'commercial', 'warehouse', 'garage']),
  operation: z.enum(['sale', 'rent', 'temporary_rent']),
  title: z.string().min(10, 'El título debe tener al menos 10 caracteres'),
  description: z.string().min(50, 'La descripción debe tener al menos 50 caracteres'),
  price: z.number().min(1, 'El precio debe ser mayor a 0'),
  currency: z.enum(['USD', 'ARS']),
  expenses: z.number().optional(),
  address: z.object({
    street: z.string().min(1, 'La calle es requerida'),
    number: z.string().min(1, 'El numero es requerido'),
    floor: z.string().optional(),
    apartment: z.string().optional(),
    neighborhood: z.string().min(1, 'El barrio es requerido'),
    city: z.string().min(1, 'La ciudad es requerida'),
    province: z.string().min(1, 'La provincia es requerida'),
    postalCode: z.string().min(0),
    country: z.string().min(0),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  features: z.object({
    totalArea: z.number().min(1, 'La superficie total es requerida'),
    coveredArea: z.number().min(0),
    rooms: z.number().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    garages: z.number().optional(),
    age: z.number().optional(),
    floors: z.number().optional(),
    condition: z.enum(['new', 'excellent', 'good', 'fair', 'needs_work']),
  }),
  amenities: z.object({
    pool: z.boolean().default(false),
    gym: z.boolean().default(false),
    security: z.boolean().default(false),
    laundry: z.boolean().default(false),
    rooftop: z.boolean().default(false),
    parking: z.boolean().default(false),
    balcony: z.boolean().default(false),
    terrace: z.boolean().default(false),
    garden: z.boolean().default(false),
    heating: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
    elevator: z.boolean().default(false),
    storage: z.boolean().default(false),
    petFriendly: z.boolean().default(false),
  }),
  owner: z
    .object({
      name: z.string(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  commission: z.number().min(0).max(100).optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: CreatePropertyInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const propertyTypes = [
  { value: 'apartment', label: 'Departamento' },
  { value: 'house', label: 'Casa' },
  { value: 'ph', label: 'PH' },
  { value: 'land', label: 'Terreno' },
  { value: 'office', label: 'Oficina' },
  { value: 'commercial', label: 'Local Comercial' },
  { value: 'warehouse', label: 'Galpón' },
  { value: 'garage', label: 'Cochera' },
];

const operationTypes = [
  { value: 'sale', label: 'Venta' },
  { value: 'rent', label: 'Alquiler' },
  { value: 'temporary_rent', label: 'Alquiler Temporario' },
];

const conditionOptions = [
  { value: 'new', label: 'A estrenar' },
  { value: 'excellent', label: 'Excelente' },
  { value: 'good', label: 'Bueno' },
  { value: 'fair', label: 'Regular' },
  { value: 'needs_work', label: 'A refaccionar' },
];

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

export function PropertyForm({ property, onSubmit, onCancel, isSubmitting }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: {
      type: 'apartment',
      operation: 'sale',
      currency: 'USD',
      features: {
        condition: 'good',
        totalArea: 0,
        coveredArea: 0,
      },
      amenities: {
        pool: false,
        gym: false,
        security: false,
        laundry: false,
        rooftop: false,
        parking: false,
        balcony: false,
        terrace: false,
        garden: false,
        heating: false,
        airConditioning: false,
        elevator: false,
        storage: false,
        petFriendly: false,
      },
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: 'Buenos Aires',
        province: 'CABA',
        postalCode: '',
        country: 'Argentina',
      },
    },
  });

  useEffect(() => {
    if (property) {
      reset({
        type: property.type,
        operation: property.operation,
        title: property.title,
        description: property.description,
        price: property.price,
        currency: property.currency,
        expenses: property.expenses,
        address: property.address,
        features: property.features,
        amenities: property.amenities,
        owner: property.owner,
        commission: property.commission,
      });
    }
  }, [property, reset]);

  const watchedType = watch('type');
  const watchedOperation = watch('operation');

  const onFormSubmit = (data: unknown) => {
    onSubmit(data as CreatePropertyInput);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit as any)} className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Información básica
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Tipo de propiedad *</label>
            <Select
              value={watchedType}
              onChange={(e) => setValue('type', e.target.value as PropertyFormData['type'])}
              options={propertyTypes}
            />
            {errors.type && <span className="text-sm text-red-500">{errors.type.message}</span>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Operación *</label>
            <Select
              value={watchedOperation}
              onChange={(e) =>
                setValue('operation', e.target.value as PropertyFormData['operation'])
              }
              options={operationTypes}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Estado</label>
            <Select
              value={watch('features.condition')}
              onChange={(e) =>
                setValue(
                  'features.condition',
                  e.target.value as PropertyFormData['features']['condition']
                )
              }
              options={conditionOptions}
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="mb-1 block text-sm font-medium">Título *</label>
            <Input
              {...register('title')}
              placeholder="Ej: Hermoso 3 ambientes con balcón en Palermo"
            />
            {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="mb-1 block text-sm font-medium">Descripción *</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800"
              placeholder="Describe la propiedad con detalle..."
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description.message}</span>
            )}
          </div>
        </div>
      </Card>

      {/* Price */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Precio</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Precio *</label>
            <Input
              type="number"
              {...register('price', { valueAsNumber: true })}
              placeholder="150000"
            />
            {errors.price && <span className="text-sm text-red-500">{errors.price.message}</span>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Moneda</label>
            <Select
              value={watch('currency')}
              onChange={(e) => setValue('currency', e.target.value as 'USD' | 'ARS')}
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'ARS', label: 'ARS' },
              ]}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Expensas</label>
            <Input
              type="number"
              {...register('expenses', { valueAsNumber: true })}
              placeholder="25000"
            />
          </div>
        </div>
      </Card>

      {/* Address */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Ubicación</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">Calle *</label>
            <Input {...register('address.street')} placeholder="Av. Santa Fe" />
            {errors.address?.street && (
              <span className="text-sm text-red-500">{errors.address.street.message}</span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Número *</label>
            <Input {...register('address.number')} placeholder="1234" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Piso/Depto</label>
            <div className="flex gap-2">
              <Input {...register('address.floor')} placeholder="5" className="w-16" />
              <Input {...register('address.apartment')} placeholder="A" className="w-16" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Barrio *</label>
            <Input {...register('address.neighborhood')} placeholder="Palermo" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Ciudad *</label>
            <Input {...register('address.city')} placeholder="Buenos Aires" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Provincia *</label>
            <Input {...register('address.province')} placeholder="CABA" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Codigo Postal</label>
            <Input {...register('address.postalCode')} placeholder="1414" />
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Características
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Sup. Total (m²) *</label>
            <Input type="number" {...register('features.totalArea', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Sup. Cubierta (m²)</label>
            <Input type="number" {...register('features.coveredArea', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Ambientes</label>
            <Input type="number" {...register('features.rooms', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Dormitorios</label>
            <Input type="number" {...register('features.bedrooms', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Baños</label>
            <Input type="number" {...register('features.bathrooms', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Cocheras</label>
            <Input type="number" {...register('features.garages', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Antigüedad (años)</label>
            <Input type="number" {...register('features.age', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Pisos</label>
            <Input type="number" {...register('features.floors', { valueAsNumber: true })} />
          </div>
        </div>
      </Card>

      {/* Amenities */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Amenities</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {Object.entries(amenityLabels).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(`amenities.${key as keyof PropertyFormData['amenities']}`)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Owner */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Datos del propietario
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Nombre</label>
            <Input {...register('owner.name')} placeholder="Juan Pérez" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input {...register('owner.email')} type="email" placeholder="juan@email.com" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Teléfono</label>
            <Input {...register('owner.phone')} placeholder="+54 11 1234-5678" />
          </div>
        </div>
      </Card>

      {/* Commission */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Comisión</h3>
        <div className="max-w-xs">
          <label className="mb-1 block text-sm font-medium">Comisión (%)</label>
          <Input
            type="number"
            step="0.5"
            {...register('commission', { valueAsNumber: true })}
            placeholder="3"
          />
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : property ? 'Actualizar' : 'Crear propiedad'}
        </Button>
      </div>
    </form>
  );
}
