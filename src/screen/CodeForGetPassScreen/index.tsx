import {useNavigation, useRoute} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import _ from 'lodash';

const CodeForGetPassScreen = () => {
  //! State
  const [value, setValue] = useState<number>();
  const param = useRoute().params;
  console.log(param);

  //! Function
  const onChangeValue = (data: number) => {
    setValue(data);
  };

  const onConfirm = () => {};

  const onGetAgain = () => {};
  //! UseEffect

  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title={'Quên mật khẩu'} />
      <View style={styles.viewInput}>
        <AppInput
          text="Điền mã code"
          placeholder="x789"
          value={value}
          onChangeValue={onChangeValue}
          maxLength={20}
        />
      </View>
      <View style={styles.btnLogin}>
        <AppButton
          text="Xác nhận"
          onPress={onConfirm}
          disabled={!_.isEmpty(value)}
        />
      </View>
      <View style={styles.btnLogin}>
        <AppButton text="Lấy lại mã" onPress={onGetAgain} />
      </View>
    </View>
  );
};

export default CodeForGetPassScreen;
