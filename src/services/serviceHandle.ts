import {create, NETWORK_ERROR, TIMEOUT_ERROR} from 'apisauce';
import serviceBase from './serviceBase';
import _ from 'lodash';
import {Alert} from 'react-native';

// Debug mode
const debugMode = false;
const debug = (body: any) => {
  debugMode && Alert.alert('Params', JSON.stringify(body));
};

const api = create({
  baseURL: serviceBase.url.HOST,
  timeout: 30000,
  headers: {'content-type': 'application/json; charset=utf-8'},
});

const convertProblemMessages = (message: string) => {
  switch (message) {
    case NETWORK_ERROR:
      return 'Kết nối Wifi/3G/GPRS bị gián đoạn, Quý khách vui lòng kiểm tra lại';
    case TIMEOUT_ERROR:
      return 'Quá hạn kết nối đến server, vui lòng kiểm tra kết nối và thử lại';
    default:
      return message;
  }
};

/**
 * process return data
 * @param {*} response
 */
const returnData = (response: any) => {
  console.log('returnData -> response', response);
  let errorMessage = '';
  if (serviceBase.statusCode.success.includes(response.status)) {
    return {
      response: {
        data: response.data,
        error: false,
      },
    };
  }
  if (
    serviceBase.statusCode.notFound.includes(response.status) ||
    serviceBase.statusCode.auth.includes(response.status) ||
    serviceBase.statusCode.error.includes(response.status)
  ) {
    errorMessage = `${
      response.data.error ? response.data.error : response.data
    }`;
  } else {
    errorMessage = convertProblemMessages(response.problem);
    errorMessage = _.isString(errorMessage)
      ? errorMessage
      : JSON.stringify(errorMessage);
  }
  return {
    response: {
      errorMessage,
      dataFailed: {...response.data},
      error: true,
    },
  };
};

/**
 * set token for authentication
 * @param {*} token
 */
const setToken = (token: string) => {
  api.setHeader('Authorization', `Token ${token}`);
  api.setHeader('Accept', 'application/json; charset=utf-8');
};

const removeAuthorization = () => {
  api.setHeader('Authorization', '');
};

/**
 *
 * @param {*url without host} url
 * @param {*param} params
 */
const get = async (url: string, params?: any) => {
  debug(params);
  const dataResponse = await api.get(url, params);
  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const post = async (url: string, body: any) => {
  debug(body);
  const dataResponse = await api.post(url, JSON.stringify(body));

  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const putUpdate = async (url: string, body: any) => {
  debug(body);
  const dataResponse = await api.put(url, body);
  // logic handle dataResponse here
  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const patch = async (url: string, body: any) => {
  debug(body);
  const response = await api.patch(url, body);
  return returnData(response);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const deleteApi = async (url: string, body: any) => {
  debug(body);
  const response = await api.delete(url, body);
  // logic handle response here
  return returnData(response);
};

export {get, post, setToken, putUpdate, patch, deleteApi, removeAuthorization};
