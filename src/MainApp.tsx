import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthNavigation from './navigation/UnAuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
import AppText from 'components/AppText';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';

const MainApp = () => {
  //! State
  const userReducer = useSelector((state: RootState) => state.userReducer);
  const loadingReducer = useSelector(
    (state: RootState) => state.loadingReducer,
  );

  //! Function

  //! Use Effect
  useEffect(() => {
    if (loadingReducer.type.includes('_FAILED')) {
      Alert.alert('Thông báo', loadingReducer.errorMessage);
    }
  }, [loadingReducer.type]);

  //! Render
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer fallback={() => <AppText>...Loading</AppText>}>
        {_.isEmpty(userReducer.data?.username) ? (
          <UnAuthNavigation />
        ) : (
          <AppNavigation />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainApp;
