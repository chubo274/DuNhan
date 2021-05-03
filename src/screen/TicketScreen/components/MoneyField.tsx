import AppText from 'components/AppText';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface MoneyFieldI {
  title: String;
  data: any;
}
const MoneyField = (props: MoneyFieldI) => {
  //! Hook, Reducers

  //! State

  //! Function

  //! UseEffects

  //! Render
  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <AppText style={{fontStyle: 'italic'}}>{props.title} </AppText>
      </View>
      <View style={{flex: 6, alignItems: 'flex-end'}}>
        <AppText>{props.data} </AppText>
      </View>
    </View>
  );
};

export default React.memo(MoneyField);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: padding.p2,
  },
});
