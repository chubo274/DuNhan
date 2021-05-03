import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';
import styles from './styles';
const AdminProfile = () => {
  //! Hook, Reducers
  const dispatch = useDispatch();
  //! State

  //! Function
  const onLogOut = () => {
    dispatch({type: '_REQUEST'});
    dispatch(userActions.logout());
  };
  //! UseEffects

  //! Render
  return (
    <>
      <AppHeaderBack title="Thông tin quản trị viên" />
      <View style={styles.viewbtnLogOut}>
        <AppButton text="Đăng xuất" onPress={onLogOut} />
      </View>
    </>
  );
};

export default AdminProfile;
