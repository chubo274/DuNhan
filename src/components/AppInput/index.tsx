import styles from 'components/AppInput/styles';
import AppText from 'components/AppText';
import React, {useState} from 'react';
import {KeyboardTypeOptions, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ModalPicker from './components/ModalPicker';
import {FORMAT_DATE} from 'helpers/constants';
import AppTextInput from 'components/AppTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {ICON} from 'assets';
import _ from 'lodash';

interface AppInputProps {
  icon?: any;
  text?: string;
  placeholder?: string;
  typeModal?: 'ModalPicker' | 'DatePicker' | '';
  //ModalPicker
  data?: Array<{
    key: number;
    value: string;
  }>;
  keySelected?: number;
  onSelect?: (key: number) => void;
  value?: any;
  onChangeValue?: (data: any) => void;
  editable?: boolean;
  maximumDate?: any;
  minimumDate?: any;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  initData?: any[];
  //DatePicker
}
const AppInput = ({
  icon,
  text = '',
  placeholder = text,
  typeModal = '',
  data = [],
  keySelected = 0,
  onSelect = () => {},
  value = undefined,
  onChangeValue = () => {},
  editable = true,
  maximumDate = undefined,
  minimumDate = undefined,
  maxLength,
  secureTextEntry = false,
  keyboardType = 'default',
  initData = [],
}: AppInputProps) => {
  //! State
  const [showModal, setShowModal] = useState(false);

  //! Function
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  //! Render
  return (
    <>
      {!!text && <AppText style={styles.textTitle}>{text}</AppText>}
      <View style={[styles.container, !icon && {height: 60}]}>
        <View style={styles.viewFieldInput}>
          {!!icon && (
            <View style={styles.viewIcon}>
              <Entypo name={icon} size={40} />
            </View>
          )}
          {!typeModal && (
            <View style={styles.viewInput}>
              <AppTextInput
                value={value}
                placeholder={placeholder}
                onChangeText={(text) => onChangeValue(text)}
                editable={editable}
                maxLength={maxLength}
                keyboardType={keyboardType}
                style={styles.textInput}
                secureTextEntry={secureTextEntry}
              />
            </View>
          )}
          {typeModal == 'ModalPicker' && (
            <>
              <TouchableOpacity
                style={styles.viewTouchModal}
                onPress={toggleModal}
                disabled={!editable}>
                <View style={styles.viewText}>
                  <AppText style={styles.textView}>
                    {!_.isEmpty(initData)
                      ? initData.find((el) => el.key === keySelected)?.value
                      : data.find((el) => el.key === keySelected)?.value}
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
              <ModalPicker
                data={data}
                keySelected={keySelected}
                onSelect={onSelect}
                showModal={showModal}
                toggleModal={toggleModal}
                hideModal={hideModal}
              />
            </>
          )}
          {typeModal == 'DatePicker' && (
            <>
              <TouchableOpacity
                style={styles.viewTouchModal}
                onPress={toggleModal}
                disabled={!editable}>
                <View style={styles.viewText}>
                  <AppText style={styles.textView}>
                    {moment(value).format('DD/MM/YYYY')}
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
              <DateTimePickerModal
                isVisible={showModal}
                mode="date"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                onConfirm={(date: any) => {
                  console.log('date', moment(date).format(FORMAT_DATE));
                  hideModal();
                  onChangeValue(moment(date).format(FORMAT_DATE));
                }}
                onCancel={hideModal}
                date={moment(value).toDate()}
              />
            </>
          )}
        </View>
      </View>
    </>
  );
};
export default React.memo(AppInput);
