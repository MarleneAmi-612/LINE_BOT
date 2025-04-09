import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas
import Inicio from '../screens/Inicio';
import Componentes from '../screens/ComponentesScreen';
import Mapeo from '../screens/Mapeo';
import SensoresGraficos from '../screens/SensoresScreen';
import Team from '../screens/Team';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#38040e',
        tabBarInactiveTintColor: '#e5989b',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Inicio':
              iconName = 'home';
              break;
            case 'Componentes':
              iconName = 'cube';
              break;
            case 'Mapeo':
              iconName = 'map';
              break;
            case 'Sensores':
              iconName = 'speedometer';
              break;
            case 'Team':
              iconName = 'people';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Componentes" component={Componentes} />
      <Tab.Screen name="Mapeo" component={Mapeo} />
      <Tab.Screen name="Sensores" component={SensoresGraficos} />
      <Tab.Screen name="Team" component={Team} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
