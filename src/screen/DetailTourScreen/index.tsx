import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {IMAGE} from 'assets';
import {FORMAT_DATE} from 'helpers/constants';
import moment from 'moment';
import AppSilder from 'components/AppSilder';
const DetailTourScreen = () => {
  //! State
  const now = moment().format(FORMAT_DATE);
  const data = {
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
    totalTicket: 5,
    totalMoney: 10000000,
    // list_image: [IMAGE.listTourMB, IMAGE.listTourMT, IMAGE.listTourMN],
    // list_image: [
    //   {
    //     url:
    //       'https://ejoy-english.com/blog/wp-content/uploads/2018/05/tie%CC%82%CC%81ng-anh-u%CC%81c-.jpg',
    //   },
    //   {url: 'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg'},
    //   {url: 'https://trangvisa.com/wp-content/uploads/2019/07/65.png'},
    // ],
    list_image: [
      'https://ejoy-english.com/blog/wp-content/uploads/2018/05/tie%CC%82%CC%81ng-anh-u%CC%81c-.jpg',
      'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg',
      'https://trangvisa.com/wp-content/uploads/2019/07/65.png',
    ],
  };
  //! Function

  //! Render
  return (
    <>
      <AppHeaderBack title="Chi Tiết Tour" headerBack />
      <AppSilder data={data.list_image} />
      <View style={styles.container}></View>
    </>
  );
};

export default DetailTourScreen;
