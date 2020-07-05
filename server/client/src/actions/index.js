import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from './types';

// export const fetchMovies = (page = 1) => dispatch => {
//   axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a50dd974dc6bceb5358b37229983facc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
//   ).then(function (response) {
//     dispatch({ type: FETCH_MOVIES, payload: response.data });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// };

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
    localStorage.setItem('email', response.data.email);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signin',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect email or password' });
  });
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
