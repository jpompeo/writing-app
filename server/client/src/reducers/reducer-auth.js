import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log("ACTION PAYLOAD", action.payload)
      // localStorage.setItem('token', action.payload.data.token);
      // localStorage.setItem('username', action.payload.data.username);
      if (action.payload.request.status == 200) {
        return { ...state, authenticated: action.payload.data.token,
            username: action.payload.data.username
          };
      }
      else {
        return { ...state, errorMessage: action.payload };
      }
    default:
      return state;
  }
}
