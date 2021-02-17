import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
const SearchScreen = () => {
  //! State
  const navigation = useNavigation();

  //! Function
  const onPress = () => {
    navigation.navigate('ListTour');
  };

  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title="Tìm kiếm" />
      <AppButton text="Tìm" onPress={onPress} />
    </View>
  );
};

export default SearchScreen;
