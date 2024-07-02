// import {clearAuthStorage} from '../redux/UserSlice';
import { store } from '../redux/Store';

export const requestHandler = request => {
  const state = store.getState();

  const token = state.auth.token || state.auth.status || '';
  if (token) request.headers.Authorization = `Bearer ${token}`;
  return request;
};

export const successHandler = response => {
  return {
    ...response,
    data: response.data,
  };
};
export const errorHandler = error => {
  const { status } = error.response;
  if (status === 401) {
    // const {dispatch} = store;
    // dispatch(clearAuthStorage());
  }
  return Promise.reject(error);
};
