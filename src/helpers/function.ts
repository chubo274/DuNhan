import queryString from 'query-string';
import _ from 'lodash';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const convertObjectToQuery = (param: any) => {
  if (_.isEmpty(param)) {
    return '';
  }
  return '?' + queryString.stringify(param);
};

export const converNumberToPrice = (param: number, unit = 'vnđ') => {
  const le = param.toString().length % 3;
  let subFrom = 0;
  let priceString = '';
  if (le != 0) {
    priceString += param.toString().substr(0, le);
    subFrom = le;
  } else {
    priceString += param.toString().substr(0, 3);
    subFrom = 3;
  }
  while (subFrom < param.toString().length) {
    priceString += '.' + param.toString().substring(subFrom, subFrom + 3);
    subFrom += 3;
  }
  return priceString + ' ' + unit;
};
