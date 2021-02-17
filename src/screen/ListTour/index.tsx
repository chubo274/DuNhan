import {IMAGE} from 'assets';
import AppText from 'components/AppText';
import TourItem from 'components/TourItem';
import React from 'react';
import {FlatList, View} from 'react-native';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import styles from './styles';
import AppHeaderBack from 'components/AppHeaderBack';
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
      price: 2500000,
    },
    {
      id: 2,
      avatar: IMAGE.listTourMN,
      name: 'TP.HCM - Phú Quốc',
      placeStart: 'TP.HCM',
      timeStart: now,
      travelTime: '3 ngày đêm 2',
      price: 1500000,
    },
  ];
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
          price={item.price}
        />
      </View>
    );
  };
  //! Render
  return (
    <View style={styles.container}>
      <AppHeaderBack title="List result" content="ddd" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ListTour;
