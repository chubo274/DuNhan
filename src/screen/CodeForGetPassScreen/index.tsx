import {useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, View} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {signUpAction} from 'redux/actions/userActions';

const CodeForGetPassScreen = () => {
  const route: any = useRoute();
  const {confirmation, userName, signupData} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //! State
  const [value, setValue] = useState('');
  const [errorTime, setErrorTime] = useState(3);

  //! Function
  const onChangeValue = (data: string) => {
    setValue(data);
  };
  const onChangeErrorTime = (data: number) => {
    setErrorTime(data);
  };

  const onSignUp = () => {
    dispatch(
      signUpAction(signupData, {
        onSuccess: () => {
          Alert.alert(
            'Thông báo',
            'Đăng ký thành công!',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setTimeout(() => navigation.goBack(), 500);
                  navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
        },
        onFailed: (err: string) => {
          let errorMessage = err;

          if (errorMessage.includes('duplicate key error collection')) {
            errorMessage =
              'Số điện thoại này đã được sử dụng! Vui lòng đổi số để có thể đăng ký.';
          } else if (errorMessage.includes('is required')) {
            errorMessage = 'Bạn cần nhập đủ những trường bắt buộc';
          }
          Alert.alert(
            'Xảy ra lỗi',
            errorMessage,
            [
              {
                text: 'Ok',
                onPress: () => {
                  setTimeout(() => navigation.goBack(), 500);
                  navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
        },
      }),
    );
  };

  const onConfirm = async () => {
    Keyboard.dismiss();
    try {
      dispatch({type: '_REQUEST'});
      const res = await confirmation.confirm(value);
      console.log('confirmCode -> res', res);
      const signOut = await auth().signOut();
      dispatch({type: ''});
      signupData
        ? () => onSignUp()
        : navigation.navigate('NewPass', {phone: userName});
    } catch (error) {
      dispatch({type: ''});
      console.log('confirmCode -> error', error);
      console.log('Invalid code.');
      setValue('');
      if (errorTime > 0) {
        Alert.alert(
          'Thông báo',
          `Mã code không đúng, bạn còn ${errorTime} lần thử.`,
        );
        onChangeErrorTime(errorTime - 1);
      } else
        Alert.alert(
          'Thông báo',
          'Bạn đã nhập sai mã OTP quá nhiều, vui lòng thử lại!',
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
    }
  };

  //! UseEffect
  useEffect(() => {
    Alert.alert(
      'Thông báo!',
      'Mã kích hoạt đang được gửi đến số điện thoại của bạn. Vui lòng chờ trong giây lát',
    );
  }, []);
  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title={'Quên mật khẩu'} headerBack />
      <View style={styles.viewInput}>
        <AppInput
          text="Điền mã code"
          placeholder="123456"
          value={value}
          onChangeValue={onChangeValue}
          maxLength={6}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.btnLogin}>
        <AppButton
          text="Xác nhận"
          onPress={onConfirm}
          disabled={_.isEmpty(value)}
        />
      </View>
    </View>
  );
};

export default CodeForGetPassScreen;
