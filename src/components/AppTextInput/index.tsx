import AppText from 'components/AppText';
import font from 'helpers/font';
import React from 'react';
import {StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';
import _ from 'lodash';

interface AppTextInputProps extends TextInputProps {
  style?: TextStyle;
}

const AppTextInput = (props: AppTextInputProps) => {
  return !props.editable && !_.isEmpty(props.value) ? (
    <AppText {...props} style={{...styles.disableStyle, ...props.style}}>
      {props.value}
    </AppText>
  ) : (
    <TextInput {...props} style={{...styles.defaultStyle, ...props.style}} />
  );
};

export default React.memo(AppTextInput);

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: font.VDBrevia_M,
  },
  disableStyle: {
    fontFamily: font.VDBrevia_M,
    opacity: 0.6,
  },
});
