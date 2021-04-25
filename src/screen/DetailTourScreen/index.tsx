import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {IMAGE} from 'assets';
import {FORMAT_DATE, HIT_SLOP} from 'helpers/constants';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppSilder from 'components/AppSilder';
import AppButton from 'components/AppButton';
import {useRoute} from '@react-navigation/core';
import color from 'helpers/color';
import {converNumberToPrice} from 'helpers/function';
import PayField from './components/PayField';
const DetailTourScreen = () => {
  //! State
  //TODO booking
  const [showModalBooking, setShowModalBooking] = useState(false);
  const [ticket, setTicket] = useState(1);
  const [checked, setChecked] = useState(false);
  const [disabledMinus, setDisabledMinus] = useState(true);
  const [disabledPlus, setDisabledPlus] = useState(false);
  //TODO Pay
  const [showModalPay, setShowModalPay] = useState(false);
  const now = moment().format(FORMAT_DATE);
  //TODO getDataDetail
  const route = useRoute();
  // const dataTour=route.params;
  const data = {
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
    // list_image: [IMAGE.listTourMB, IMAGE.listTourMT, IMAGE.listTourMN],
    // list_image: [
    //   {
    //     url:
    //       'https://ejoy-english.com/blog/wp-content/uploads/2018/05/tie%CC%82%CC%81ng-anh-u%CC%81c-.jpg',
    //   },
    //   {url: 'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg'},
    //   {url: 'https://trangvisa.com/wp-content/uploads/2019/07/65.png'},
    // ],
    list_image: [
      'https://ejoy-english.com/blog/wp-content/uploads/2018/05/tie%CC%82%CC%81ng-anh-u%CC%81c-.jpg',
      'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg',
      'https://trangvisa.com/wp-content/uploads/2019/07/65.png',
    ],
  };

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
  };

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
      // toggleModalBooking();
    };

    const onPay = () => {
      toggleModalPay();
      toggleModalBooking();
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
              <PayField title={'Khởi hành: '} data={data.timeStart} />
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
              <View style={styles.viewBtnPay}>
                <AppButton text="Thanh toán" onPress={onPay} />
                <AppButton text="Quay lại" onPress={toggleModalPay} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };
  //! Render
  return (
    <>
      <AppHeaderBack title="Chi Tiết Tour" headerBack />
      <AppSilder data={data.list_image} />
      <View style={styles.container}>
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
