import color from 'helpers/color';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
interface AppTextProps extends TextProps {
  children?: any;
  style?: TextStyle | any;
}

const AppText = (props: AppTextProps) => {
  //! State

  //! Function

  //! Render
  return (
    <Text {...props} style={[styles.defautlText, props.style]}>
      {props.children}
    </Text>
  );
};

export default React.memo(AppText);

const styles = StyleSheet.create({
  defautlText: {
    color: color.black,
    fontSize: fontSize.f14,
    fontFamily: font.VDBrevia_M,
  },
});
