import AppText from 'components/AppText';
import padding from 'helpers/padding';
import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import color from 'helpers/color';
interface UserCardI {
  id: String;
  name: String;
  phone: String;
  onPress: () => void;
}
const UserCard = (props: UserCardI) => {
  //! Hook, Reducers

  //! State

  //! Function
  const onMessage = async () => {
    Linking.openURL(`sms:${props.phone}`);
  };
  const onCallOut = async () => {
    await Linking.openURL(`tel:${props.phone}`);
  };

  //! UseEffects

  //! Render
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={props.onPress}>
        <View style={{flex: 8}}>
          <View style={styles.viewRow}>
            <AppText style={{flex: 4}} numberOfLines={1}>
              Khách hàng:{' '}
            </AppText>
            <AppText style={{flex: 6}} numberOfLines={1}>
              {props.name}{' '}
            </AppText>
          </View>
          <View style={styles.viewRow}>
            <AppText style={{flex: 4}} numberOfLines={1}>
              Di động:{' '}
            </AppText>
            <AppText style={{flex: 6}} numberOfLines={1}>
              {props.phone}{' '}
            </AppText>
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={onMessage}
            style={{marginBottom: padding.p8}}>
            <Fontisto name={'hipchat'} size={25} color={color.textPri} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onCallOut}>
            <Feather name={'phone-call'} size={25} color={color.porsche} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(UserCard);

const styles = StyleSheet.create({
  container: {
    marginVertical: padding.p8,
    padding: padding.p8,
    borderRadius: 4,
    borderWidth: 1,
    borderTopColor: '#18acbb',
    borderRightColor: '#4abb0b',
    borderBottomColor: '#4abb0b',
    borderLeftColor: '#18acbb',
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewRow: {
    flex: 2,
    flexDirection: 'row',
    marginBottom: padding.p8,
  },
});
