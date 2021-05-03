import AppText from 'components/AppText';
import color from 'helpers/color';
import padding from 'helpers/padding';
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AdminTabBar = (props: any) => {
  //! State
  const {navigation, state} = props;
  const {routeNames, index} = state;
  const tab = [
    {name: 'Dashboard', icon: 'dashboard'},
    {name: 'Profile', icon: 'user'},
  ];
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  //! Effect
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  //! Function
  const renderTab = (item: any, idx: any) => {
    const {name, icon} = item;
    const active = index === idx;
    return (
      <TouchableOpacity
        key={name}
        onPress={() => navigation.navigate(routeNames[idx])}
        style={styles.viewTouch}>
        <AntDesign
          name={icon}
          size={28}
          color={active ? color.darkCerulean : color.logan}
        />
        <AppText style={[styles.text, active && {color: color.darkCerulean}]}>
          {name}
        </AppText>
      </TouchableOpacity>
    );
  };

  //! Render
  return isKeyboardVisible ? null : (
    <View style={styles.container}>{tab.map(renderTab)}</View>
  );
};

export default React.memo(AdminTabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: padding.p8,
    backgroundColor: color.blueBg,
  },
  viewTouch: {
    alignItems: 'center',
  },
  text: {
    color: color.logan,
  },
});
