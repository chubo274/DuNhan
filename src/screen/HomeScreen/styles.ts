import color from 'helpers/color';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: color.white},
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
  viewListTour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
