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
      <AppText style={styles.textWel}>Welcome to App Du Nhân</AppText>
      <AppText>Đăng nhập để tiếp tục!</AppText>
      <View style={styles.btnLogin}>
        <AppButton text="Đăng nhập" onPress={onPress} />
      </View>
    </View>
  );
};

export default LoginScreen;
