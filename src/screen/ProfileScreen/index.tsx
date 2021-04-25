import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {RootState} from 'redux/reducers';
import AppText from 'components/AppText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {converNumberToBankNumber, converNumberToPrice} from 'helpers/function';
import ProfileField from './components/profileField';
import {IMAGE} from 'assets';

let text: string;
const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Tên bắt buộc'),
});

const ProfileScreen = () => {
  const dispatch = useDispatch();
  //! State
  const refFormik = useRef<any>(null);
  const [editting, setEditting] = useState(false);
  //TODO wallet
  const [showWallet, setShowWallet] = useState(false);
  const [addMoney, setAddMoney] = useState('');
  const data = useSelector((state: RootState) => state.userReducer.data);
  if (editting) {
    text = 'Lưu';
  } else {
    text = 'Sửa';
  }

  //! Function
  const toggleShowWallet = () => {
    setShowWallet(!showWallet);
  };

  const onPressSubmit = (values: any) => {
    dispatch(
      userActions.updateUserData(values, {
        onSuccess: () => {
          refFormik?.current?.resetForm();
          Alert.alert(
            'Thông báo',
            'Cập nhật thành công!',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        },
        onFailed: (err: string) => {
          // refFormik?.current?.resetForm();
          let errorMessage = err;
          if (errorMessage.includes('is required')) {
            errorMessage = 'Bạn cần nhập đủ những trường bắt buộc';
          }
          Alert.alert(
            'Xảy ra lỗi',
            errorMessage,
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
    toggleBtn();
  };
  const toggleBtn = () => {
    setEditting(!editting);
  };

  const onLogOut = () => {
    dispatch({type: '_REQUEST'});
    dispatch(userActions.logout());
  };

  const onChangeAddMoney = (value: any) => {
    setAddMoney(value);
  };
  const onAddMoney = () => {
    console.log(addMoney);
    console.log(Number(addMoney));
  };

  //! Effect

  //! Render
  return (
    <>
      <Modal
        visible={showWallet}
        transparent
        animationType="fade"
        onRequestClose={toggleShowWallet}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.viewModal}
          onPress={toggleShowWallet}>
          <TouchableOpacity activeOpacity={1} style={styles.viewContent}>
            <ImageBackground
              source={IMAGE.theVisa}
              style={{width: '100%', aspectRatio: 1.5}}
              resizeMode={'contain'}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.viewVisa}>
                  <ProfileField
                    icon={'mobile'}
                    data={data.phone}
                    textStyle={styles.textPhoneWhite}
                    color={'#FFFFFF'}
                  />
                  <ProfileField
                    icon={'wallet'}
                    data={converNumberToBankNumber(data.bank_number)}
                    textStyle={styles.textBankNumberWhite}
                    color={'#FFFFFF'}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <Entypo name={'credit'} size={24} color={'yellow'} />
                    <TextInput
                      value={addMoney}
                      onChange={onChangeAddMoney}
                      style={styles.inputMoney}
                      keyboardType="numeric"
                      autoFocus={true}
                      maxLength={12}
                    />
                  </View>
                </View>
                <View style={styles.viewBtnWallet}>
                  <AppButton text={'Nạp'} onPress={onAddMoney} />
                  <AppText></AppText>
                  <AppButton text={'Huỷ'} onPress={toggleShowWallet} />
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.containerTren}>
            <View>
              <TouchableOpacity
                style={styles.touchNap}
                onPress={toggleShowWallet}>
                <AntDesign name={'pluscircle'} size={24} />
                <AppText style={{fontSize: 24}}>Nạp tiền</AppText>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <AppText style={styles.txtTitle} numberOfLines={1}>
                Thông tin cá nhân
              </AppText>
            </View>
            <View style={{padding: 30, paddingTop: 10}}>
              <ProfileField
                icon={'mobile'}
                data={data.phone}
                textStyle={styles.textPhone}
              />
              <ProfileField
                icon={'wallet'}
                data={converNumberToBankNumber(data.bank_number)}
                textStyle={styles.textBankNumber}
              />
              <ProfileField
                icon={'credit'}
                data={converNumberToPrice(data.money_available)}
                textStyle={styles.textBankNumber}
              />
            </View>
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Formik
                enableReinitialize
                initialValues={{
                  name: data.name,
                  address: data.address,
                }}
                innerRef={refFormik}
                validateOnBlur={false}
                validationSchema={validationSchema}
                onSubmit={editting ? onPressSubmit : toggleBtn}>
                {({
                  handleChange,
                  handleSubmit,
                  errors,
                  values,
                  setFieldValue,
                }) => {
                  return (
                    <>
                      <View style={styles.field}>
                        <AppInput
                          icon={'user'}
                          text=""
                          placeholder="Minh Nhân"
                          value={values.name}
                          onChangeValue={handleChange('name')}
                          editable={editting}
                        />
                      </View>
                      <View style={styles.field}>
                        <AppInput
                          icon={'address'}
                          text=""
                          placeholder="Đại học Công Nghiệp"
                          value={values.address}
                          onChangeValue={(address) =>
                            setFieldValue('address', address)
                          }
                          editable={editting}
                        />
                      </View>

                      <View style={styles.viewbtnSave}>
                        <AppButton text={text} onPress={handleSubmit} />
                      </View>
                    </>
                  );
                }}
              </Formik>
            </ScrollView>
            <View style={styles.viewbtnLogOut}>
              <AppButton text="Đăng xuất" onPress={onLogOut} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
