import color from 'helpers/color';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
  viewInput: {
    padding: padding.p12,
  },
  btnLogin: {
    marginVertical:padding.p12,
    marginHorizontal: padding.p36,
  },
});
