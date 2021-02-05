import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import color from '../../helpers/color';
import fontSize from '../../helpers/fontSize';
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
  btn: {backgroundColor: color.primary},
  text: {fontSize: fontSize.f18, textAlign: 'center'},
});
