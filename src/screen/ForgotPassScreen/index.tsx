import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, View} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import {validatePhoneNumberVN} from 'helpers/function';
import {useDispatch} from 'react-redux';
import AppText from 'components/AppText';

const ForgotPassScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //! State
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  //! Function
  const onChangeUserName = (data: string) => {
    setUserName(data);
  };
  const convertPhoneNumber = () => {
    let result = userName;
    if (result[0] === '0') {
      result = '84' + result.substr(1);
    }
    return `+${result}`;
  };
  const signInWithPhoneNumber = async () => {
    Keyboard.dismiss();
    try {
      dispatch({type: '_REQUEST'});
      const confirmation = await auth().signInWithPhoneNumber(
        convertPhoneNumber(),
      );
      dispatch({type: ''});
      navigation.navigate('CodeForGetPassScreen', {confirmation, userName});
    } catch (error) {
      console.log('signInWithPhoneNumber -> error', {error});
      dispatch({type: ''});
      let message = error.userInfo.message;
      if (
        message.includes('incorrect') ||
        message.includes('TOO_') ||
        message.includes('format of the phone number')
      ) {
        message = 'Số điện thoại không hợp lệ';
      }
      Alert.alert('Thông báo!', message);
    }
  };
  const onPress = () => {
    const param = validatePhoneNumberVN(userName);
    if (!param) {
      Alert.alert(
        'Thông báo!',
        'Vui lòng nhập đúng định dạng số điện thoại Việt Nam',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
    } else {
      signInWithPhoneNumber();
    }
  };
  //! UseEffect
  useEffect(() => {
    if (
      !_.isEmpty(userName?.toString().trim()) &&
      String(userName)?.length >= 10
    ) {
      setError('');
    } else {
      setError('Trường này phải ít nhất 10 ký tự');
    }
  }, [userName]);
  //! Render
  return (
    <>
      <AppHeaderBack title={'Quên mật khẩu'} headerBack />
      <View style={styles.container}>
        <View style={{marginBottom: 24}}>
          <AppInput
            text="Nhập số điện thoại"
            placeholder="098765431"
            value={userName}
            onChangeValue={onChangeUserName}
            maxLength={20}
            keyboardType="numeric"
          />
          <AppText style={{color: 'red'}}>{error}</AppText>
        </View>
        <View style={styles.btnLogin}>
          <AppButton
            text="Lấy mã"
            onPress={onPress}
            disabled={_.isEmpty(userName)}
          />
        </View>
      </View>
    </>
  );
};

export default ForgotPassScreen;
