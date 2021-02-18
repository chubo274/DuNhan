import color from 'helpers/color';
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
  fieldRoutePlace: {
    flexDirection: 'row',
  },
});
