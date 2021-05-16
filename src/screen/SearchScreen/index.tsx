import {useIsFocused, useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppButtonCircle from 'components/AppButtonCircle';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import AppText from 'components/AppText';
import {Formik} from 'formik';
import {ACTUAL_DATE} from 'helpers/constants';
import {converNumberToPrice} from 'helpers/function';
import padding from 'helpers/padding';
import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {Alert, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import placeActions from 'redux/actions/placeActions';
import tourActions from 'redux/actions/tourActions';
import {RootState} from 'redux/reducers';
import styles from './styles';
const SearchScreen = () => {
  let isAllDay = false;
  const innerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const listPlaceData = useSelector(
    (state: RootState) => state.placeReducer.data,
  );
  const listPlacesData = useSelector(
    (state: RootState) => state.tourReducer.listPlacesStart,
  );

  const listPlace: any[] = [];
  const listPlacesStart: any[] = [];
  listPlaceData.map((el) => listPlace.push({key: el._id, value: el.name}));
  listPlacesData.map((el: any) =>
    listPlacesStart.push({key: listPlacesStart.length, value: el}),
  );

  //! State
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const priceData = [
    {
      key: 0,
      value: converNumberToPrice(0),
    },
    {
      key: 1000000,
      value: converNumberToPrice(1000000),
    },
    {
      key: 2000000,
      value: converNumberToPrice(2000000),
    },
    {
      key: 5000000,
      value: converNumberToPrice(5000000),
    },
    {
      key: 7000000,
      value: converNumberToPrice(7000000),
    },
    {
      key: 10000000,
      value: converNumberToPrice(10000000),
    },
    {
      key: 12000000,
      value: converNumberToPrice(12000000),
    },
    {
      key: 15000000,
      value: converNumberToPrice(15000000),
    },
    {
      key: 20000000,
      value: converNumberToPrice(20000000),
    },
    {
      key: 99999999999,
      value: 'Không giới hạn',
    },
  ];

  const data: any = {
    place_start: listPlacesStart[0]?.key,
    places: [],
    time_start: moment().format(ACTUAL_DATE),
    priceFromKey: priceData[0].key,
    priceToKey: priceData[priceData.length - 1].key,
  };

  //! Function
  const onSearch = (value: any) => {
    value.place_start = listPlacesStart.find(
      (el: any) => el.key === value.place_start,
    )?.value;

    isAllDay && delete value.time_start;
    dispatch(
      tourActions.searchTours(value, {
        onSuccess: (listTour: any) => {
          const title = 'Kết quả tìm kiếm';
          navigation.navigate('ListTour', {title, listTour});
          innerRef?.current?.resetForm();
          isAllDay = false;
        },
        onFailed: () => {
          Alert.alert(
            'Cảnh báo!',
            'Oops! Lỗi bất ngờ',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        },
      }),
    );
  };

  //! UseState
  useEffect(() => {
    if (isFocused) {
      dispatch(
        placeActions.getListPlace({
          onFailed: (err: string) => {
            Alert.alert(
              'Cảnh báo!',
              err,
              [
                {
                  text: 'Ok',
                },
              ],
              {cancelable: false},
            );
          },
        }),
      );
    }
  }, [isFocused]);

  //! Render
  return (
    <>
      <AppHeaderBack title="Tìm kiếm" />
      <View style={styles.container}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          initialValues={data}
          innerRef={innerRef}
          onSubmit={onSearch}>
          {({handleChange, handleSubmit, errors, values, setFieldValue}) => {
            //* Function for Fomik
            const onPlus = () => {
              const newList = listPlace.filter(
                (el) => !values.places.includes(el.key),
              );
              const newRoutePlace = values.places;
              newRoutePlace.push(newList[0].key);
              setFieldValue('places', newRoutePlace);
            };
            const onMinus = () => {
              const newRoutePlace = values.places;
              newRoutePlace.pop();
              setFieldValue('places', newRoutePlace);
            };

            const onAllDay = () => {
              if (isAllDay)
                setFieldValue('time_start', moment(data).format(ACTUAL_DATE));
              else setFieldValue('time_start', null);
              isAllDay = !isAllDay;
            };

            return (
              <>
                <View style={styles.field}>
                  <AppInput
                    typeModal="ModalPicker"
                    text="Địa điểm khởi hành"
                    data={listPlacesStart}
                    keySelected={values.place_start}
                    onSelect={(key: number) =>
                      setFieldValue('place_start', key)
                    }
                  />
                </View>

                <View style={styles.fieldPlace}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: padding.p8,
                    }}>
                    <View style={styles.viewPlace}>
                      <AppText style={styles.textPlace}>Điểm đến</AppText>
                    </View>
                    {!_.isEmpty(listPlace) && values.places.length < 3 && (
                      <View style={styles.viewPlace}>
                        <AppButtonCircle name="pluscircleo" onPress={onPlus} />
                      </View>
                    )}
                    {values.places.length > 0 && (
                      <AppButtonCircle name="minuscircleo" onPress={onMinus} />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {values.places.map((item: any, index: any) => {
                      return (
                        <View style={{flex: 1}} key={item}>
                          <AppInput
                            typeModal="ModalPicker"
                            text=""
                            data={listPlace.filter(
                              (el: any) =>
                                !values.places.includes(el.key) ||
                                values.places[index] == el.key,
                            )}
                            keySelected={item}
                            onSelect={(key: number) => {
                              const array = values.places;
                              array[index] = key;
                              setFieldValue('places', array);
                            }}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View style={styles.fieldFlexRow}>
                  <View
                    style={{
                      flex: 2,
                      paddingRight: padding.p8,
                      opacity: isAllDay ? 0.5 : 1,
                    }}>
                    <AppInput
                      typeModal="DatePicker"
                      text="Ngày khởi hành"
                      editable={!isAllDay}
                      value={values.time_start}
                      onChangeValue={(data: any) =>
                        setFieldValue(
                          'time_start',
                          moment(data).format(ACTUAL_DATE),
                        )
                      }
                      minimumDate={moment().toDate()}
                    />
                  </View>
                  <View style={{flex: 1, paddingTop: 25}}>
                    <AppButton
                      text={isAllDay ? 'Ngày chỉ định' : 'Tất cả các ngày'}
                      onPress={onAllDay}
                    />
                  </View>
                </View>

                <View style={styles.fieldFlexRow}>
                  <View
                    style={{
                      flex: 1,
                      paddingRight: padding.p8,
                    }}>
                    <AppInput
                      typeModal="ModalPicker"
                      text="Giá từ (đ)"
                      data={priceData.filter(
                        (el) => el.key < values.priceToKey,
                      )}
                      keySelected={values.priceFromKey}
                      onSelect={(key: number) =>
                        setFieldValue('priceFromKey', key)
                      }
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      paddingRight: padding.p8,
                    }}>
                    <AppInput
                      typeModal="ModalPicker"
                      text="đến giá (đ)"
                      data={priceData.filter(
                        (el) => el.key > values.priceFromKey,
                      )}
                      keySelected={values.priceToKey}
                      onSelect={(key: number) =>
                        setFieldValue('priceToKey', key)
                      }
                    />
                  </View>
                </View>

                <View style={styles.viewbtnLogOut}>
                  <AppButton text="Tìm" onPress={handleSubmit} />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default SearchScreen;
