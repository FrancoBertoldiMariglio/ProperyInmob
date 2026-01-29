import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Propery Agents</Text>
      <Text style={styles.subtitle}>Dashboard Mobile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a67d8',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 8,
  },
});
