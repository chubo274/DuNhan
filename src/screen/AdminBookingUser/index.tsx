import {useIsFocused, useNavigation} from '@react-navigation/core';
import AppHeaderBack from 'components/AppHeaderBack';
import styles from './styles';
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
  const navigation = useNavigation();
  //! State
  const allUserData = useSelector(
    (state: RootState) => state.userReducer.allUserData,
  );
  //! Function

  const renderUserCard = ({item, index}: any) => {
    return (
      <UserCard
        id={item._id}
        name={item.name}
        phone={item.phone}
        bank_number={item.bank_number}
        money_available={item.money_available}
        onPress={() =>
          navigation.navigate('TicketScreen', {
            userId: item._id,
            userName: item.name,
          })
        }
      />
    );
  };
  //! UseEffects
  useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getAllUserData());
    }
  }, [isFocused]);

  //! Render
  return (
    <>
      <AppHeaderBack title={'Danh sách khách hàng'} />
      <View style={styles.container}>
        <FlatList
          data={allUserData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderUserCard}
        />
      </View>
    </>
  );
};

export default AdminBookingUser;
