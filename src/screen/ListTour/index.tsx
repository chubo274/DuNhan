import {IMAGE} from 'assets';
import AppText from 'components/AppText';
import TourItem from 'components/TourItem';
import React from 'react';
import {FlatList, View} from 'react-native';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import styles from './styles';
import AppHeaderBack from 'components/AppHeaderBack';
import {useRoute} from '@react-navigation/native';
const ListTour = () => {
  //! State
  const now = moment().format(FORMAT_DATE);
  const data = [
    {
      id: 1,
      avatar: IMAGE.listTourMB,
      name: 'Hà Nội - Hưng Yênnnnnnnnnnnnnnnn',
      placeStart: 'Hà Nội',
      timeStart: now,
      travelTime: '3 ngày đêm 2',
      slots: 10,
      price: 2500000,
      discount: 20,
    },
    {
      id: 2,
      avatar: IMAGE.listTourMN,
      name: 'TP.HCM - Phú Quốc',
      placeStart: 'TP.HCM',
      timeStart: now,
      slots: 7,
      travelTime: '3 ngày đêm 2',
      price: 1500000,
    },
  ];
  const route: any = useRoute();
  const {title, content} = route.params;
  //! Function

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          avatar={item.avatar}
          name={item.name}
          placeStart={item.placeStart}
          timeStart={item.timeStart}
          travelTime={item.travelTime}
          slots={item.slots}
          price={item.price}
          discount={item.discount}
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
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default ListTour;
