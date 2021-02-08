import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthNavigation from './navigation/UnAuthNavigation';
import AppNavigation from 'navigation/AppNavigation';

const MainApp = () => {
  //! State

  //! Function

  //! Render
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainApp;
