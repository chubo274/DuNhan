import color from 'helpers/color';
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
  viewList: {
    marginVertical: padding.p8,
  },
  viewModal: {
    backgroundColor: color.fade,
    flex: 1,
    justifyContent: 'center',
    padding: padding.p20,
  },
  viewContent: {
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: '#969abd',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    padding: padding.p20,
  },
  viewRule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: padding.p12,
    paddingHorizontal: padding.p8,
  },
  checkBox: {
    borderColor: color.black,
    borderRadius: 4,
    borderWidth: 1,
    height: 24,
    aspectRatio: 1,
  },
  textRule: {marginHorizontal: padding.p12},
});
