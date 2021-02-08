import {IMAGE} from 'assets';
import AppText from 'components/AppText';
import React from 'react';
import {View} from 'react-native';
import ListTour from './components/ListTour';
import styles from './styles';
const HomeScreen = () => {
  //! State

  //! Function

  //! Render
  return (
    <View style={styles.container}>
      <View style={styles.viewGroup}>
        <AppText style={styles.textGroup}>Tour hot trong tuần</AppText>
        <View style={styles.viewListTour}>
          <ListTour area="Tour Miền Bắc" source={IMAGE.listTourMB} />
          <ListTour area="Tour Miền Trung" source={IMAGE.listTourMT} />
          <ListTour area="Tour Miền Nam" source={IMAGE.listTourMN} />
        </View>
      </View>

      <View style={styles.viewGroup}>
        <AppText style={styles.textGroup}>Tour khuyến mại nhiều</AppText>
        <View style={styles.viewListTour}>
          <ListTour area="Tour Miền Bắc" source={IMAGE.listTourMB} />
          <ListTour area="Tour Miền Trung" source={IMAGE.listTourMT} />
          <ListTour area="Tour Miền Nam" source={IMAGE.listTourMN} />
        </View>
      </View>

      <View style={styles.viewGroup}>
        <AppText style={styles.textGroup}>List tour theo khu vực</AppText>
        <View style={styles.viewListTour}>
          <ListTour area="Tour Miền Bắc" source={IMAGE.listTourMB} />
          <ListTour area="Tour Miền Trung" source={IMAGE.listTourMT} />
          <ListTour area="Tour Miền Nam" source={IMAGE.listTourMN} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
