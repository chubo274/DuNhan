import queryString from 'query-string';
import _ from 'lodash';

export const validateEmail = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};
export const validatePhoneNumberVN = (value: string) => {
  const re = /(0[3|5|7|8|9])+([0-9]{8})\b/;
  return re.test(value);
};
export const validateMoney = (value: string) => {
  const re = /^[0-9]+(\.[0-9]{1,2})?$/;
  return re.test(value);
};

export const convertObjectToQuery = (param: any) => {
  if (!_.isEmpty(param)) {
    // if (!_.isArray(param)) {
    //   let list =""
    //   param.map((el :any)=>{})
    //   return '?' + queryString.stringify(param);
    // }
    return '?' + queryString.stringify(param);
  } else return '';
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

export const converNumberToBankNumber = (param: number) => {
  const le = param.toString().length % 4;
  let subFrom = 0;
  let priceString = '';
  if (le != 0) {
    priceString += param.toString().substr(0, le);
    subFrom = le;
  } else {
    priceString += param.toString().substr(0, 4);
    subFrom = 4;
  }
  while (subFrom < param.toString().length) {
    priceString += '  ' + param.toString().substring(subFrom, subFrom + 4);
    subFrom += 4;
  }
  return priceString;
};
