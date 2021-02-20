import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import {FORMAT_DATE, ACTUAL_DATE} from 'helpers/constants';
import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import padding from 'helpers/padding';
import color from 'helpers/color';
import {converNumberToPrice} from 'helpers/function';
import {Formik} from 'formik';
const SearchScreen = () => {
  //! State
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
  const listPlaceStart = [
    {key: 1, value: 'Hà Nội'},
    {key: 2, value: 'TP.HCM'},
  ];
  const listRoutePlace = [
    {key: -1, value: 'Không'},
    {key: 1, value: 'Hưng Yên'},
    {key: 2, value: 'Hải Phòng'},
    {key: 3, value: 'Hà Nam'},
    {key: 4, value: 'Thanh Hoá'},
  ];
  const data = {
    place_start: 1,
    route_place: [-1, -1, -1],
    time_start: moment().format(ACTUAL_DATE),
    priceFromKey: priceData[0].key,
    priceToKey: priceData[priceData.length - 1].key,
  };

  const [isAllDay, setIsAllDay] = useState(false);

  //! Function
  const onSreach = () => {
    const title = 'Kết quả tìm kiếm';
    navigation.navigate('ListTour', {title});
  };

  const onAllDay = () => {
    setIsAllDay(!isAllDay);
  };

  //! UseState

  //! Render
  return (
    <>
      <AppHeaderBack title="Tìm kiếm" />
      <View style={styles.container}>
        <Formik
          enableReinitialize
          validateOnBlur={false}
          initialValues={data}
          onSubmit={onSreach}>
          {({handleChange, handleSubmit, errors, values, setFieldValue}) => {
            return (
              <>
                <View style={styles.field}>
                  <AppInput
                    typeModal="ModalPicker"
                    text="Địa điểm khởi hành"
                    data={listPlaceStart}
                    keySelected={values.place_start}
                    onSelect={(key: number) =>
                      setFieldValue('place_start', key)
                    }
                  />
                </View>

                <View style={styles.field}>
                  <View style={styles.fieldRoutePlace}>
                    {values.route_place.map((item, index) => {
                      return (
                        <View style={{flex: 1}}>
                          <AppInput
                            typeModal="ModalPicker"
                            text="Điểm đến"
                            data={listRoutePlace.filter(
                              (el) =>
                                el.key == -1 ||
                                !values.route_place.includes(el.key) ||
                                values.route_place[index] == el.key,
                            )}
                            keySelected={item}
                            onSelect={(key: number) => {
                              const array = values.route_place;
                              array[index] = key;
                              setFieldValue('route_place', array);
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
                    />
                  </View>
                  <View style={{flex: 1, paddingTop: 30}}>
                    <AppButton
                      text="Tất cả các ngày"
                      onPress={onAllDay}
                      style={{
                        backgroundColor: isAllDay ? color.primary : color.fade,
                      }}
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

                <View style={{paddingTop: padding.p12}}>
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
