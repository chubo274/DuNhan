import AppText from 'components/AppText';
import color from 'helpers/color';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {ACTUAL_DATE} from 'helpers/constants';
import {converNumberToPrice} from 'helpers/function';

interface TourItemI {
  avatar: any;
  name: string;
  placeStart: any;
  timeStart: any;
  travelTime?: string;
  travelTimeDay?: number;
  travelTimeNight?: number;
  price?: number;
  discount?: number;
  slots?: number;
  // booked
  bookingDate?: any;
  totalTicket?: number;
  totalMoney?: number;
  ticketBooked?: boolean;
  onPress?: () => void;
}
const TourItem = ({
  avatar = '',
  name = '',
  placeStart = '',
  timeStart = '',
  travelTime = '',
  travelTimeDay = 0,
  travelTimeNight = 0,
  price = 0,
  discount = 0,
  slots = 0,
  bookingDate = '',
  totalTicket = 0,
  totalMoney = 0,
  ticketBooked = false,
  onPress,
}: TourItemI) => {
  //! State

  //! Function

  //! Render
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage source={{uri: avatar}} style={styles.avt} resizeMode="cover" />
      <View style={styles.content}>
        <AppText numberOfLines={1} style={styles.text}>
          {name}
        </AppText>
        <AppText numberOfLines={1} style={styles.text}>
          Khởi hành: {placeStart}, {moment(timeStart).format(ACTUAL_DATE)}
        </AppText>
        <AppText numberOfLines={1} style={styles.text}>
          {travelTimeDay} Ngày {travelTimeNight} đêm
        </AppText>

        {!ticketBooked && (
          <>
            <AppText numberOfLines={1} style={styles.text}>
              còn {slots} chỗ
            </AppText>
            <View style={{flexDirection: 'row'}}>
              {!!discount && (
                <AppText numberOfLines={1} style={styles.textStrike}>
                  {converNumberToPrice(price)}
                </AppText>
              )}
              <AppText numberOfLines={1} style={styles.text}>
                {converNumberToPrice(price * ((100 - discount) / 100))}
              </AppText>
            </View>
          </>
        )}

        {ticketBooked && (
          <>
            <AppText numberOfLines={1} style={styles.text}>
              Ngày đặt: {bookingDate}
            </AppText>
            <AppText numberOfLines={1} style={styles.text}>
              Đã đặt {totalTicket} vé với {converNumberToPrice(totalMoney)}
            </AppText>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TourItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 125,
    backgroundColor: color.bgPri,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avt: {
    width: 125,
    aspectRatio: 1,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    paddingHorizontal: padding.p8,
  },
  text: {
    paddingBottom: padding.p4,
  },
  textStrike: {
    paddingRight: padding.p12,
    textDecorationLine: 'line-through',
  },
});
