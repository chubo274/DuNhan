import {useIsFocused} from '@react-navigation/core';
import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';
import UserCard from './components/UserCard';
const AdminBookingUser = () => {
  //! Hook, Reducers
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  //! State

  //! Function

  //! UseEffects
  useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getAllUserData());
    }
  }, [isFocused]);

  //! Render
  return (
    <>
      <AppHeaderBack title={'Danh sách User'} />
      <UserCard />
    </>
  );
};

export default AdminBookingUser;
