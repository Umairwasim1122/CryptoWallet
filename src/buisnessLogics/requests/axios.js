import axios from 'axios';
import {
  requestHandler,
  successHandler,
  errorHandler,
} from './requestModifications';
import {Platform} from 'react-native';

const httpRequest = (
  config = {
    headers: {contentType: 'application/json'},
  },
) => {
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': config.headers.contentType || 'application/json',
      'User-Agent': Platform.OS === 'android' ? 'Android' : 'IOS',
      'User-Signature': process.env['SIGNATURE'],
    },
  });

  instance.interceptors.request.use(requestHandler);
  instance.interceptors.response.use(successHandler, errorHandler);
  return instance;
};

export default httpRequest();
