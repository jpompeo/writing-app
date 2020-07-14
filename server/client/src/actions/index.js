import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from './types';

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/auth/current_user',
    config
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Username in use' });
  });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signin',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.username);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect username or password' });
  });
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
