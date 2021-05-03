import AppText from 'components/AppText';
import padding from 'helpers/padding';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View} from 'react-native';
import color from 'helpers/color';

interface FieldRuleI {
  title: String;
  data: any;
  active?: boolean;
}
const FieldRule = (props: FieldRuleI) => {
  //! Hook, Reducers

  //! State

  //! Function

  //! UseEffects

  //! Render
  return (
    <View style={styles.container}>
      <View style={{flex: 8}}>
        <AppText style={{fontStyle: 'italic'}}>{props.title} </AppText>
      </View>
      <View
        style={[
          styles.data,
          props.active && {justifyContent: 'space-between'},
        ]}>
        {props.active && (
          <AntDesign
            name={'caretright'}
            style={{alignSelf: 'center'}}
            color={color.tulip}
            size={12}
          />
        )}
        <AppText>{props.data} </AppText>
      </View>
    </View>
  );
};

export default React.memo(FieldRule);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: padding.p2,
    justifyContent: 'space-between',
  },
  data: {
    flex: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
