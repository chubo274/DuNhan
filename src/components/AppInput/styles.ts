import color from 'helpers/color';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textInput: {
    padding: 0,
    fontSize: fontSize.f16,
    flex: 1,
  },
  textView: {
    fontSize: fontSize.f16,
  },
  container: {
    height: 50,
  },
  textTitle: {
    fontFamily: font.VDBrevia_Sb,
    fontSize: fontSize.f16,
    color: color.black,
    marginBottom: padding.p4,
    paddingLeft: padding.p4,
  },
  viewFieldInput: {
    flex: 1,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white,
    flexDirection: 'row',
  },
  viewIcon: {
    width: 48,
    aspectRatio: 1,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    backgroundColor: color.blueBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 35,
  },
  iconTouchModal: {
    height: 10,
  },
  viewTouchModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    flex: 1,
    paddingHorizontal: padding.p8,
  },
  viewInput: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: padding.p8,
    flexDirection: 'row',
  },
  viewIconModal: {
    alignSelf: 'flex-end',
    width: 30,
    height: 50,
    justifyContent: 'center',
  },
  touchToggleHidePass: {
    justifyContent: 'center',
    paddingHorizontal: padding.p8,
  },
});
