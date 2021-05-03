import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React, {useCallback, useEffect, useState} from 'react';
import {Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {FORMAT_DATE, HIT_SLOP} from 'helpers/constants';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppSilder from 'components/AppSilder';
import AppButton from 'components/AppButton';
import {useRoute} from '@react-navigation/core';
import color from 'helpers/color';
import {converNumberToPrice} from 'helpers/function';
import PayField from './components/PayField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import AppReadMore from 'components/AppReadMore';
import AppTimeLineSchedule from 'components/AppTimeLineSchedule';
import tourActions from 'redux/actions/tourActions';
import {Alert} from 'react-native';
const DetailTourScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userReducer.data);
  const listTour = useSelector((state: RootState) => state.tourReducer.data);
  //! State
  //TODO booking
  const [showModalBooking, setShowModalBooking] = useState(false);
  const [ticket, setTicket] = useState(1);
  const [checked, setChecked] = useState(false);
  const [disabledMinus, setDisabledMinus] = useState(true);
  const [disabledPlus, setDisabledPlus] = useState(false);
  //TODO Pay
  const [showModalPay, setShowModalPay] = useState(false);
  //TODO getDataDetail
  const route: any = useRoute();
  const id = route.params?.id;
  const data = listTour.find((el: any) => {
    if (el._id === id) return el;
  });

  //! Function
  const toggleModalBooking = () => {
    setShowModalBooking(!showModalBooking);
    if (showModalBooking) {
      setTicket(1);
      setChecked(false);
      setDisabledMinus(true);
      setDisabledPlus(false);
    }
  };
  const toggleModalPay = () => {
    setShowModalPay(!showModalPay);
    console.log(moment().toDate());
  };
  const reListPlaces = (data: any) => {
    let newList = '';
    data.map((el: any, index: any) => {
      if (index < data.length - 1) newList = newList + el.name + ', ';
      else newList = newList + el.name;
    });
    return newList;
  };

  //! Effect

  //! Render

  const bookingticket = () => {
    const onMinus = () => {
      setTicket(ticket - 1);
      if (ticket - 1 <= 1) {
        setDisabledMinus(true);
        setDisabledPlus(false);
      } else {
        setDisabledMinus(false);
        setDisabledPlus(false);
      }
    };
    const onPlus = () => {
      setTicket(ticket + 1);
      if (ticket + 1 >= data.slots) {
        setDisabledMinus(false);
        setDisabledPlus(true);
      } else {
        setDisabledMinus(false);
        setDisabledPlus(false);
      }
    };

    const onCheck = () => {
      setChecked(!checked);
    };

    const onApplyBook = () => {
      toggleModalPay();
    };

    const onPay = (
      total_ticket: number,
      total_money: number,
      discount: number,
    ) => {
      toggleModalPay();
      toggleModalBooking();
      const body = {
        id: data._id,
        tour: data._id,
        user: userData._id,
        booking_date: moment().toDate(),
        total_money,
        total_ticket,
        discount,
      };
      dispatch(
        tourActions.userBookingTour(body, {
          onSuccess: () => {
            Alert.alert(
              'Thành công!',
              'Đặt Tour thành công',
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
              'Lỗi!',
              'Đặt Tour không thành công',
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
    };

    return (
      <>
        <View style={styles.viewBooking}>
          <AppText>Chọn số vé mà bạn muốn đặt : </AppText>
          <View>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              onPress={onPlus}
              disabled={disabledPlus}>
              <AntDesign
                name={'caretup'}
                size={22}
                color={disabledPlus ? color.fade : color.sundown}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <AppText>{ticket}</AppText>
            </View>
            <TouchableOpacity
              hitSlop={HIT_SLOP}
              onPress={onMinus}
              disabled={disabledMinus}>
              <AntDesign
                name={'caretdown'}
                size={22}
                color={disabledMinus ? color.fade : color.sundown}
              />
            </TouchableOpacity>
          </View>
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
              Đồng ý với Nhân Du về các điều khoản, quy định khi tham gia Tour.
            </AppText>
          </View>
        </TouchableOpacity>
        <AppButton text="Xác Nhận" onPress={onApplyBook} disabled={!checked} />
        <Modal
          visible={showModalPay}
          transparent
          animationType="fade"
          onRequestClose={toggleModalPay}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.viewModal}
            onPress={toggleModalPay}>
            <TouchableOpacity activeOpacity={1} style={styles.viewContent}>
              <View style={styles.titlePay}>
                <AppText style={styles.textPay}>Thanh toán đặt vé</AppText>
              </View>
              <PayField title={'Tên tour: '} data={data.name} />
              <PayField
                title={'Khởi hành: '}
                data={moment(data.time_start).format(FORMAT_DATE)}
              />
              <PayField
                title={'Đơn giá: '}
                data={converNumberToPrice(data.price)}
              />
              <PayField title={'Khuyến mại: '} data={`${data.discount}%`} />
              <PayField title={'Số vé: '} data={ticket} />
              <PayField
                title={'Thành tiền: '}
                data={converNumberToPrice(
                  (data.price * (100 - data.discount) * ticket) / 100,
                )}
              />
              <View style={styles.titlePay}>
                <AppText style={styles.textPay}>Tài khoản</AppText>
              </View>
              <PayField
                title={'Só dư khả dụng: '}
                data={converNumberToPrice(userData.money_available)}
              />
              <View style={styles.viewBtnPay}>
                <AppButton
                  text="Thanh toán"
                  onPress={() =>
                    onPay(
                      ticket,
                      (data.price * (100 - data.discount) * ticket) / 100,
                      data.discount,
                    )
                  }
                  disabled={
                    userData.money_available -
                      (data.price * (100 - data.discount) * ticket) / 100 <
                    0
                  }
                />
                <AppButton text="Quay lại" onPress={toggleModalPay} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };
  //----- hết phần modal đặt
  //! Render
  return (
    <>
      <AppHeaderBack title="Chi Tiết Tour" headerBack />
      <AppSilder data={data.list_images} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titlePay}>
            <AppText style={styles.textTourName}>{data.name}</AppText>
          </View>
          <PayField title={'Điểm xuất phát: '} data={data.place_start} />
          <PayField title={'Điểm du lịch: '} data={reListPlaces(data.places)} />
          <PayField
            title={'Khởi hành: '}
            data={moment(data.time_start).format(FORMAT_DATE)}
          />
          <PayField
            title={'Thời gian tour: '}
            data={`${data.travel_time.day} ngày ${
              data.travel_time.night ?? 0
            } đêm`}
          />
          <PayField title={'Số vé còn nhận: '} data={data.slots} />
          <AppText style={styles.textTitlePath}>Mô Tả</AppText>
          <AppReadMore longText={data.description} />
          <AppText style={styles.textTitlePath}>Lộ Trình</AppText>
          {data.schedule.map((el: any, index: any) => {
            if (index === 0)
              return (
                <AppTimeLineSchedule
                  key={index}
                  title={`${el.day}: ${el.title}`}
                  longText={el.detail}
                  firstPoint
                />
              );
            else if (index === data.schedule.length - 1)
              return (
                <AppTimeLineSchedule
                  key={index}
                  title={`${el.day}: ${el.title}`}
                  longText={el.detail}
                  lastPoint
                />
              );
            else
              return (
                <AppTimeLineSchedule
                  key={index}
                  title={`${el.day}: ${el.title}`}
                  longText={el.detail}
                />
              );
          })}
          <AppText style={styles.textTitlePath}>Ghi Chú</AppText>
          {data.notes.map((el: any, index: any) => {
            return (
              <View style={styles.viewNotes} key={index}>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingRight: 8,
                  }}>
                  <AntDesign
                    name={'caretright'}
                    size={20}
                    color={color.tulip}
                  />
                </View>
                <AppText>{el}</AppText>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.btnBooking}>
        <AppButton text={'Đặt vé'} onPress={toggleModalBooking} />
      </View>
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
            {bookingticket()}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DetailTourScreen;
