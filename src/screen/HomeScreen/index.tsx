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
import moment from 'moment';
import tourActions from 'redux/actions/tourActions';
import {RootState} from 'redux/reducers';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import ListTour from './components/ListTour';
import _ from 'lodash';
import styles from './styles';
import color from 'helpers/color';
import {FORMAT_DATE} from 'helpers/constants';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //! State
  const isFocused = useIsFocused();
  const listToursData = useSelector(
    (state: RootState) => state.tourReducer.data,
  );
  const listSuggest = useSelector(
    (state: RootState) => state.tourReducer.listSuggest,
  );
  const listSale = useSelector(
    (state: RootState) => state.tourReducer.listSale,
  );

  //! Function
  const renderTourManyDiscount = ({item, index}: any) => {
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
  useEffect(() => {
    if (isFocused) dispatch(tourActions.getListTours());
  }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack title="Trang chủ" />
      <View style={styles.container}>
        <View style={styles.viewGroup}>
          <AppText style={styles.textGroup}>Tour đề xuất cho bạn</AppText>
          <View style={styles.viewListTour}>
            {_.isEmpty(listSuggest) ? (
              <View style={styles.viewNonData}>
                <AppText>Không có đề xuất nào</AppText>
              </View>
            ) : (
              <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={listSuggest}
                renderItem={renderTourManyDiscount}
                horizontal={true}
                scrollEnabled={true}
              />
            )}
          </View>
        </View>

        <View style={styles.viewGroup}>
          <AppText style={styles.textGroup}>Tour siêu khuyến mại</AppText>
          <View style={styles.viewListTour}>
            {_.isEmpty(listSale) ? (
              <View style={styles.viewNonData}>
                <AppText>Chưa có siêu sale để săn</AppText>
              </View>
            ) : (
              <FlatList
                keyExtractor={(item) => item._id.toString()}
                data={listSale}
                renderItem={renderTourManyDiscount}
                horizontal={true}
                scrollEnabled={true}
              />
            )}
          </View>
        </View>
      </View>
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
