import styles from 'components/AppInput/styles';
import AppText from 'components/AppText';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ModalPicker from './components/ModalPicker';
import {FORMAT_DATE} from 'helpers/constants';
import AppTextInput from 'components/AppTextInput';
import Entypo from 'react-native-vector-icons/Entypo';

interface AppInputProps {
  icon?: any;
  text?: string;
  iconTouchModal?: any;
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
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | undefined;
  //DatePicker
}
const AppInput = ({
  icon,
  text = '',
  iconTouchModal = null,
  placeholder = text,
  typeModal = '',
  data = [],
  keySelected = 0,
  onSelect = () => {},
  value = undefined,
  onChangeValue = () => {},
  editable = true,
  maximumDate = undefined,
  maxLength,
  secureTextEntry = false,
  keyboardType = 'default',
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
    <View style={[styles.container, !icon && {height: 100}]}>
      <AppText style={styles.textTitle}>{text}</AppText>
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
              multiline={!icon}
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
              disabled={editable}>
              <View style={styles.viewText}>
                <AppText style={styles.textView}>
                  {data.find((el) => el.key === keySelected)?.value}
                </AppText>
              </View>
              <View style={styles.viewIconModal}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={iconTouchModal}
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
              disabled={editable}>
              <View style={styles.viewText}>
                <AppText style={styles.textView}>
                  {moment(value).format('DD/MM/YYYY')}
                </AppText>
              </View>
              <View style={styles.viewIconModal}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={iconTouchModal}
                  style={styles.iconTouchModal}
                />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showModal}
              mode="date"
              maximumDate={maximumDate}
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
  );
};
export default React.memo(AppInput);
