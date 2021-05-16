import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdminTabBar from './components/AdminTabBar';
import AdminProfile from 'screen/AdminProfile';
import AdminDashBoard from 'screen/AdminDashBoard';
import AdminBookingUser from 'screen/AdminBookingUser';
import TicketScreen from 'screen/TicketScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <AdminTabBar {...props} />}>
      <Tab.Screen name="AdminDashBoard" component={AdminDashBoard} />
      <Tab.Screen name="AdminBookingUser" component={AdminBookingUser} />
      <Tab.Screen name="AdminProfile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

const AppAdmin = () => {
  //! State

  //! Function

  //! Render
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="TicketScreen" component={TicketScreen} />
    </Stack.Navigator>
  );
};

export default AppAdmin;
