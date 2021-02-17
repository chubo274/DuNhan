import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
const ProfileScreen = () => {
  //! State

  //! Function

  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title="Thông tin cá nhân" />
      <AppText>ProfileScreen</AppText>
    </View>
  );
};

export default ProfileScreen;
