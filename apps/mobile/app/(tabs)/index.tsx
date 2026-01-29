import { View, Text, ScrollView } from 'react-native';
import { KPICard, Card } from '../../components/ui';

// Mock KPI data (same as dashboard)
const kpis = {
  totalLeads: { label: 'Leads Totales', value: 47, change: 23.7, changeType: 'increase' as const },
  activeProperties: {
    label: 'Propiedades Activas',
    value: 12,
    change: 20,
    changeType: 'increase' as const,
  },
  scheduledVisits: {
    label: 'Visitas Programadas',
    value: 8,
    change: 33.3,
    changeType: 'increase' as const,
  },
  monthlyRevenue: {
    label: 'Comisiones',
    value: 15500,
    change: 29.2,
    changeType: 'increase' as const,
  },
};

// Recent activity data
const recentActivity = [
  {
    id: '1',
    type: 'lead',
    text: 'Nuevo lead: Juan Pérez interesado en Palermo',
    time: 'Hace 5 min',
  },
  { id: '2', type: 'visit', text: 'Visita programada: Depto Thames 1234', time: 'Hace 1 hora' },
  { id: '3', type: 'property', text: 'Propiedad publicada en ZonaProp', time: 'Hace 2 horas' },
  { id: '4', type: 'lead', text: 'Lead contactado: María García', time: 'Hace 3 horas' },
];

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

// Simple icon components using text
function UsersIcon() {
  return <Text className="text-primary-600 text-lg">👥</Text>;
}

function BuildingIcon() {
  return <Text className="text-primary-600 text-lg">🏠</Text>;
}

function CalendarIcon() {
  return <Text className="text-primary-600 text-lg">📅</Text>;
}

function DollarIcon() {
  return <Text className="text-primary-600 text-lg">💵</Text>;
}

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Welcome Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">Bienvenido, Juan</Text>
          <Text className="text-gray-500 mt-1">Resumen de tu actividad este mes</Text>
        </View>

        {/* KPIs Grid */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          <KPICard
            title={kpis.totalLeads.label}
            value={kpis.totalLeads.value.toString()}
            change={kpis.totalLeads.change}
            changeType={kpis.totalLeads.changeType}
            icon={<UsersIcon />}
          />
          <KPICard
            title={kpis.activeProperties.label}
            value={kpis.activeProperties.value.toString()}
            change={kpis.activeProperties.change}
            changeType={kpis.activeProperties.changeType}
            icon={<BuildingIcon />}
          />
          <KPICard
            title={kpis.scheduledVisits.label}
            value={kpis.scheduledVisits.value.toString()}
            change={kpis.scheduledVisits.change}
            changeType={kpis.scheduledVisits.changeType}
            icon={<CalendarIcon />}
          />
          <KPICard
            title={kpis.monthlyRevenue.label}
            value={formatCurrency(kpis.monthlyRevenue.value)}
            change={kpis.monthlyRevenue.change}
            changeType={kpis.monthlyRevenue.changeType}
            icon={<DollarIcon />}
          />
        </View>

        {/* Quick Actions */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-primary-600 px-4 py-2 rounded-lg">
              <Text className="text-white font-medium">+ Nueva Propiedad</Text>
            </View>
            <View className="bg-primary-100 px-4 py-2 rounded-lg">
              <Text className="text-primary-600 font-medium">+ Nuevo Lead</Text>
            </View>
            <View className="bg-primary-100 px-4 py-2 rounded-lg">
              <Text className="text-primary-600 font-medium">+ Agendar Visita</Text>
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <Card>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</Text>
          <View className="gap-3">
            {recentActivity.map((activity) => (
              <View key={activity.id} className="flex-row items-start gap-3">
                <View className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                <View className="flex-1">
                  <Text className="text-gray-700">{activity.text}</Text>
                  <Text className="text-xs text-gray-400 mt-1">{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
