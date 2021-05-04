import color from 'helpers/color';
import {DEVICE, DIMENSION} from 'helpers/dimentions';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerTren: {
    height: (DEVICE.HEIGHT * 1) / 3.5,
    backgroundColor: color.blueBg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  txtTitle: {
    fontSize: fontSize.f22,
    color: color.primary,
    fontFamily: font.VDBrevia_Sb,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: color.white,
    paddingHorizontal: padding.p8,
  },
  viewbtnSave: {
    marginTop: padding.p16,
    marginLeft: DEVICE.WIDTH * 0.7,
  },
  viewbtnLogOut: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: (DEVICE.HEIGHT * 2.5) / 3.5 - 120,
    justifyContent: 'center',
  },
  field: {
    marginVertical: padding.p8,
  },
  touchNap: {
    position: 'absolute',
    right: 0,
    top: (DEVICE.HEIGHT * 1) / 3.5 - 30,
    backgroundColor: color.bgPri,
    zIndex: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 60,
    width: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 21,
  },
  viewModal: {
    backgroundColor: color.fade,
    flex: 1,
    justifyContent: 'center',
    // paddingHorizontal: padding.p20,
  },
  viewContent: {
    backgroundColor: color.white,
    borderRadius: 8,
  },
  textPhone: {
    fontSize: fontSize.f25,
    paddingLeft: padding.p12,
    color: color.black,
  },
  textPhoneWhite: {
    fontSize: fontSize.f25,
    paddingLeft: padding.p12,
    color: color.white,
  },
  textBankNumber: {
    fontSize: fontSize.f25,
    paddingLeft: padding.p12,
    fontStyle: 'italic',
    color: color.black,
  },
  textBankNumberWhite: {
    fontSize: fontSize.f25,
    paddingLeft: padding.p12,
    fontStyle: 'italic',
    color: color.white,
  },
  viewVisa: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingLeft: 23,
    paddingBottom: 10,
  },
  viewBtnWallet: {
    paddingTop: 20,
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  inputMoney: {
    fontFamily: font.VDBrevia_M,
    fontSize: fontSize.f25,
    paddingLeft: padding.p12,
    fontStyle: 'italic',
    color: 'yellow',
    paddingBottom: 2,
    width: 230,
  },
});
