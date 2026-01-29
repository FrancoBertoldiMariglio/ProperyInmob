import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { LeadCard, Badge } from '../../components/ui';

// Mock lead data
const mockLeads = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+5491112345678',
    propertyTitle: 'Depto 3 amb en Palermo',
    status: 'new' as const,
    priority: 'high' as const,
    source: 'ZonaProp',
    createdAt: 'Hace 2 horas',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+5491187654321',
    propertyTitle: 'Casa en Belgrano',
    status: 'contacted' as const,
    priority: 'medium' as const,
    source: 'ArgenProp',
    createdAt: 'Hace 1 día',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    phone: '+5491155555555',
    propertyTitle: 'Oficina en Microcentro',
    status: 'visited' as const,
    priority: 'high' as const,
    source: 'Web',
    createdAt: 'Hace 2 días',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+5491166666666',
    status: 'negotiating' as const,
    priority: 'high' as const,
    source: 'Referido',
    createdAt: 'Hace 3 días',
  },
  {
    id: '5',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@email.com',
    phone: '+5491177777777',
    propertyTitle: 'PH en Villa Crespo',
    status: 'closed' as const,
    priority: 'medium' as const,
    source: 'MercadoLibre',
    createdAt: 'Hace 1 semana',
  },
];

type StatusFilter = 'all' | 'new' | 'contacted' | 'visited' | 'negotiating' | 'closed' | 'lost';

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'new', label: 'Nuevos' },
  { value: 'contacted', label: 'Contactados' },
  { value: 'negotiating', label: 'Negociando' },
  { value: 'closed', label: 'Cerrados' },
];

export default function LeadsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Stats */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">{mockLeads.length}</Text>
            <Text className="text-sm text-gray-500">Leads totales</Text>
          </View>
          <View className="flex-row gap-2">
            <View className="items-center">
              <Text className="text-lg font-semibold text-green-600">
                {mockLeads.filter((l) => l.status === 'new').length}
              </Text>
              <Text className="text-xs text-gray-500">Nuevos</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-semibold text-yellow-600">
                {mockLeads.filter((l) => l.status === 'negotiating').length}
              </Text>
              <Text className="text-xs text-gray-500">Negociando</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Text className="mr-2">🔍</Text>
          <TextInput
            className="flex-1 text-gray-700"
            placeholder="Buscar leads..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Status Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-100"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
      >
        {statusFilters.map((filter) => (
          <Pressable
            key={filter.value}
            onPress={() => setStatusFilter(filter.value)}
            className={`px-4 py-2 rounded-full ${
              statusFilter === filter.value ? 'bg-primary-600' : 'bg-gray-100'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                statusFilter === filter.value ? 'text-white' : 'text-gray-600'
              }`}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Lead List */}
      <ScrollView className="flex-1 px-4 py-4">
        {filteredLeads.length === 0 ? (
          <View className="items-center py-8">
            <Text className="text-gray-400 text-lg">No se encontraron leads</Text>
          </View>
        ) : (
          filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onPress={() => console.log('Lead pressed:', lead.id)}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Add new lead')}
      >
        <Text className="text-white text-2xl">+</Text>
      </Pressable>
    </View>
  );
}
