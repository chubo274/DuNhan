import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import ForgotPassScreen from '../screen/ForgotPassScreen';
import CodeForGetPassScreen from 'screen/CodeForGetPassScreen';
import LoginAdminScreen from 'screen/LoginAdmin';
import NewPass from 'screen/NewPass';

const Stack = createStackNavigator();
const UnAuthNavigation = () => {
  //! State
  //! Function
  //! Render
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={'LoginScreen'} component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name={'LoginAdminScreen'}
        component={LoginAdminScreen}></Stack.Screen>
      <Stack.Screen
        name={'SignUpScreen'}
        component={SignUpScreen}></Stack.Screen>
      <Stack.Screen
        name={'ForgotPassScreen'}
        component={ForgotPassScreen}></Stack.Screen>
      <Stack.Screen
        name={'CodeForGetPassScreen'}
        component={CodeForGetPassScreen}></Stack.Screen>
      <Stack.Screen name={'NewPass'} component={NewPass}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UnAuthNavigation;
