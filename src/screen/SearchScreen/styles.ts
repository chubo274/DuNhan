import color from 'helpers/color';
import {DEVICE} from 'helpers/dimentions';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding.p8,
    backgroundColor: color.white,
  },
  field: {
    paddingTop: padding.p12,
    paddingBottom: padding.p6,
  },
  fieldFlexRow: {
    paddingTop: padding.p12,
    paddingBottom: padding.p6,
    flexDirection: 'row',
  },
  fieldPlace: {
    paddingBottom: padding.p6,
  },
  viewPlace: {
    justifyContent: 'center',
    marginHorizontal: padding.p4,
  },
  textPlace: {
    fontSize: fontSize.f16,
    fontFamily: font.VDBrevia_Sb,
  },
  viewbtnLogOut: {
    paddingLeft: padding.p12,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
});
