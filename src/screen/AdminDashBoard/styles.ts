import color from 'helpers/color';
import {DEVICE} from 'helpers/dimentions';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white, padding: padding.p12},
  viewDateFilter: {
    flexDirection: 'row',
  },
  viewbtnFilter: {
    position: 'absolute',
    left: 10,
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  viewModal: {
    backgroundColor: color.fade,
    flex: 1,
    justifyContent: 'center',
    padding: padding.p12,
    borderRadius: padding.p8,
  },
  viewContent: {
    backgroundColor: color.white,
    maxHeight: DEVICE.HEIGHT * 0.5,
  },
  viewContentModal: {padding: padding.p12},
  viewBtnOk: {
    paddingVertical: padding.p12,
  },
  viewbtnType: {
    alignItems: 'center',
    paddingVertical: padding.p12,
  },
  viewTotal: {
    margin: padding.p16,
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: color.champagnePink,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 10,
    padding: padding.p8,
  },
  textdate: {
    fontSize: fontSize.f16,
    fontFamily: font.VDBrevia_M,
    color: color.primary,
  },
  textTotal: {
    fontSize: fontSize.f20,
    fontFamily: font.VDBrevia_Sb,
    color: color.primary,
  },
  notification: {
    marginVertical: padding.p28,
    marginHorizontal: padding.p16,
  },
  textNotification: {
    fontSize: fontSize.f16,
    fontFamily: font.VDBrevia_Sb,
    color: color.tulip,
    textAlign: 'center',
  },
});
