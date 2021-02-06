import font from 'helpers/font';
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';

interface AppTextInputProps extends TextInputProps {
  style?: TextStyle;
}

const AppTextInput = (props: AppTextInputProps) => {
  return (
    <TextInput {...props} style={{ ...styles.defaultStyle, ...props.style }}/>
  );
};

export default React.memo(AppTextInput);

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: font.VDBrevia_M,
  },
});
