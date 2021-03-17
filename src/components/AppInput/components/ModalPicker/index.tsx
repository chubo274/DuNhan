import AppText from 'components/AppText';
import color from 'helpers/color';
import React from 'react';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
interface AppPickerProps {
  data: Array<{
    key: any;
    value: string;
  }>;
  keySelected: any;
  onSelect: (key: any) => void;
  showModal: boolean;
  toggleModal: () => void;
  hideModal: () => void;
  disabled?: boolean;
}

const ModalPicker = ({
  data = [],
  keySelected,
  onSelect = () => {},
  showModal = false,
  toggleModal = () => {},
  hideModal = () => {},
  disabled = false,
}: AppPickerProps) => {
  //! render
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.btnOption}
        onPress={() => {
          onSelect(item.key);
          toggleModal();
        }}>
        <AppText style={styles.textValue}>{item.value}</AppText>
        <View style={styles.viewIcon}>
          {keySelected === item.key && (
            <Octicons name="primitive-dot" color={color.primary} size={15} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      visible={showModal}
      transparent
      animationType="fade"
      onRequestClose={hideModal}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.viewModal}
        onPress={toggleModal}>
        <TouchableOpacity activeOpacity={1} style={styles.viewContent}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.key.toString()}
            renderItem={renderItem}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default React.memo(ModalPicker);
