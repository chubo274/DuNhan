import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from 'screen/LoginScreen';
import SignUpScreen from 'screen/SignUpScreen';
import ForgotPassScreen from 'screen/ForgotPassScreen';

const AppNavigation = () => {
  //! State
  const Stack = createStackNavigator();
  //! Function

  //! Render
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'LoginScreen'} component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name={'SignUpScreen'}
        component={SignUpScreen}></Stack.Screen>
      <Stack.Screen
        name={'ForgotPassScreen'}
        component={ForgotPassScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigation;
