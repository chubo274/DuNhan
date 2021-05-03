import AppHeaderBack from 'components/AppHeaderBack';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Modal, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import {FORMAT_DATE, HIT_SLOP} from 'helpers/constants';
import {IMAGE} from 'assets';
import TourItem from 'components/TourItem';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from 'helpers/color';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import tourActions from 'redux/actions/tourActions';
const TicketScreen = () => {
  //! State
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user_id = useSelector(
    (state: RootState) => state.userReducer.data?._id,
  );
  const listTours = useSelector((state: RootState) => state.tourReducer.data);
  const listBookingByUser = useSelector(
    (state: RootState) => state.bookingReducer.data,
  );
  const data = listBookingByUser.map((el) => {
    const tour = listTours.find((elTour) => elTour._id === el.tour);
    return {...el, tour: {...tour}};
  });

  const now = moment().format(FORMAT_DATE);
  const data2 = [
    {
      id: 1,
      avatar: IMAGE.listTourMB,
      name: 'Hà Nội - Hưng Yênnnnnnnnnnnnnnnn',
      placeStart: 'Hà Nội',
      timeStart: now,
      travelTime: '3 ngày đêm 2',
      slots: 10,
      price: 2000000,
      discount: 20,
      bookingDate: now,
      totalTicket: 5,
      totalMoney: 10000000,
    },
    {
      id: 2,
      avatar: IMAGE.listTourMN,
      name: 'TP.HCM - Phú Quốc',
      placeStart: 'TP.HCM',
      timeStart: now,
      slots: 7,
      travelTime: '3 ngày đêm 2',
      price: 1500000,
      bookingDate: now,
      totalTicket: 2,
      totalMoney: 3000000,
    },
  ];
  const [checked, setChecked] = useState(false);
  const [showModalBooking, setShowModalBooking] = useState(false);
  //! Function
  const toggleModalBooking = () => {
    setShowModalBooking(!showModalBooking);
    if (showModalBooking) {
      setChecked(false);
    }
  };
  const onCancelTicket = () => {
    toggleModalBooking();
  };
  const onCheck = () => {
    setChecked(!checked);
  };
  const onConfirmCancel = () => {};
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          ticketBooked
          avatar={item.tour.avatar}
          name={item.tour.name}
          placeStart={item.tour.place_start}
          timeStart={moment(item.tour.time_start).format(FORMAT_DATE)}
          // travelTime={item.tour.travel_time}
          travelTimeDay={item.tour.travel_time.day}
          travelTimeNight={item.tour.travel_time.night}
          bookingDate={moment(item.booking_date).format(FORMAT_DATE)}
          totalTicket={item.total_ticket}
          totalMoney={item.total_money}
          onPress={() => {
            navigation.navigate('DetailTourScreen', {id: item.tour._id});
          }}
        />
        <AppButton
          text={'Yêu cầu huỷ vé'}
          onPress={
            item.can_dispose
              ? onCancelTicket
              : () => {
                  Alert.alert(
                    'Thông báo!',
                    'Số vé đã đặt trong thời điểm siêu ưu đãi, xin vui lòng không hoàn vé!',
                    [
                      {
                        text: 'Ok',
                      },
                    ],
                    {cancelable: false},
                  );
                }
          }
        />
        <Modal
          visible={showModalBooking}
          transparent
          animationType="fade"
          onRequestClose={toggleModalBooking}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.viewModal}
            onPress={toggleModalBooking}>
            <TouchableOpacity activeOpacity={1} style={styles.viewContent}>
              <TouchableOpacity
                hitSlop={HIT_SLOP}
                onPress={onCheck}
                style={styles.viewRule}>
                <View style={styles.checkBox}>
                  {checked && (
                    <AntDesign name={'check'} size={22} color={color.sundown} />
                  )}
                </View>
                <View style={styles.textRule}>
                  <AppText>
                    Đồng ý với Nhân Du về các điều khoản, quy định khi hoàn huỷ
                    vé.
                  </AppText>
                </View>
              </TouchableOpacity>
              <AppButton
                text="Xác Nhận"
                onPress={onConfirmCancel}
                disabled={!checked}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  //! Effect
  useEffect(() => {
    if (isFocused) {
      const body = {user_id};
      dispatch(tourActions.listBookingByUserTours(body));
    }
  }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack title="Vé của bạn" />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) =>
            !!item.id ? item.id.toString() : item._id.toString()
          }
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default TicketScreen;
