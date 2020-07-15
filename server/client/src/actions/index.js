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

export function fetchUser() {
  
  const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    };
  

  // console.log("TOKEN", token)

  const request = axios.get('http://localhost:5000/auth/current_user', config)
  
  return {
    type: AUTH_USER,
    payload: request
  }

  // // request
  // //   .then(localStorage.setItem('token', request.token))
  // //   .catch((error) => {
  // //     console.log("FETCH USER ERROR", error)
  // //   });

  // request.then((response) => {
  //   console.log("FETCH USER RESPONSE", response)
    
  // })
  // .catch(function (error) {
  //       if (error) return console.log(error);
  //     });
  

}



// export const fetchUser = () => dispatch => {
//   const config = {
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem('token'),
//     }
//   };

//   axios.get(
//     'http://localhost:5000/auth/current_user',
//     config
//   ).then(function (response) {
//     dispatch({ type: AUTH_USER, payload: response.data });
//     localStorage.setItem('token', response.data.token);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// };

export function registerUser(userInfo) {
  const request = axios.post('http://localhost:5000/auth/signup', userInfo)

  request
    .then(function (response) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
    })
    .catch(function (error) {
      return { type: AUTH_ERROR, payload: 'Incorrect username or password' };
    });

  return {
    type: AUTH_USER,
    payload: request
  }
};

// export const signin = (formProps, callback) => dispatch => {
//   axios.post(
//     'http://localhost:5000/auth/signin',
//     formProps
//   ).then(function (response) {
//     dispatch({ type: AUTH_USER, payload: response.data });
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('email', response.data.username);
//     callback();
//   })
//   .catch(function (error) {
//     dispatch({ type: AUTH_ERROR, payload: 'Incorrect username or password' });
//   });
// };

export function loginUser(userInfo) {
  console.log("USER INFO", userInfo)
  const request = axios.post('http://localhost:5000/auth/signin', userInfo)

  request.then(function (response) {
    console.log("RESPONSE", response)
    console.log("HIIIIIIIIIIIIIIIIII!!!!!!!!!!!!!!!!!!!!!!")
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
  })

  return { type: AUTH_USER, payload: request }
};

// export const signup = (formProps, callback) => dispatch => {
//   axios.post(
//     'http://localhost:5000/auth/signup',
//     formProps
//   ).then(function (response) {
//     dispatch({ type: AUTH_USER, payload: response.data });
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('username', response.data.username);
//     callback();
//   })
//   .catch(function (error) {
//     dispatch({ type: AUTH_ERROR, payload: 'Username in use' });
//   });
// };

// export const signin = (formProps, callback) => dispatch => {
//   axios.post(
//     'http://localhost:5000/auth/signin',
//     formProps
//   ).then(function (response) {
//     dispatch({ type: AUTH_USER, payload: response.data });
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('email', response.data.username);
//     callback();
//   })
//   .catch(function (error) {
//     dispatch({ type: AUTH_ERROR, payload: 'Incorrect username or password' });
//   });
// };

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
