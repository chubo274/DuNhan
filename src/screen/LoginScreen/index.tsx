import {useNavigation} from '@react-navigation/native';
import {IMAGE} from 'assets';
import AppButton from 'components/AppButton';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import React, {useEffect, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import _ from 'lodash';

const LoginScreen = () => {
  //! State
  const navigation = useNavigation();
  const [userName, setUserName] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState('');

  //! Function
  const onChangeUserName = (data: number) => {
    setUserName(data);
  };
  const onChangePassword = (data: any) => {
    setPassword(data);
  };

  const loginApp = () => {
    // dispatch(userActions.loginRequest(param));
  };
  //! UseEffect
  useEffect(() => {
    if (_.isNaN(userName) && userName?.toString().length > 7) {
      setError('');
    } else {
      setError('Trường này phải là số và ít nhất 8 ký tự');
    }
  }, [userName]);

  useEffect(() => {
    if (password?.length > 7) {
      setErrorPass('');
    } else {
      setErrorPass('Trường này phải ít nhất 8 ký tự');
    }
  }, [password]);
  //! Render
  return (
    <ImageBackground source={IMAGE.bgLogin} style={styles.imgBg}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <AppText style={styles.textWel}>Welcome to App Du Nhân</AppText>
          <AppText style={styles.textWel2}>Đăng nhập để tiếp tục!</AppText>
          <View style={{paddingBottom: 15}}>
            <AppInput
              text="Tài khoản"
              placeholder="098765431"
              value={userName}
              onChangeValue={onChangeUserName}
              maxLength={20}
              keyboardType="numeric"
            />
            <AppText>{error}</AppText>
          </View>

          <AppInput
            text="Mật khẩu"
            placeholder="123abc"
            value={password}
            onChangeValue={onChangePassword}
            secureTextEntry
          />
          <AppText>{errorPass}</AppText>

          <View style={styles.viewForgotPass}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.navigate('ForgotPassScreen')}>
              <AppText style={{color: 'blue'}}>Quên mật khẩu?</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.btnLogin}>
            <AppButton
              text="Đăng nhập"
              onPress={loginApp}
              disabled={!_.isEmpty(error) || !_.isEmpty(errorPass)}
            />
          </View>

          <View style={styles.viewSignup}>
            <AppText style={styles.touch}>Bạn chưa có tài khoản? </AppText>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <AppText style={{color: 'blue'}}>Đăng ký ngay!</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
