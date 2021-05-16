import {useIsFocused} from '@react-navigation/core';
import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {RootState} from 'redux/reducers';
import UserCard from './components/UserCard';
const AdminBookingUser = () => {
  //! Hook, Reducers
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  //! State
  const allUserData = useSelector(
    (state: RootState) => state.userReducer.allUserData,
  );
  //! Function

  const renderUserCard = ({item, index}: any) => {
    return <UserCard />;
  };
  //! UseEffects
  useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getAllUserData());
    }
  }, [isFocused]);

  //! Render
  return (
    <View>
      <AppHeaderBack title={'Danh sách User'} />
      <FlatList
        data={allUserData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderUserCard}
      />
    </View>
  );
};

export default AdminBookingUser;
