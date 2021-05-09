import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';
import {useRoute} from '@react-navigation/native';
const NewPass = () => {
  //! Hook, Reducers
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route: any = useRoute();
  const isChangePass = route.params?.isChangePass;
  const phone = route.params?.phone;

  //! State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorConfirmPass, setConfirmErrorPass] = useState('');
  //! Function
  const onChangePassword = (data: string) => {
    setPassword(data);
  };
  const onChangeConfirmPassword = (data: string) => {
    setConfirmPassword(data);
  };

  const onChangePass = () => {
    dispatch(
      userActions.updateUserData(
        {password: password},
        {
          onSuccess: () => {
            Alert.alert(
              'Thông báo',
              'Cập nhật thành công!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.goBack(), navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          },
          onFailed: (err: string) => {
            Alert.alert(
              'Xảy ra lỗi',
              'Đổi mật khẩu không thành công',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          },
        },
      ),
    );
  };

  const onForgotPass = () => {
    dispatch(
      userActions.forgotPass(
        {phone, password},
        {
          onSuccess: () => {
            Alert.alert(
              'Thông báo',
              'Cập nhật thành công!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.navigate('LoginScreen');
                  },
                },
              ],
              {cancelable: false},
            );
          },
          onFailed: (err: string) => {
            Alert.alert(
              'Xảy ra lỗi',
              'Đổi mật khẩu không thành công',
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          },
        },
      ),
    );
  };
  //! UseEffects
  useEffect(() => {
    if (!_.isEmpty(password?.toString().trim())) {
      if (password.length > 7) setErrorPass('');
      else setErrorPass('Trường này ít nhất 8 ký tự');
    } else {
      setErrorPass('Trường này không được để trống');
    }

    if (password !== confirmPassword) {
      setConfirmErrorPass('Mật khẩu chưa khớp');
    } else {
      if (_.isEmpty(confirmPassword)) {
        setConfirmErrorPass('Trường này không được để trống');
      } else {
        setConfirmErrorPass('');
      }
    }
  }, [password, confirmPassword]);
  //! Render
  return (
    <>
      <AppHeaderBack
        title={'Mật khẩu mới'}
        headerBack
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={{paddingBottom: 15}}>
          <AppInput
            text="Mật khẩu"
            placeholder="123abcxyz"
            value={password}
            onChangeValue={onChangePassword}
            secureTextEntry
          />
          <AppText style={{color: 'red'}}>{errorPass}</AppText>
        </View>
        <AppInput
          text="Nhập lại mật khẩu"
          placeholder="123abcxyz"
          value={confirmPassword}
          onChangeValue={onChangeConfirmPassword}
          secureTextEntry
        />
        <AppText style={{color: 'red'}}>{errorConfirmPass}</AppText>

        <View style={styles.btnLogin}>
          <AppButton
            text="Đổi mật khẩu"
            onPress={isChangePass ? onChangePass : onForgotPass}
            disabled={!_.isEmpty(errorConfirmPass)}
          />
        </View>
      </View>
    </>
  );
};

export default NewPass;
