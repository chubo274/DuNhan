import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import styles from './styles';

const LoginScreen = () => {
  //! State
  const navigation = useNavigation();
  //! Function
  const onPress = () => {
    navigation.navigate('ForgotPassScreen');
  };
  //! Render
  return (
    <View style={styles.container}>
      <AppText> LoginScreen</AppText>
      <AppButton text="Đăng nhập" onPress={onPress} />
    </View>
  );
};

export default LoginScreen;
