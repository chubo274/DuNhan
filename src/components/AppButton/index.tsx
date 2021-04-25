import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import color from '../../helpers/color';
import fontSize from '../../helpers/fontSize';
import padding from '../../helpers/padding';
import AppText from '../AppText';
interface AppButtonI {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}
const AppButton = ({text, onPress, disabled = false, style}: AppButtonI) => {
  //! State

  //! Function

  //! Render
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, style, disabled && {backgroundColor: color.silver}]}>
      <AppText style={[styles.text, disabled && {color: color.doveGray}]}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default React.memo(AppButton);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: padding.p6,
    paddingHorizontal: padding.p16,
    backgroundColor: color.primary,
    borderRadius: padding.p16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {fontSize: fontSize.f18, textAlign: 'center'},
});
