import color from 'helpers/color';
import padding from 'helpers/padding';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface TabBarI {}
const TabBar = (props: any) => {
  //! State
  const {navigation, state} = props;
  const {routeNames, index} = state;
  const tab = [
    {name: 'HomeScreen', icon: 'home'},
    {name: 'SearchScreen', icon: 'search1'},
    {name: 'TicketScreen', icon: 'tago'},
    {name: 'ProfileScreen', icon: 'user'},
  ];

  //! Function
  const renderTab = (item: any, idx: any) => {
    const {name, icon} = item;
    const active = index === idx;
    return (
      <TouchableOpacity
        key={name}
        onPress={() => {
          navigation.navigate(routeNames[idx]);
        }}>
        <AntDesign
          name={icon}
          size={28}
          color={active ? color.darkCerulean : color.logan}
        />
      </TouchableOpacity>
    );
  };

  //! Render
  return <View style={styles.container}>{tab.map(renderTab)}</View>;
};

export default React.memo(TabBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: padding.p8,
    backgroundColor: color.blueBg,
  },
});
