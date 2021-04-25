import AppText from 'components/AppText';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface ProfileFieldI {
  icon: string;
  data: String | Number;
  textStyle: TextStyle;
  color?: String;
}
const ProfileField = (props: ProfileFieldI) => {
  //! Hook, Reducers

  //! State

  //! Function

  //! UseEffects

  //! Render
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Entypo name={props.icon} size={24} color={props.color} />
      <AppText style={props.textStyle}>{props.data}</AppText>
    </View>
  );
};

export default React.memo(ProfileField);

const styles = StyleSheet.create({});
