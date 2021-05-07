import color from 'helpers/color';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
  viewNonData: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewGroup: {
    marginHorizontal: padding.p8,
    paddingBottom: padding.p12,
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
  },
  textGroup: {
    fontSize: fontSize.f18,
    color: color.textPri,
    paddingTop: padding.p12,
    paddingBottom: padding.p6,
  },
  viewList: {
    flex: 1,
    marginVertical: padding.p8,
    marginRight: padding.p12,
  },
  viewListTour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewBtnTool: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 160,
    justifyContent: 'space-around',
  },
});
