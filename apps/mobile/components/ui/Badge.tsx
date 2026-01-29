import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'secondary';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-700' },
  success: { bg: 'bg-green-100', text: 'text-green-700' },
  warning: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  error: { bg: 'bg-red-100', text: 'text-red-700' },
  secondary: { bg: 'bg-primary-100', text: 'text-primary-700' },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <View className={`px-2 py-0.5 rounded-full ${styles.bg}`}>
      <Text className={`text-xs font-medium ${styles.text}`}>{children}</Text>
    </View>
  );
}
