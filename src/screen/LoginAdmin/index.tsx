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

const LoginAdminScreen = () => {
  //! State
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    dispatch(
      userActions.login(
        {user_name: userName, password},
        {
          onFailed: (err: string) => {
            let errorMessage = err;
            Alert.alert(
              'Thông báo',
              errorMessage,
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
    if (
      !_.isEmpty(userName?.toString().trim()) &&
      String(userName)?.length > 7
    ) {
      setError('');
    } else {
      setError('Trường này phải ít nhất 8 ký tự');
    }
  }, [userName]);

  useEffect(() => {
    if (String(password)?.length > 7) {
      setErrorPass('');
    } else {
      setErrorPass('Trường này phải ít nhất 8 ký tự');
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
              keyboardType="number-pad"
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

          <View style={styles.viewForgotPass}></View>

          <View style={styles.btnLogin}>
            <AppButton
              text="Đăng nhập"
              onPress={loginApp}
              disabled={!_.isEmpty(error)}
            />
          </View>

          <View style={styles.viewSignup}></View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default LoginAdminScreen;
