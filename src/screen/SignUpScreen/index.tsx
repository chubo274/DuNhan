import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, 'phone_number Phải là số')
    .min(8, 'phone_number Ít nhất 8 ký tự')
    .required('phone_number Bắt buộc'),
  password: Yup.string()
    .trim()
    .min(8, 'password Ít nhất 8 ký tự')
    .required('password Bắt buộc'),
  user_name: Yup.string().trim().required('user_name Bắt buộc'),
});
const SignUpScreen = () => {
  //! State
  const refFormik = useRef<any>(null);
  const defaultData = {
    phone_number: '',
    password: '',
    user_name: '',
    address: '',
  };
  //! Function
  const onBack = () => {};
  const onSubmit = () => {};

  //! UseEffect

  //! Render
  return (
    <View style={styles.viewBg}>
      <AppHeaderBack title={'Quên mật khẩu'} />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize
          innerRef={refFormik}
          validationSchema={validationSchema}
          initialValues={defaultData}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleSubmit,
            errors,
            values,
            setFieldValue,
          }: any) => {
            console.log(errors);

            return (
              <View style={styles.container}>
                <View style={styles.viewInput}>
                  <AppInput
                    text="Số điện thoại *"
                    placeholder="098765431"
                    maxLength={20}
                    keyboardType="numeric"
                    value={values.phone_number}
                    onChangeValue={handleChange('phone_number')}
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
                    value={values.user_name}
                    onChangeValue={handleChange('user_name')}
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
