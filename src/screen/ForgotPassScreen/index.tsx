import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import _ from 'lodash';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const ForgotPassScreen = () => {
  //! State
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState('');

  //! Function
  const onChangeUserName = (data: string) => {
    setUserName(data);
  };

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(userName);
    console.log('conf', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm?.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const onPress = async () => {
    const param = {user_name: userName};
    await signInWithPhoneNumber();
    //check xem có user không?
    navigation.navigate('CodeForGetPassScreen', param);
  };
  //! UseEffect

  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title={'Quên mật khẩu'} headerBack />
      <View style={styles.viewInput}>
        <AppInput
          text="Nhập số điện thoại"
          placeholder="098765431"
          value={userName}
          onChangeValue={onChangeUserName}
          maxLength={20}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnLogin}>
        <AppButton
          text="Lấy mã"
          onPress={onPress}
          disabled={_.isEmpty(userName)}
        />
      </View>
    </View>
  );
};

export default ForgotPassScreen;
