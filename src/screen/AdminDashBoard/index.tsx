import {useIsFocused} from '@react-navigation/native';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Modal, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import tourActions from 'redux/actions/tourActions';
import {RootState} from 'redux/reducers';
import styles from './styles';
import AppButton from 'components/AppButton';
import {FORMAT_DATE} from 'helpers/constants';
import AppBarChart from 'components/AppBarChart';
import YearPicker from './components/YearPicker';
import {converNumberToPrice} from 'helpers/function';
const AdminDashBoard = () => {
  //! Hook, Reducers
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //! State
  const [start_date, setstart_date] = useState(
    moment().subtract(7, 'days').toDate(),
  );
  const [end_date, setend_date] = useState(moment().toDate());
  const [showModal, setShowModal] = useState(false);
  const [filterByDay, setFilterByDay] = useState(true);
  const [detailDataMoney, setDetailDataMoney] = useState();
  const [detailDataDay, setDetailDataDay] = useState();

  //! Function
  const onChangestart_date = (date: any) => {
    setstart_date(date);
  };

  const onChangesend_date = (date: any) => {
    setend_date(date);
  };
  const onChangeDetailData = (day: any, value: any) => {
    console.log({day}, {value});

    setDetailDataMoney(value);
    setDetailDataDay(day);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleFilterByDay = () => {
    setFilterByDay(!filterByDay);
  };

  const onFilter = () => {
    toggleModal();
  };

  const onApply = () => {
    toggleModal();
    dispatch(tourActions.listBookingAllTours());
  };

  //! UseEffects
  useEffect(() => {
    if (isFocused) dispatch(tourActions.listBookingAllTours());
  }, [isFocused]);
  //! Render
  return (
    <>
      <AppHeaderBack title={'Thống kê'} />
      <View style={styles.container}>
        <AppBarChart
          startDate={start_date}
          endDate={end_date}
          onSelectChart={onChangeDetailData}
        />
        {!!detailDataDay ? (
          <View style={styles.viewTotal}>
            <AppText style={styles.textdate}>{detailDataDay ?? ''}</AppText>
            <AppText style={styles.textTotal}>
              "Tổng": {converNumberToPrice(detailDataMoney ?? 0)}
            </AppText>
          </View>
        ) : (
          <View style={styles.notification}>
            <AppText style={styles.textNotification}>
              Chọn một cột để xem chi tiết hơn!
            </AppText>
          </View>
        )}
        <View style={styles.viewbtnFilter}>
          <AppButton text="Lọc" onPress={onFilter} />
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.viewModal}
          onPress={toggleModal}>
          <TouchableOpacity activeOpacity={1} style={styles.viewContent}>
            <View style={styles.viewContentModal}>
              <View style={styles.viewbtnType}>
                <AppText style={{paddingBottom: 10}}>Đổi bộ lọc theo: </AppText>
                <AppButton
                  text={filterByDay ? 'Từng tháng' : 'Từng ngày'}
                  onPress={toggleFilterByDay}
                />
              </View>
              {filterByDay ? (
                <View style={styles.viewDateFilter}>
                  <View style={{flex: 0.25}}></View>
                  <View style={{flex: 4}}>
                    <AppInput
                      typeModal="DatePicker"
                      text="Từ Ngày :"
                      value={start_date}
                      onChangeValue={onChangestart_date}
                      maximumDate={moment(end_date).toDate()}
                      minimumDate={moment(end_date)
                        .subtract(6, 'months')
                        .toDate()}
                    />
                  </View>
                  <View style={{flex: 0.5}}></View>
                  <View style={{flex: 4}}>
                    <AppInput
                      typeModal="DatePicker"
                      text="Đến Ngày :"
                      value={end_date}
                      onChangeValue={onChangesend_date}
                      minimumDate={moment(start_date).toDate()}
                      maximumDate={moment().toDate()}
                    />
                  </View>
                  <View style={{flex: 0.25}}></View>
                </View>
              ) : (
                <View style={styles.viewDateFilter}>
                  <View style={{flex: 0.25}}></View>
                  <View style={{flex: 4}}>
                    <YearPicker
                      text="Từ Tháng :"
                      value={start_date}
                      onChangeValue={onChangestart_date}
                      // minimumDate={moment(start_date).toDate()}
                      maximumDate={moment(end_date).toDate()}
                    />
                  </View>
                  <View style={{flex: 0.5}}></View>
                  <View style={{flex: 4}}>
                    <YearPicker
                      text="Đến Tháng :"
                      value={end_date}
                      onChangeValue={onChangesend_date}
                      minimumDate={moment(start_date).toDate()}
                      maximumDate={moment().toDate()}
                    />
                  </View>
                  <View style={{flex: 0.25}}></View>
                </View>
              )}
              <View style={styles.viewBtnOk}>
                <AppButton text="Áp dụng" onPress={onApply} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default AdminDashBoard;
