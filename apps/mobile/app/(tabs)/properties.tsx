import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { PropertyCard } from '../../components/ui';

// Mock property data
const mockProperties = [
  {
    id: '1',
    title: 'Depto 3 amb en Palermo Hollywood',
    address: 'Thames 1234, Palermo, CABA',
    price: 185000,
    currency: 'USD' as const,
    operation: 'sale' as const,
    status: 'active' as const,
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    imageUrl: 'https://placehold.co/400x300/5a67d8/white?text=Depto+Palermo',
    leads: 8,
    daysOnMarket: 15,
  },
  {
    id: '2',
    title: 'Casa con jardín en Belgrano R',
    address: 'Av. de los Incas 4500, Belgrano, CABA',
    price: 450000,
    currency: 'USD' as const,
    operation: 'sale' as const,
    status: 'active' as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    imageUrl: 'https://placehold.co/400x300/22c55e/white?text=Casa+Belgrano',
    leads: 12,
    daysOnMarket: 30,
  },
  {
    id: '3',
    title: 'Oficina premium en Microcentro',
    address: 'Corrientes 500, Microcentro, CABA',
    price: 3500,
    currency: 'USD' as const,
    operation: 'rent' as const,
    status: 'active' as const,
    area: 120,
    leads: 5,
    daysOnMarket: 7,
  },
  {
    id: '4',
    title: 'PH reciclado en Villa Crespo',
    address: 'Vera 800, Villa Crespo, CABA',
    price: 220000,
    currency: 'USD' as const,
    operation: 'sale' as const,
    status: 'paused' as const,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    leads: 3,
    daysOnMarket: 45,
  },
  {
    id: '5',
    title: 'Monoambiente en Caballito',
    address: 'Av. Rivadavia 5500, Caballito, CABA',
    price: 85000,
    currency: 'USD' as const,
    operation: 'sale' as const,
    status: 'sold' as const,
    bedrooms: 0,
    bathrooms: 1,
    area: 32,
    imageUrl: 'https://placehold.co/400x300/f59e0b/white?text=Mono+Caballito',
    leads: 15,
    daysOnMarket: 20,
  },
];

type OperationFilter = 'all' | 'sale' | 'rent';
type StatusFilter = 'all' | 'active' | 'paused' | 'sold' | 'rented';

export default function PropertiesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [operationFilter, setOperationFilter] = useState<OperationFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOperation = operationFilter === 'all' || property.operation === operationFilter;
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesOperation && matchesStatus;
  });

  const totalValue = mockProperties
    .filter((p) => p.status === 'active' && p.operation === 'sale')
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Stats */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">{mockProperties.length}</Text>
            <Text className="text-sm text-gray-500">Propiedades</Text>
          </View>
          <View className="items-end">
            <Text className="text-lg font-semibold text-primary-600">
              {new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(totalValue)}
            </Text>
            <Text className="text-xs text-gray-500">Valor en venta</Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Text className="mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-gray-700"
            placeholder="Buscar propiedades..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters Row */}
      <View className="bg-white border-b border-gray-100 px-4 py-3">
        <View className="flex-row gap-2">
          {/* Operation Filter */}
          <View className="flex-row gap-1 flex-1">
            {(['all', 'sale', 'rent'] as const).map((op) => (
              <Pressable
                key={op}
                onPress={() => setOperationFilter(op)}
                className={`flex-1 py-2 rounded-lg items-center ${
                  operationFilter === op ? 'bg-primary-600' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    operationFilter === op ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {op === 'all' ? 'Todas' : op === 'sale' ? 'Venta' : 'Alquiler'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Status Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2"
          contentContainerStyle={{ gap: 8 }}
        >
          {(['all', 'active', 'paused', 'sold', 'rented'] as const).map((status) => (
            <Pressable
              key={status}
              onPress={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-full ${
                statusFilter === status ? 'bg-primary-100' : 'bg-gray-50'
              }`}
            >
              <Text
                className={`text-xs ${
                  statusFilter === status ? 'text-primary-700 font-medium' : 'text-gray-500'
                }`}
              >
                {status === 'all' && 'Todos'}
                {status === 'active' && '🟢 Activas'}
                {status === 'paused' && '🟡 Pausadas'}
                {status === 'sold' && '✅ Vendidas'}
                {status === 'rented' && '✅ Alquiladas'}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Property List */}
      <ScrollView className="flex-1 px-4 py-4">
        {filteredProperties.length === 0 ? (
          <View className="items-center py-8">
            <Text className="text-4xl mb-2">🏠</Text>
            <Text className="text-gray-400 text-lg">No se encontraron propiedades</Text>
          </View>
        ) : (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => console.log('Property pressed:', property.id)}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Add new property')}
      >
        <Text className="text-white text-2xl">+</Text>
      </Pressable>
    </View>
  );
}
