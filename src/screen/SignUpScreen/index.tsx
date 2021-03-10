import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useRef} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {signUpAction} from 'redux/actions/userActions';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, 'phone Phải là số')
    .min(8, 'phone Ít nhất 8 ký tự')
    .required('phone Bắt buộc'),
  password: Yup.string()
    .trim()
    .min(8, 'password Ít nhất 8 ký tự')
    .required('password Bắt buộc'),
  name: Yup.string().trim().required('name Bắt buộc'),
});
const SignUpScreen = () => {
  //! State
  const refFormik = useRef<any>(null);
  const userDataForm = {
    phone: '',
    password: '',
    name: '',
    address: '',
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //! Function
  const onBack = () => {
    const isDirty = refFormik?.current?.dirty;
    isDirty
      ? Alert.alert(
          'Thông báo',
          'Bạn có một số thay đổi chưa lưu, bạn có muốn tiếp tục thoát?',
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )
      : navigation.goBack();
  };

  const onSubmit = (values: any) => {
    const data = {...values};
    dispatch(
      signUpAction(data, {
        onSuccess: () => {
          refFormik?.current?.resetForm();
          Alert.alert(
            'Thông báo',
            'Đăng ký thành công!',
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

          if (errorMessage.includes('duplicate key error collection')) {
            errorMessage =
              'Số điện thoại này đã được sử dụng! Vui lòng đổi số để có thể đăng ký.';
          } else if (errorMessage.includes('is required')) {
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
  };

  //! UseEffect

  //! Render
  return (
    <View style={styles.viewBg}>
      <AppHeaderBack title={'Quên mật khẩu'} headerBack onPressBack={onBack} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize
          innerRef={refFormik}
          validationSchema={validationSchema}
          initialValues={userDataForm}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleSubmit,
            errors,
            values,
            setFieldValue,
          }: any) => {
            return (
              <View style={styles.container}>
                <View style={styles.viewInput}>
                  <AppInput
                    text="Số điện thoại *"
                    placeholder="098765431"
                    maxLength={20}
                    keyboardType="numeric"
                    value={values.phone}
                    onChangeValue={handleChange('phone')}
                  />
                </View>
                <View style={styles.viewInput}>
                  <AppInput
                    text="Mật khẩu *"
                    placeholder="123abc"
                    maxLength={20}
                    value={values.password}
                    onChangeValue={handleChange('password')}
                  />
                </View>
                <View style={styles.viewInput}>
                  <AppInput
                    text="Họ, Tên *"
                    placeholder="Minh Nhân"
                    maxLength={20}
                    value={values.name}
                    onChangeValue={handleChange('name')}
                  />
                </View>
                <View style={styles.viewInput}>
                  <AppInput
                    text="Địa chỉ"
                    placeholder="Hà Nội"
                    maxLength={20}
                    value={values.address}
                    onChangeValue={handleChange('address')}
                  />
                </View>
                <View style={styles.btnLogin}>
                  <AppButton
                    text="Đăng ký"
                    onPress={handleSubmit}
                    disabled={!_.isEmpty(errors)}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpScreen;
