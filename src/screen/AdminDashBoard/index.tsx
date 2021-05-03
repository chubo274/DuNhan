import {useIsFocused} from '@react-navigation/native';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tourActions from 'redux/actions/tourActions';
import {RootState} from 'redux/reducers';
import styles from './styles';
import AppButton from 'components/AppButton';
import {FORMAT_DATE} from 'helpers/constants';
const AdminDashBoard = () => {
  //! Hook, Reducers
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const listBooking = useSelector(
    (state: RootState) => state.bookingReducer.data,
  );
  //! State
  const [start_date, setstart_date] = useState(moment().toDate());
  const [end_date, setend_date] = useState(moment().toDate());
  //! Function
  const onChangestart_date = (date: any) => {
    setstart_date(date);
  };
  const onChangesend_date = (date: any) => {
    setend_date(date);
  };

  const onFilter = () => {
    console.log(
      moment(start_date).format(FORMAT_DATE),
      moment(end_date).format(FORMAT_DATE),
    );
  };

  //! UseEffects
  // useEffect(() => {
  //   if (isFocused) dispatch(tourActions.listBookingAllTours());
  // }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack title={'Thống kê'} />
      <View style={styles.container}>
        <View style={styles.viewDateFilter}>
          <View style={{flex: 4}}>
            <AppInput
              typeModal="DatePicker"
              text="Từ Ngày :"
              value={start_date}
              onChangeValue={onChangestart_date}
              maximumDate={moment(end_date).toDate()}
            />
          </View>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <AppInput
              typeModal="DatePicker"
              text="Đến Ngày :"
              value={end_date}
              onChangeValue={onChangesend_date}
              minimumDate={moment(start_date).toDate()}
            />
          </View>
        </View>
        <View style={styles.viewbtnFilter}>
          <AppButton text="Lọc" onPress={onFilter} />
        </View>
      </View>
    </>
  );
};

export default AdminDashBoard;
