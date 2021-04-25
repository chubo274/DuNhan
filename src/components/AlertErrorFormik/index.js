import React from 'react';
import {useFormikContext} from 'formik';
import {Alert} from 'react-native';
const AlertErrorFormik = () => {
  const propsFormik = useFormikContext();
  const {isSubmitting, isValidating, isValid, errors} = propsFormik;
  if (
    isSubmitting &&
    !isValidating &&
    !isValid &&
    typeof errors === 'object' &&
    Object.keys(errors).length > 0
  ) {
    console.log('isSubmitting, isValidating, isValid, errors', {
      isSubmitting,
      isValidating,
      isValid,
      errors,
    });
    const message = errors[Object.keys(errors)[0]];
    //* Handle alert when errors occurs
    Alert.alert('Notifications', message, [{text: 'ok', cancelable: true}]);
  }
  return null;
};
export default React.memo(AlertErrorFormik);
