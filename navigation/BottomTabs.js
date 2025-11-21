// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ConfigScreen from '../screens/ConfigScreen';

import { tabsTheme, tabBarStyles } from '../theme/tabs.styles';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Início',    component: HomeScreen,    icon: 'home',        iconOutline: 'home-outline' },
  { name: 'Histórico', component: HistoryScreen, icon: 'list',        iconOutline: 'list-outline' },
  { name: 'Config.',   component: ConfigScreen,  icon: 'settings',    iconOutline: 'settings-outline' },
];

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          const tab = TABS.find(t => t.name === route.name);
          const iconName = focused ? tab.icon : tab.iconOutline;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: tabsTheme.active,
        tabBarInactiveTintColor: tabsTheme.inactive,
        tabBarStyle: tabBarStyles.tabBar,
      })}
    >
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
}
