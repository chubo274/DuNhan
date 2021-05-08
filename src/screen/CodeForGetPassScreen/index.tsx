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

const CodeForGetPassScreen = () => {
  const route: any = useRoute();
  const {confirmation, userName} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //! State
  const [value, setValue] = useState('');

  //! Function
  const onChangeValue = (data: string) => {
    setValue(data);
  };

  const onConfirm = async () => {
    Keyboard.dismiss();
    try {
      dispatch({type: '_REQUEST'});
      const res = await confirmation.confirm(value);
      console.log('confirmCode -> res', res);
      const signOut = await auth().signOut();
      dispatch({type: ''});
      navigation.navigate('NewPass', {phone: userName});
    } catch (error) {
      dispatch({type: ''});
      console.log('confirmCode -> error', error);
      console.log('Invalid code.');
      setValue('');
      Alert.alert('Thông báo', 'Mã code không đúng!');
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
