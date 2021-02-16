import {IMAGE} from 'assets';
import AppText from 'components/AppText';
import TourItem from 'components/TourItem';
import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import styles from './styles';
const ListTour = () => {
  //! State
  const now = moment().format(FORMAT_DATE);

  //! Function

  //! Render
  return (
    <View style={styles.container}>
      <AppText>List Tour</AppText>
      <View>
        <TourItem
          avatar={IMAGE.listTourMB}
          name="Hà Nội - Hưng Yên"
          placeStart={'Hà Nội'}
          timeStart={now}
          travelTime={'3 ngày 2 đêm'}
          price={15500000}
        />
      </View>
      <TourItem
        avatar={IMAGE.listTourMB}
        name="Hà Nội - Hưng Yên"
        placeStart={'Hà Nội'}
        timeStart={now}
        travelTime={'3 ngày 2 đêm'}
        price={15500000}
      />
    </View>
  );
};

export default ListTour;
