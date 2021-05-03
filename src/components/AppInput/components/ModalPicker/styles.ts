import {StyleSheet} from 'react-native';
import padding from 'helpers/padding';
import fontSize from 'helpers/fontSize';
import color from 'helpers/color';
import {DEVICE, DIMENSION} from 'helpers/dimentions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: padding.p4,
    paddingLeft: padding.p8,
    borderWidth: 2,
    borderColor: color.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: DIMENSION.BUTTON_HEIGHT,
  },
  text: {
    fontSize: fontSize.f16,
    color: color.primary,
  },
  viewModal: {
    backgroundColor: color.fade,
    flex: 1,
    justifyContent: 'center',
    padding: padding.p20,
  },
  viewContent: {
    backgroundColor: color.white,
    maxHeight: DEVICE.HEIGHT * 0.5,
  },
  btnOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: padding.p12,
    borderBottomWidth: 1,
    borderBottomColor: color.silver,
  },
  viewIcon: {
    height: 20,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.silver,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    color: color.primary,
    textAlignVertical: 'center',
  },
  textValue: {
    fontSize: fontSize.f16,
  },
});
