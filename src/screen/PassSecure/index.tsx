import {useNavigation} from '@react-navigation/core';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {RootState} from 'redux/reducers';
import styles from './styles';
const PassSecure = () => {
  //! Hook, Reducers
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userName = useSelector(
    (state: RootState) => state.userReducer.data.phone,
  );
  //! State
  const [password, setPassword] = useState('');
  const [errorPass, setErrorPass] = useState('');
  //! Function
  const onChangePassword = (data: string) => {
    setPassword(data);
  };

  const onGoToChangPass = () => {
    dispatch(
      userActions.login(
        {user_name: userName, password},
        {
          onSuccess: () => {
            navigation.navigate('NewPass', {isChangePass: true});
          },
          onFailed: (err: string) => {
            let errorMessage = err;
            Alert.alert(
              'Thông báo',
              'Sai mật khẩu',
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
  //! UseEffects
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
    <>
      <AppHeaderBack title={'Xác nhận mật khẩu'} headerBack />
      <View style={styles.container}>
        <AppInput
          text="Mật khẩu"
          placeholder="123abcxyz"
          value={password}
          onChangeValue={onChangePassword}
          secureTextEntry
        />
        <AppText style={{color: 'red'}}>{errorPass}</AppText>
        <View style={styles.btnLogin}>
          <AppButton
            text="Xác Nhận"
            onPress={onGoToChangPass}
            disabled={!_.isEmpty(errorPass)}
          />
        </View>
      </View>
    </>
  );
};

export default PassSecure;
