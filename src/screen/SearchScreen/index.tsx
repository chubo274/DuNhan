import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
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
    <>
      <AppHeaderBack title="Tìm kiếm" />
      <View style={styles.container}>
        <AppButton text="Tìm" onPress={onPress} />
      </View>
    </>
  );
};

export default SearchScreen;
