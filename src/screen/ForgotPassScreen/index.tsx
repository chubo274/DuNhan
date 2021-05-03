import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import _ from 'lodash';

const ForgotPassScreen = () => {
  //! State
  const navigation = useNavigation();
  const [userName, setUserName] = useState<number>();

  //! Function
  const onChangeUserName = (data: number) => {
    setUserName(data);
  };

  const onPress = () => {
    const param = {user_name: userName};
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
