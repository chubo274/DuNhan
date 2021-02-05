import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthNavigation from './navigation/UnAuthNavigation';

const MainApp = () => {
  //! State

  //! Function

  //! Render
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <UnAuthNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainApp;
