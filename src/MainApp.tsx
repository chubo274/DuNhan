import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import UnAuthNavigation from './navigation/UnAuthNavigation';
import AppNavigation from 'navigation/AppNavigation';
import AppText from 'components/AppText';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import AppLoading from 'components/AppLoading';
import color from 'helpers/color';

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
        {_.isEmpty(userReducer.data?.phone) ? (
          <UnAuthNavigation />
        ) : (
          <AppNavigation />
        )}
      </NavigationContainer>
      {loadingReducer.isLoading && (
        <View style={styles.container}>
          <AppLoading size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.fade20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
