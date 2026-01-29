import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import { Card } from '../../components/ui';

// Mock user data
const user = {
  name: 'Juan González',
  email: 'juan.gonzalez@propery.com',
  phone: '+54 11 1234-5678',
  role: 'Agente Inmobiliario',
  agency: 'Propery Agents',
  avatarInitials: 'JG',
};

// Stats
const stats = {
  properties: 12,
  leads: 47,
  closedDeals: 8,
  revenue: 45000,
};

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

function SettingItem({ icon, title, subtitle, onPress, rightElement }: SettingItemProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center py-3 border-b border-gray-50">
      <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-3">
        <Text className="text-lg">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-base text-gray-900">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
      {rightElement || <Text className="text-gray-400">›</Text>}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-primary-600 px-4 pt-8 pb-12">
        <View className="items-center">
          {/* Avatar */}
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-primary-600">{user.avatarInitials}</Text>
          </View>
          <Text className="text-xl font-bold text-white">{user.name}</Text>
          <Text className="text-primary-200">{user.role}</Text>
          <Text className="text-primary-200 text-sm mt-1">{user.agency}</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-4 -mt-6">
        <Card className="flex-row">
          <View className="flex-1 items-center py-2">
            <Text className="text-2xl font-bold text-gray-900">{stats.properties}</Text>
            <Text className="text-xs text-gray-500">Propiedades</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="flex-1 items-center py-2">
            <Text className="text-2xl font-bold text-gray-900">{stats.leads}</Text>
            <Text className="text-xs text-gray-500">Leads</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="flex-1 items-center py-2">
            <Text className="text-2xl font-bold text-gray-900">{stats.closedDeals}</Text>
            <Text className="text-xs text-gray-500">Cerrados</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="flex-1 items-center py-2">
            <Text className="text-lg font-bold text-success-600">
              ${(stats.revenue / 1000).toFixed(0)}k
            </Text>
            <Text className="text-xs text-gray-500">Comisiones</Text>
          </View>
        </Card>
      </View>

      {/* Contact Info */}
      <View className="px-4 mt-6">
        <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">
          Información de contacto
        </Text>
        <Card>
          <SettingItem
            icon="📧"
            title="Email"
            subtitle={user.email}
            onPress={() => console.log('Edit email')}
          />
          <SettingItem
            icon="📱"
            title="Teléfono"
            subtitle={user.phone}
            onPress={() => console.log('Edit phone')}
          />
        </Card>
      </View>

      {/* Settings */}
      <View className="px-4 mt-6">
        <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">Configuración</Text>
        <Card>
          <SettingItem
            icon="🔔"
            title="Notificaciones"
            subtitle="Recibir alertas de leads y visitas"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#d1d5db', true: '#818cf8' }}
                thumbColor={notificationsEnabled ? '#5a67d8' : '#f4f4f5'}
              />
            }
          />
          <SettingItem
            icon="🌙"
            title="Modo oscuro"
            subtitle="Cambiar apariencia"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#d1d5db', true: '#818cf8' }}
                thumbColor={darkMode ? '#5a67d8' : '#f4f4f5'}
              />
            }
          />
          <SettingItem
            icon="🔒"
            title="Cambiar contraseña"
            onPress={() => console.log('Change password')}
          />
          <SettingItem
            icon="🌐"
            title="Idioma"
            subtitle="Español"
            onPress={() => console.log('Change language')}
          />
        </Card>
      </View>

      {/* Subscription */}
      <View className="px-4 mt-6">
        <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">Suscripción</Text>
        <Card>
          <View className="flex-row items-center justify-between py-2">
            <View>
              <Text className="text-base font-semibold text-gray-900">Plan Pro</Text>
              <Text className="text-sm text-gray-500">Válido hasta 15/03/2025</Text>
            </View>
            <View className="bg-success-100 px-3 py-1 rounded-full">
              <Text className="text-success-700 text-sm font-medium">Activo</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Support */}
      <View className="px-4 mt-6 mb-8">
        <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase">Soporte</Text>
        <Card>
          <SettingItem icon="❓" title="Ayuda y FAQ" onPress={() => console.log('Help')} />
          <SettingItem
            icon="💬"
            title="Contactar soporte"
            onPress={() => console.log('Contact support')}
          />
          <SettingItem icon="⭐" title="Calificar la app" onPress={() => console.log('Rate app')} />
        </Card>

        {/* Logout */}
        <Pressable className="mt-4 py-3 items-center">
          <Text className="text-error-600 font-medium">Cerrar sesión</Text>
        </Pressable>

        {/* Version */}
        <Text className="text-center text-gray-400 text-xs mt-4">Propery Agents v1.0.0</Text>
      </View>
    </ScrollView>
  );
}
