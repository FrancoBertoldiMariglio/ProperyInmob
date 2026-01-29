import { View, Text, Pressable, Linking } from 'react-native';
import { Card } from './Card';
import { Badge } from './Badge';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyTitle?: string;
  status: 'new' | 'contacted' | 'visited' | 'negotiating' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';
  source: string;
  createdAt: string;
}

interface LeadCardProps {
  lead: Lead;
  onPress?: () => void;
}

const statusConfig: Record<
  Lead['status'],
  { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'secondary' }
> = {
  new: { label: 'Nuevo', variant: 'default' },
  contacted: { label: 'Contactado', variant: 'warning' },
  visited: { label: 'Visito', variant: 'secondary' },
  negotiating: { label: 'Negociando', variant: 'warning' },
  closed: { label: 'Cerrado', variant: 'success' },
  lost: { label: 'Perdido', variant: 'error' },
};

const priorityConfig: Record<
  Lead['priority'],
  { label: string; variant: 'default' | 'success' | 'warning' | 'error' }
> = {
  low: { label: 'Baja', variant: 'default' },
  medium: { label: 'Media', variant: 'warning' },
  high: { label: 'Alta', variant: 'error' },
};

export function LeadCard({ lead, onPress }: LeadCardProps) {
  const status = statusConfig[lead.status];
  const priority = priorityConfig[lead.priority];

  const handleCall = () => {
    Linking.openURL(`tel:${lead.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${lead.email}`);
  };

  const handleWhatsApp = () => {
    const phone = lead.phone.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <Pressable onPress={onPress}>
      <Card className="mb-3">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900">{lead.name}</Text>
            <Text className="text-sm text-gray-500">{lead.email}</Text>
          </View>
          <View className="flex-row gap-1">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant={priority.variant}>{priority.label}</Badge>
          </View>
        </View>

        {/* Property */}
        {lead.propertyTitle && (
          <View className="mb-3">
            <Text className="text-sm text-gray-600">🏠 {lead.propertyTitle}</Text>
          </View>
        )}

        {/* Meta */}
        <View className="flex-row items-center gap-4 mb-3">
          <Text className="text-xs text-gray-400">📱 {lead.source}</Text>
          <Text className="text-xs text-gray-400">{lead.createdAt}</Text>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-2 pt-2 border-t border-gray-100">
          <Pressable
            onPress={handleCall}
            className="flex-1 flex-row items-center justify-center py-2 bg-green-50 rounded-lg"
          >
            <Text className="text-green-600">📞 Llamar</Text>
          </Pressable>
          <Pressable
            onPress={handleEmail}
            className="flex-1 flex-row items-center justify-center py-2 bg-blue-50 rounded-lg"
          >
            <Text className="text-blue-600">✉️ Email</Text>
          </Pressable>
          <Pressable
            onPress={handleWhatsApp}
            className="flex-1 flex-row items-center justify-center py-2 bg-green-50 rounded-lg"
          >
            <Text className="text-green-600">💬 WhatsApp</Text>
          </Pressable>
        </View>
      </Card>
    </Pressable>
  );
}
