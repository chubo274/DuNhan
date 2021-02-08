import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screen/HomeScreen';
import ProfileScreen from 'screen/ProfileScreen';
import TicketScreen from 'screen/TicketScreen';
import SearchScreen from 'screen/SearchScreen';
import TabBar from './components/TabBar';

const AppNavigation = () => {
  //! State
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  //! Function
  const TabNavigator = () => {
    return (
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name="TicketScreen" component={TicketScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  //! Render
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
