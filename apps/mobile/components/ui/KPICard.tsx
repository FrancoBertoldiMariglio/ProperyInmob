import { View, Text } from 'react-native';
import { Card } from './Card';

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
}

export function KPICard({ title, value, change, changeType = 'neutral', icon }: KPICardProps) {
  const changeColor = {
    increase: 'text-success-600',
    decrease: 'text-error-600',
    neutral: 'text-gray-500',
  }[changeType];

  const changePrefix = changeType === 'increase' ? '+' : '';

  return (
    <Card className="flex-1 min-w-[45%]">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-sm text-gray-500 font-medium">{title}</Text>
          <Text className="text-xl font-bold text-gray-900 mt-1">{value}</Text>
          {change !== undefined && (
            <Text className={`text-xs mt-1 ${changeColor}`}>
              {changePrefix}
              {change.toFixed(1)}% vs mes anterior
            </Text>
          )}
        </View>
        <View className="bg-primary-50 p-2 rounded-lg">{icon}</View>
      </View>
    </Card>
  );
}
