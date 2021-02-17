import AppText from 'components/AppText';
import color from 'helpers/color';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {ACTUAL_DATE} from 'helpers/constants';
import {converNumberToPrice} from 'helpers/function';

interface TourItemI {
  avatar?: any;
  name?: string;
  placeStart?: any;
  timeStart?: any;
  travelTime?: string;
  price?: number;
  slots?: number;
}
const TourItem = ({
  avatar = '',
  name = '',
  placeStart = '',
  timeStart = '',
  travelTime = '',
  price = 0,
  slots = 0,
}: TourItemI) => {
  //! State

  //! Function

  //! Render
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={avatar} style={styles.avt} resizeMode="cover" />
      <View style={styles.content}>
        <AppText numberOfLines={1} style={styles.text}>
          {name}
        </AppText>
        <AppText numberOfLines={1} style={styles.text}>
          Khởi hành: {placeStart}, {moment(timeStart).format(ACTUAL_DATE)}
        </AppText>

        <AppText numberOfLines={1} style={styles.text}>
          {travelTime}
        </AppText>
        <AppText numberOfLines={1} style={styles.text}>
          còn {slots} chỗ
        </AppText>
        <AppText numberOfLines={1} style={styles.text}>
          {converNumberToPrice(price)}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TourItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 125,
    backgroundColor: color.peachOrange,
    borderRadius: 25,
  },
  avt: {
    width: 125,
    aspectRatio: 1,
    borderRadius: 25,
  },
  content: {
    flex: 1,
    paddingLeft: padding.p6,
  },
  text: {
    paddingBottom: padding.p4,
  },
});
