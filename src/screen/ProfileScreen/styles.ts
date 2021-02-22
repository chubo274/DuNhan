import color from 'helpers/color';
import {DEVICE} from 'helpers/dimentions';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    paddingHorizontal: padding.p8,
  },
  viewbtnSave: {
    marginTop: padding.p28,
    marginLeft: DEVICE.WIDTH * 0.7,
  },
  viewbtnLogOut: {
    marginTop: padding.p52,
  },
  field: {
    marginVertical: padding.p12,
  },
});
