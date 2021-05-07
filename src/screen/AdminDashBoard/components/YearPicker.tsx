import AppText from 'components/AppText';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
import {FORMAT_DATE} from 'helpers/constants';
import {ICON} from 'assets';
import padding from 'helpers/padding';
import fontSize from 'helpers/fontSize';
import color from 'helpers/color';
import font from 'helpers/font';

interface YearPickerI {
  text?: string;
  value?: any;
  onChangeValue?: (data: any) => void;
  maximumDate?: any;
  minimumDate?: any;
}
const YearPicker = ({
  text = '',
  value = undefined,
  onChangeValue = () => {},
  maximumDate = undefined,
  minimumDate = undefined,
}: YearPickerI) => {
  //! Hook, Reducers

  //! State
  const [showModal, setShowModal] = useState(false);

  //! Function
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || value;

      toggleModal();
      onChangeValue(selectedDate);
    },
    [value, showModal],
  );

  //! UseEffects

  //! Render
  return (
    <>
      {!!text && <AppText style={styles.textTitle}>{text}</AppText>}
      <View style={{height: 60}}>
        <View style={styles.viewFieldInput}>
          <TouchableOpacity style={styles.viewTouchModal} onPress={toggleModal}>
            <View style={styles.viewText}>
              <AppText style={styles.textView}>
                {moment(value).format('MM/YYYY')}
              </AppText>
            </View>
            <View style={styles.viewIconModal}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={ICON.dropDown_1}
                style={styles.iconTouchModal}
              />
            </View>
          </TouchableOpacity>
          {showModal && (
            <MonthPicker
              onChange={onValueChange}
              value={moment(value).toDate()}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default React.memo(YearPicker);

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: font.VDBrevia_Sb,
    fontSize: fontSize.f16,
    color: color.black,
    marginBottom: padding.p4,
    paddingLeft: padding.p4,
  },
  viewFieldInput: {
    flex: 1,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: color.white,
    flexDirection: 'row',
  },
  viewTouchModal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    flex: 1,
    paddingLeft: 30,
  },
  viewInput: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: padding.p8,
    flexDirection: 'row',
  },
  viewIconModal: {
    alignSelf: 'flex-end',
    width: 30,
    height: 50,
    justifyContent: 'center',
  },
  touchToggleHidePass: {
    justifyContent: 'center',
    paddingHorizontal: padding.p8,
  },
  iconTouchModal: {
    height: 10,
  },
  textView: {
    fontSize: fontSize.f16,
  },
});
