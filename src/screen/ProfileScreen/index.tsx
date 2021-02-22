import AppButton from 'components/AppButton';
import AppHeaderBack from 'components/AppHeaderBack';
import AppInput from 'components/AppInput';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import * as Yup from 'yup';

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
  //! State
  const refFormik = useRef<any>(null);
  const [editting, setEditting] = useState(false);
  const data = {
    name: 'Nhân',
    phone: '03767891',
    address: 'Đại học Công Nghiệp',
  };

  //! Function
  if (editting) {
    text = 'Lưu';
  } else {
    text = 'Sửa';
  }
  const onPressSubmit = (values: any) => {
    console.log('submit');
    toggleBtn();
  };
  const toggleBtn = () => {
    setEditting(!editting);
  };

  const onLogOut = () => {};

  //! Effect

  //! Render
  return (
    <>
      <AppHeaderBack title="Thông tin cá nhân" />
      <View style={styles.container}>
        <Formik
          enableReinitialize
          initialValues={data}
          innerRef={refFormik}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={onPressSubmit}>
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
