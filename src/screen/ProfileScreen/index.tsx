import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import styles from './styles';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {RootState} from 'redux/reducers';

let text: string;
const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Tên bắt buộc'),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, 'Phone phải là số')
    .min(8, 'Ít nhất 8 ký tự')
    .required('Phone là bắt buộc'),
});

const ProfileScreen = () => {
  const dispatch = useDispatch();
  //! State
  const refFormik = useRef<any>(null);
  const [editting, setEditting] = useState(false);
  const data = useSelector((state: RootState) => state.userReducer.data);
  if (editting) {
    text = 'Lưu';
  } else {
    text = 'Sửa';
  }

  //! Function
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

  //! Effect

  //! Render
  return (
    <>
      <AppHeaderBack title="Thông tin cá nhân" />
      <View style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={{
            name: data.name,
            phone: data.phone,
            address: data.address,
          }}
          innerRef={refFormik}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={editting ? onPressSubmit : toggleBtn}>
          {({handleChange, handleSubmit, errors, values, setFieldValue}) => {
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
                    icon={'mobile'}
                    text=""
                    placeholder="03767891"
                    value={values.phone}
                    onChangeValue={handleChange('phone')}
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

        <View style={styles.viewbtnLogOut}>
          <AppButton text="Đăng xuất" onPress={onLogOut} />
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
