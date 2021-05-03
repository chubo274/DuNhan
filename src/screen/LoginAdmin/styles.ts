import {DEVICE} from 'helpers/dimentions';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imgBg: {flex: 1, opacity: 0.8},
  container: {
    flex: 1,
    height: DEVICE.HEIGHT,
    padding: padding.p20,
    backgroundColor: '#FFFFFF',
  },
  textWel: {
    fontSize: fontSize.f22,
    marginTop: padding.p40,
    marginBottom: padding.p12,
  },
  textWel2: {marginTop: padding.p12, marginBottom: padding.p52},
  btnLogin: {
    marginHorizontal: padding.p36,
  },
  viewForgotPass: {
    marginTop: padding.p12,
    marginBottom: padding.p44,
    padding: padding.p4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewSignup: {
    marginTop: padding.p12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  touch: {
    padding: padding.p6,
  },
});
