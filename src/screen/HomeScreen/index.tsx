import {useIsFocused, useNavigation} from '@react-navigation/core';
import {IMAGE} from 'assets';
import AppHeaderBack from 'components/AppHeaderBack';
import AppText from 'components/AppText';
import TourItem from 'components/TourItem';
import React, {useEffect} from 'react';
import {
  FlatList,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tourActions from 'redux/actions/tourActions';
import {RootState} from 'redux/reducers';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import ListTour from './components/ListTour';
import styles from './styles';
import color from 'helpers/color';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //! State
  const isFocused = useIsFocused();
  const listToursData = useSelector(
    (state: RootState) => state.tourReducer.data,
  );

  //! Function
  const renderTourManyDiscount = ({item, index}: any) => {
    return (
      <View style={styles.viewList}>
        <TourItem
          avatar={item.avatar}
          name={item.name}
          placeStart={item.place_start}
          timeStart={item.time_start}
          // travelTime={item.travel_time}
          travelTimeDay={item.travel_time.day}
          travelTimeNight={item.travel_time.night}
          slots={item.slots}
          price={item.price}
          discount={item.discount}
          onPress={() => {
            navigation.navigate('DetailTourScreen', {data: item});
          }}
        />
      </View>
    );
  };

  const onMesseger = async () => {
    await Linking.openURL(
      'https://www.facebook.com/messages/t/100005045582743',
    );
  };
  const onMessage = async () => {
    const phoneNumber = '0376686722';
    const message = 'Tôi cần hỗ trợ!';
    const separator = Platform.OS === 'ios' ? '&' : '?';
    await Linking.openURL(`sms:${phoneNumber}${separator}body=${message}`);
  };
  const onCallOut = async () => {
    const phoneNumber = '0376686722';
    await Linking.openURL(`tel:${phoneNumber}`);
  };
  //! Effect
  // useEffect(() => {
  //   dispatch(tourActions.getListTours());
  // }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack title="Trang chủ" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewGroup}>
            <AppText style={styles.textGroup}>Tour hot trong tuần</AppText>
            <View style={styles.viewListTour}>
              <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={listToursData}
                renderItem={renderTourManyDiscount}
                horizontal={true}
                scrollEnabled={true}
              />
            </View>
          </View>

          <View style={styles.viewGroup}>
            <AppText style={styles.textGroup}>Tour khuyến mại nhiều</AppText>
            <View style={styles.viewListTour}>
              <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={listToursData}
                renderItem={renderTourManyDiscount}
                horizontal={true}
                scrollEnabled={true}
              />
            </View>
          </View>

          <View style={styles.viewGroup}>
            <AppText style={styles.textGroup}>List tour theo khu vực</AppText>
            <View style={styles.viewListTour}>
              <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={listToursData}
                renderItem={renderTourManyDiscount}
                horizontal={true}
                scrollEnabled={true}
              />
              {/* <ListTour area="Tour Miền Bắc" source={IMAGE.listTourMB} />
              <ListTour area="Tour Miền Trung" source={IMAGE.listTourMT} />
              <ListTour area="Tour Miền Nam" source={IMAGE.listTourMN} /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewBtnTool}>
        <TouchableOpacity onPress={onMesseger}>
          <Fontisto name={'messenger'} size={40} color={color.facebook} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMessage}>
          <Fontisto name={'hipchat'} size={40} color={color.textPri} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onCallOut}>
          <Feather name={'phone-call'} size={40} color={color.geraldine} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;
