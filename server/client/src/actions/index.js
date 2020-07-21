import axios from "axios";
import { SET_CURRENT_BOOK, SET_CURRENT_USER, SEND_UPDATE, AUTH_USER, AUTH_ERROR, ADD_BOOK, ADD_CHAPTER, GET_USER_DATA, GENERATE_FAKE_DATA } from './types';



  // server address
const ROOT_URL = 'http://localhost:5000/api';

//for fake data

export function generateFakeData(path) {
  const url = ROOT_URL + path;
  const request = axios.get(url);

  request.then((response) => {
    console.log("Fake Data Response: ", response)
  })

  return {
    type: GENERATE_FAKE_DATA,
    payload: request,
  };
}

export function deleteFakeUser(path) {
  const url = ROOT_URL + path;
  const request = axios.delete(url);

  request.then((response) => {
    console.log("Fake Data Response: ", response)
  })

  return {
    type: GENERATE_FAKE_DATA,
    payload: request,
  };
}

export function setCurrentBook(bookInfo) {
 
  return {
    type: SET_CURRENT_BOOK,
    payload: bookInfo,
  };
}

export function setFakeUser(username, callback) {
 console.log("SET USER ACTION", username)
  localStorage.setItem('username', username);
  setTimeout(callback(), 1000)
  
  return {
    type: SET_CURRENT_USER,
    payload: username,
  };
}

export function updateCurrentBook(bookInfo, callback) {
  callback()

  return {
    type: SET_CURRENT_BOOK,
    payload: bookInfo,
  };
}

export function addBook(bookInfo, callback) {
  const url = `${ROOT_URL}/users/${bookInfo.username}/book`;
  const request = axios.post(url, bookInfo);
  request.then(() => {
    setTimeout(callback(), 1000)
  })

  return {
    type: ADD_BOOK,
    payload: request,
  };
}

export function sendChapter(chapterInfo, callback) {
  const url = `${ROOT_URL}/users/${chapterInfo.username}/chapter`;
  const request = axios.post(url, chapterInfo);
  request.then(() => {
    setTimeout(callback(), 1000)
  })

  return {
    type: GET_USER_DATA,
    payload: request,
  };
}

export function getUserData(username) {
  const loggedInUser = localStorage.getItem('username')
  const url = `${ROOT_URL}/users/${loggedInUser}`;
  const request = axios.get(url);


  return {
    type: GET_USER_DATA,
    payload: request,
  };
}

export function sendUpdate(updateInfo, callback) {
  const url = `${ROOT_URL}/users/${updateInfo.username}/update`;
  const request = axios.post(url, updateInfo);
  request.then(() => {
    setTimeout(callback(), 3000)
  })

  return {
    type: GET_USER_DATA,
    payload: request,
  };
}



/////////////////// Authorization actions 
/*

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
  
  const request = axios.post('http://localhost:5000/auth/signin', userInfo)

  request.then(function (response) {
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
  })
  .catch((error) => {
   return  {type: AUTH_ERROR, payload: 'Incorrect username or password'}
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
*/