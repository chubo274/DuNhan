import {DEVICE} from 'helpers/dimentions';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: DEVICE.HEIGHT,
    padding: padding.p20,
    backgroundColor: '#FFFFFF',
  },
  btnLogin: {
    marginVertical: padding.p12,
    marginHorizontal: padding.p36,
  },
});
