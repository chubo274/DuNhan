import {useNavigation} from '@react-navigation/native';
import {IMAGE} from 'assets';
import AppButton from 'components/AppButton';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import React, {useEffect, useState} from 'react';
import {Alert, ImageBackground, View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';
import {HIT_SLOP} from 'helpers/constants';

const LoginScreen = () => {
  //! State
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState('');

  //! Function
  const onChangeUserName = (data: string) => {
    setUserName(data);
  };
  const onChangePassword = (data: string) => {
    setPassword(data);
  };

  const loginApp = () => {
    dispatch(
      userActions.login(
        {user_name: userName, password},
        {
          onFailed: (err?: string) => {
            Alert.alert(
              'Thông báo',
              err ? err : 'Sai tài khoản mật khẩu',
              [
                {
                  text: 'ok',
                },
              ],
              {cancelable: false},
            );
          },
        },
      ),
    );
  };
  //! UseEffect
  useEffect(() => {
    if (!_.isEmpty(userName?.toString().trim())) {
      setError('');
    } else {
      setError('Trường này không được để trống');
    }
  }, [userName]);

  useEffect(() => {
    if (!_.isEmpty(password?.toString().trim())) {
      if (password.length > 7) setErrorPass('');
      else setErrorPass('Trường này ít nhất 8 ký tự');
    } else {
      setErrorPass('Trường này không được để trống');
    }
  }, [password]);

  //! Render
  return (
    <ImageBackground source={IMAGE.bgLogin} style={styles.imgBg}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        enableOnAndroid>
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
              // keyboardType="number-pad"
            />
            <AppText style={{color: 'red'}}>{error}</AppText>
          </View>

          <AppInput
            text="Mật khẩu"
            placeholder="123abcxyz"
            value={password}
            onChangeValue={onChangePassword}
            secureTextEntry
          />
          <AppText style={{color: 'red'}}>{errorPass}</AppText>

          <View style={styles.viewForgotPass}>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              style={styles.touch}
              onPress={() => navigation.navigate('ForgotPassScreen')}>
              <AppText style={{color: 'blue'}}>Quên mật khẩu?</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.btnLogin}>
            <AppButton
              text="Đăng nhập"
              onPress={loginApp}
              disabled={!_.isEmpty(error)}
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
