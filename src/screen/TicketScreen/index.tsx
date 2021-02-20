import AppHeaderBack from 'components/AppHeaderBack';
import React from 'react';
import {FlatList, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import {IMAGE} from 'assets';
import TourItem from 'components/TourItem';
const TicketScreen = () => {
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
      price: 2000000,
      discount: 20,
      bookingDate: now,
      totalNumberTicket: 5,
      totalMoney: 10000000,
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
      bookingDate: now,
      totalNumberTicket: 2,
      totalMoney: 3000000,
    },
  ];

  //! Function
  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          ticketBooked
          avatar={item.avatar}
          name={item.name}
          placeStart={item.placeStart}
          timeStart={item.timeStart}
          travelTime={item.travelTime}
          bookingDate={item.bookingDate}
          totalNumberTicket={item.totalNumberTicket}
          totalMoney={item.totalMoney}
        />
      </View>
    );
  };

  //! Render
  return (
    <>
      <AppHeaderBack title="Vé của bạn" />
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

export default TicketScreen;
