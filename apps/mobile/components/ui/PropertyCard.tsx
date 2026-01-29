import { View, Text, Image, Pressable } from 'react-native';
import { Card } from './Card';
import { Badge } from './Badge';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  currency: 'USD' | 'ARS';
  operation: 'sale' | 'rent';
  status: 'active' | 'paused' | 'draft' | 'sold' | 'rented';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  imageUrl?: string;
  leads: number;
  daysOnMarket: number;
}

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
}

const statusConfig: Record<
  Property['status'],
  { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'secondary' }
> = {
  active: { label: 'Activa', variant: 'success' },
  paused: { label: 'Pausada', variant: 'warning' },
  draft: { label: 'Borrador', variant: 'secondary' },
  sold: { label: 'Vendida', variant: 'default' },
  rented: { label: 'Alquilada', variant: 'default' },
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyCard({ property, onPress }: PropertyCardProps) {
  const status = statusConfig[property.status];

  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3 p-0 overflow-hidden">
        {/* Image */}
        <View className="h-40 bg-gray-200">
          {property.imageUrl ? (
            <Image
              source={{ uri: property.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-4xl">🏠</Text>
              <Text className="text-gray-400 text-sm mt-2">Sin foto</Text>
            </View>
          )}
          {/* Status Badge Overlay */}
          <View className="absolute top-2 left-2">
            <Badge variant={status.variant}>{status.label}</Badge>
          </View>
          {/* Operation Badge */}
          <View className="absolute top-2 right-2">
            <Badge variant="secondary">
              {property.operation === 'sale' ? 'Venta' : 'Alquiler'}
            </Badge>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Price */}
          <Text className="text-xl font-bold text-primary-600">
            {formatPrice(property.price, property.currency)}
          </Text>

          {/* Title & Address */}
          <Text className="text-base font-semibold text-gray-900 mt-1" numberOfLines={1}>
            {property.title}
          </Text>
          <Text className="text-sm text-gray-500" numberOfLines={1}>
            📍 {property.address}
          </Text>

          {/* Features */}
          <View className="flex-row gap-4 mt-3">
            {property.bedrooms !== undefined && (
              <View className="flex-row items-center gap-1">
                <Text>🛏️</Text>
                <Text className="text-sm text-gray-600">{property.bedrooms}</Text>
              </View>
            )}
            {property.bathrooms !== undefined && (
              <View className="flex-row items-center gap-1">
                <Text>🚿</Text>
                <Text className="text-sm text-gray-600">{property.bathrooms}</Text>
              </View>
            )}
            <View className="flex-row items-center gap-1">
              <Text>📐</Text>
              <Text className="text-sm text-gray-600">{property.area} m²</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <View className="flex-row items-center gap-1">
              <Text className="text-sm text-gray-500">👥 {property.leads} leads</Text>
            </View>
            <Text className="text-sm text-gray-400">{property.daysOnMarket}d en el mercado</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
