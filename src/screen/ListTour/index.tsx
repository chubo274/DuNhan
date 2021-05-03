import {IMAGE} from 'assets';
import AppText from 'components/AppText';
import TourItem from 'components/TourItem';
import React from 'react';
import {FlatList, View} from 'react-native';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import styles from './styles';
import AppHeaderBack from 'components/AppHeaderBack';
import {useNavigation, useRoute} from '@react-navigation/native';
const ListTour = () => {
  //! State
  const navigation = useNavigation();
  const route: any = useRoute();
  const {title, listTour} = route.params;

  //! Function

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          avatar={item.avatar}
          name={item.name}
          placeStart={item.place_start}
          timeStart={moment(item.time_start).format(FORMAT_DATE)}
          // travelTime={item.travel_time}
          travelTimeDay={item.travel_time.day}
          travelTimeNight={item.travel_time.night}
          slots={item.slots}
          price={item.price}
          discount={item.discount}
          onPress={() => {
            navigation.navigate('DetailTourScreen', {id: item._id});
          }}
        />
      </View>
    );
  };
  //! Render
  return (
    <>
      <AppHeaderBack title={title} headerBack />
      <View style={styles.container}>
        <FlatList
          data={listTour}
          keyExtractor={(item) =>
            !!item.id ? item.id.toString() : item._id.toString()
          }
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default ListTour;
