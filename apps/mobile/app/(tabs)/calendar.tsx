import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { Card, Badge } from '../../components/ui';

// Mock visit data
const mockVisits = [
  {
    id: '1',
    propertyTitle: 'Depto 3 amb en Palermo',
    propertyAddress: 'Thames 1234, Palermo',
    clientName: 'Juan Pérez',
    clientPhone: '+5491112345678',
    date: '2024-01-29',
    time: '10:00',
    status: 'confirmed' as const,
    notes: 'Cliente interesado en compra',
  },
  {
    id: '2',
    propertyTitle: 'Casa en Belgrano R',
    propertyAddress: 'Av. de los Incas 4500',
    clientName: 'María García',
    clientPhone: '+5491187654321',
    date: '2024-01-29',
    time: '14:30',
    status: 'pending' as const,
  },
  {
    id: '3',
    propertyTitle: 'Oficina en Microcentro',
    propertyAddress: 'Corrientes 500',
    clientName: 'Carlos López',
    clientPhone: '+5491155555555',
    date: '2024-01-30',
    time: '11:00',
    status: 'confirmed' as const,
    notes: 'Segunda visita',
  },
  {
    id: '4',
    propertyTitle: 'PH en Villa Crespo',
    propertyAddress: 'Vera 800',
    clientName: 'Ana Martínez',
    clientPhone: '+5491166666666',
    date: '2024-01-31',
    time: '16:00',
    status: 'pending' as const,
  },
];

const statusConfig = {
  confirmed: { label: 'Confirmada', variant: 'success' as const },
  pending: { label: 'Pendiente', variant: 'warning' as const },
  cancelled: { label: 'Cancelada', variant: 'error' as const },
  completed: { label: 'Completada', variant: 'default' as const },
};

// Group visits by date
const groupVisitsByDate = (visits: typeof mockVisits) => {
  const groups: Record<string, typeof mockVisits> = {};
  visits.forEach((visit) => {
    if (!groups[visit.date]) {
      groups[visit.date] = [];
    }
    groups[visit.date].push(visit);
  });
  return groups;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoy';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Mañana';
  }

  return date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const groupedVisits = groupVisitsByDate(mockVisits);

  const todayVisits = mockVisits.filter((v) => v.date === '2024-01-29').length;
  const weekVisits = mockVisits.length;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Stats */}
      <View className="bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex-row gap-4">
          <View className="flex-1 bg-primary-50 rounded-xl p-4">
            <Text className="text-3xl font-bold text-primary-600">{todayVisits}</Text>
            <Text className="text-sm text-primary-700">Visitas hoy</Text>
          </View>
          <View className="flex-1 bg-gray-50 rounded-xl p-4">
            <Text className="text-3xl font-bold text-gray-700">{weekVisits}</Text>
            <Text className="text-sm text-gray-500">Esta semana</Text>
          </View>
        </View>
      </View>

      {/* Calendar Week View (Simple) */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const dateStr = date.toISOString().split('T')[0];
              const hasVisits = mockVisits.some((v) => v.date === dateStr);
              const isSelected = selectedDate === dateStr;

              return (
                <Pressable
                  key={i}
                  onPress={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`w-14 py-3 rounded-xl items-center ${
                    isSelected ? 'bg-primary-600' : hasVisits ? 'bg-primary-50' : 'bg-gray-50'
                  }`}
                >
                  <Text className={`text-xs ${isSelected ? 'text-primary-100' : 'text-gray-500'}`}>
                    {date.toLocaleDateString('es-AR', { weekday: 'short' })}
                  </Text>
                  <Text
                    className={`text-lg font-bold mt-1 ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {date.getDate()}
                  </Text>
                  {hasVisits && !isSelected && (
                    <View className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Visit List */}
      <ScrollView className="flex-1 px-4 py-4">
        {Object.entries(groupedVisits)
          .filter(([date]) => !selectedDate || date === selectedDate)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, visits]) => (
            <View key={date} className="mb-6">
              {/* Date Header */}
              <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
                {formatDate(date)}
              </Text>

              {/* Visits for this date */}
              {visits.map((visit) => {
                const status = statusConfig[visit.status];
                return (
                  <Card key={visit.id} className="mb-3">
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-row items-center gap-2">
                        <View className="bg-primary-100 w-10 h-10 rounded-lg items-center justify-center">
                          <Text className="text-primary-600 font-bold">
                            {visit.time.split(':')[0]}
                          </Text>
                        </View>
                        <View>
                          <Text className="text-sm font-semibold text-gray-900">{visit.time}</Text>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </View>
                      </View>
                    </View>

                    <Text className="text-base font-medium text-gray-900 mb-1">
                      🏠 {visit.propertyTitle}
                    </Text>
                    <Text className="text-sm text-gray-500 mb-2">📍 {visit.propertyAddress}</Text>

                    <View className="flex-row items-center gap-2 pt-2 border-t border-gray-100">
                      <Text className="text-sm text-gray-700">👤 {visit.clientName}</Text>
                    </View>

                    {visit.notes && (
                      <Text className="text-xs text-gray-400 mt-2 italic">💬 {visit.notes}</Text>
                    )}
                  </Card>
                );
              })}
            </View>
          ))}

        {selectedDate && !groupedVisits[selectedDate] && (
          <View className="items-center py-8">
            <Text className="text-4xl mb-2">📅</Text>
            <Text className="text-gray-400 text-lg">No hay visitas este día</Text>
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Add new visit')}
      >
        <Text className="text-white text-2xl">+</Text>
      </Pressable>
    </View>
  );
}
