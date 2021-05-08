import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screen/HomeScreen';
import ProfileScreen from 'screen/ProfileScreen';
import TicketScreen from 'screen/TicketScreen';
import SearchScreen from 'screen/SearchScreen';
import TabBar from './components/TabBar';
import ListTour from 'screen/ListTour';
import DetailTourScreen from 'screen/DetailTourScreen';
import NewPass from 'screen/NewPass';
import PassSecure from 'screen/PassSecure';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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

const AppNavigation = () => {
  //! State

  //! Function

  //! Render
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ListTour" component={ListTour} />
      <Stack.Screen name="DetailTourScreen" component={DetailTourScreen} />
      <Stack.Screen name="PassSecure" component={PassSecure} />
      <Stack.Screen name="NewPass" component={NewPass} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
