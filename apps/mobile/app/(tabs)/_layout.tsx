import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5a67d8',
        tabBarInactiveTintColor: '#718096',
        headerStyle: {
          backgroundColor: '#5a67d8',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: 'Propiedades',
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
        }}
      />
    </Tabs>
  );
}
