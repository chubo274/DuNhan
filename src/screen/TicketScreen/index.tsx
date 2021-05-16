import AppHeaderBack from 'components/AppHeaderBack';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Modal, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import {FORMAT_DATE, HIT_SLOP} from 'helpers/constants';
import {IMAGE} from 'assets';
import TourItem from 'components/TourItem';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/core';
import AppButton from 'components/AppButton';
import AppText from 'components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from 'helpers/color';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import tourActions from 'redux/actions/tourActions';
import FieldRule from './components/FieldRule';
import {converNumberToPrice} from 'helpers/function';
import MoneyField from 'screen/TicketScreen/components/MoneyField';
const TicketScreen = () => {
  const route: any = useRoute();
  const userId = route.params?.userId;
  const userName = route.params?.userName;

  //! State
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const listBookingByUser = useSelector(
    (state: RootState) => state.bookingReducer.data,
  );

  const [checked, setChecked] = useState(false);
  const [showModalBooking, setShowModalBooking] = useState(false);
  //TODO for show and match cancel Data
  const [timeStartTour, setTimeStartTour] = useState();
  const [moneyPayed, setMoneyPayed] = useState(0);
  const [percentRefund, setPercentRefund] = useState(0);
  const [idTour, setIdTour] = useState('');
  const [idBooking, setIdBooking] = useState('');
  //! Function
  const toggleModalBooking = () => {
    setShowModalBooking(!showModalBooking);
    if (showModalBooking) {
      setChecked(false);
    }
  };
  const onCancelTicket = (
    idTour: string,
    idBook: string,
    timeStart: any,
    bookingMoneyPayed: any,
  ) => {
    //* chuẩn bị data để hiển thị
    setIdTour(idTour);
    setIdBooking(idBook);
    setTimeStartTour(timeStart);
    setMoneyPayed(Number(bookingMoneyPayed));

    if (moment(timeStart).diff(moment().toDate(), 'days') > 9) {
      setPercentRefund(100);
    } else if (moment(timeStart).diff(moment().toDate(), 'days') > 7) {
      setPercentRefund(75);
    } else if (moment(timeStart).diff(moment().toDate(), 'days') > 5) {
      setPercentRefund(50);
    } else if (moment(timeStart).diff(moment().toDate(), 'days') > 3) {
      setPercentRefund(25);
    } else setPercentRefund(0);

    //* hiển thị modal
    toggleModalBooking();
  };
  const onCheck = () => {
    setChecked(!checked);
  };
  const onConfirmCancel = () => {
    const body = {tour_id: idTour, booking_id: idBooking, userId};
    dispatch(
      tourActions.cancelBookingTours(body, {
        onSuccess: () => {
          Alert.alert(
            'Thông báo!',
            !!userId
              ? `Huỷ vé và hoàn tiền thành công cho khách hàng ${userName}`
              : 'Huỷ vé và hoàn tiền thành công. Vui lòng kiểm tra tài khoản!',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        },
        onFailed: () => {
          Alert.alert(
            'Cảnh báo!',
            'Oops! Lỗi bất ngờ',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        },
      }),
    );
    toggleModalBooking();
  };
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          ticketBooked
          avatar={item.tour[0].avatar}
          name={item.tour[0].name}
          placeStart={item.tour[0].place_start}
          timeStart={moment(item.tour[0].time_start).format(FORMAT_DATE)}
          // travelTime={item.tour[0].travel_time}
          travelTimeDay={item.tour[0].travel_time.day}
          travelTimeNight={item.tour[0].travel_time.night}
          bookingDate={moment(item.booking_date).format(FORMAT_DATE)}
          totalTicket={item.total_ticket}
          totalMoney={item.total_money}
          onPress={() => {
            !!userId
              ? null
              : navigation.navigate('DetailTourScreen', {id: item.tour[0]._id});
          }}
        />
        {moment(item.tour[0].time_start)
          .startOf('day')
          .isAfter(moment().startOf('day')) && (
          <AppButton
            text={item.can_dispose ? 'Hoàn vé' : 'Không hỗ trợ huỷ'}
            onPress={
              item.can_dispose
                ? () =>
                    onCancelTicket(
                      item.tour[0]._id,
                      item._id,
                      item.tour[0].time_start,
                      item.total_money,
                    )
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
        )}
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
              <View>
                <View style={styles.titlePay}>
                  <AppText style={styles.textPay}>Quy định hoàn vé</AppText>
                </View>
                <AppText style={{paddingVertical: 4}}>
                  Huỷ vé hoàn tiền ứng với số ngày so với ngày khởi hành:
                </AppText>
                <FieldRule
                  title={'nhiều hơn 9 ngày hoàn: '}
                  data={'100%'}
                  active={
                    moment(timeStartTour).diff(moment().toDate(), 'days') > 9
                  }
                />
                <FieldRule
                  title={'nhiều hơn 7 ngày hoàn: '}
                  data={'75%'}
                  active={
                    moment(timeStartTour).diff(moment().toDate(), 'days') > 7 &&
                    moment(timeStartTour).diff(moment().toDate(), 'days') <= 9
                  }
                />
                <FieldRule
                  title={'nhiều hơn 5 ngày hoàn: '}
                  data={'50%'}
                  active={
                    moment(timeStartTour).diff(moment().toDate(), 'days') > 5 &&
                    moment(timeStartTour).diff(moment().toDate(), 'days') <= 7
                  }
                />
                <FieldRule
                  title={'nhiều hơn 3 ngày hoàn: '}
                  data={'25%'}
                  active={
                    moment(timeStartTour).diff(moment().toDate(), 'days') > 3 &&
                    moment(timeStartTour).diff(moment().toDate(), 'days') <= 5
                  }
                />
                <FieldRule
                  title={'bằng hay ít hơn 3 ngày hoàn: '}
                  data={'0%'}
                  active={
                    moment(timeStartTour).diff(moment().toDate(), 'days') <= 3
                  }
                />
                <View style={styles.titlePay}>
                  <AppText style={styles.textPay}>
                    Số tiền đã thanh toán
                  </AppText>
                </View>
                <MoneyField
                  title={'Đã thanh toán: '}
                  data={converNumberToPrice(
                    Number(Number(moneyPayed).toFixed(0)),
                  )}
                />
                <View style={styles.titlePay}>
                  <AppText style={styles.textPay}>
                    Số tiền hoàn trả khi huỷ
                  </AppText>
                </View>
                <MoneyField
                  title={'Sễ hoàn trả: '}
                  data={converNumberToPrice(
                    Number(
                      Number(moneyPayed * (percentRefund / 100)).toFixed(0),
                    ),
                  )}
                />
              </View>
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
      dispatch(
        tourActions.listBookingByUserTours(userId, {
          onFailed: (err: string) => {
            Alert.alert(
              'Cảnh báo!',
              err,
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          },
        }),
      );
    }
  }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack
        title={!!userId ? `Vé của ${userName}` : 'Vé của bạn'}
        headerBack={!!userId ? true : false}
      />
      <View style={styles.container}>
        <FlatList
          data={listBookingByUser}
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
