import color from 'helpers/color';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface AppButtonCircleI {
  name?:
    | 'pluscircleo'
    | 'minuscircleo'
    | 'checkcircleo'
    | 'closecircleo'
    | 'questioncircleo';
  disabled?: boolean;
  onPress?: () => void;
}
const AppButtonCircle = ({
  name = 'checkcircleo',
  disabled = false,
  onPress,
}: AppButtonCircleI) => {
  //! State

  //! Function

  //! Render
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <AntDesign
        name={name}
        size={40}
        style={[styles.icon, disabled && {color: color.fade}]}
      />
    </TouchableOpacity>
  );
};

export default React.memo(AppButtonCircle);

const styles = StyleSheet.create({
  icon: {
    color: color.primary,
  },
});
