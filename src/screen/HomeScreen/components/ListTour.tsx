import AppText from 'components/AppText';
import {DEVICE} from 'helpers/dimentions';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ListTourI {
  area: 'Tour Miền Bắc' | 'Tour Miền Trung' | 'Tour Miền Nam';
  source?: any;
}
const ListTour = ({area, source}: ListTourI) => {
  //! State

  //! Function

  //! Render
  return (
    <TouchableOpacity style={styles.container}>
      <FastImage source={source} style={styles.avt} resizeMode="contain" />
      <AppText>{area}</AppText>
    </TouchableOpacity>
  );
};

export default React.memo(ListTour);

const styles = StyleSheet.create({
  container: {width: DEVICE.WIDTH * 0.32, alignItems: 'center'},
  avt: {
    width: DEVICE.WIDTH * 0.3,
    aspectRatio: 1 / 0.7,
    borderRadius: DEVICE.WIDTH * 0.05,
  },
});
