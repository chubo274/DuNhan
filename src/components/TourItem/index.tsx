import AppText from 'components/AppText';
import color from 'helpers/color';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {ACTUAL_DATE} from 'helpers/constants';
import {converPriceToString} from 'helpers/function';

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
      <FastImage source={avatar} style={styles.avt} />
      <View style={styles.content}>
        <AppText style={styles.text}>{name}</AppText>
        <View style={{flexDirection: 'row'}}>
          <AppText style={styles.text}>Khởi hành: {placeStart}, </AppText>
          <AppText style={styles.text}>
            {moment(timeStart).format(ACTUAL_DATE)}
          </AppText>
        </View>
        <AppText style={styles.text}>{travelTime}</AppText>
        <AppText style={styles.text}>còn {slots} chỗ</AppText>
        <AppText style={styles.text}>{converPriceToString(price)} đ</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TourItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.champagnePink,
    flexDirection: 'row',
    height: 125,
    paddingHorizontal: padding.p6,
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
