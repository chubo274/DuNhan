import color from 'helpers/color';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewBg: {
    flex: 1,
    backgroundColor: color.white,
  },
  container: {flex: 1, backgroundColor: color.white},
  viewInput: {
    padding: padding.p12,
  },
  btnLogin: {
    marginTop: padding.p52,
    marginHorizontal: padding.p36,
    marginBottom: padding.p20,
  },
});
