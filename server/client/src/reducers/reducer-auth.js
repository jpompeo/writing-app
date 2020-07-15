import { AUTH_USER } from '../actions/types';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  username: localStorage.getItem('username') || '',
  userId: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      console.log("ACTION PAYLOAD", action.payload)
      if (action.payload.request.status == 200) {
        return { ...state, authenticated: action.payload.data.token,
            username: action.payload.data.username, 
            userId: action.payload.data.userId
          };
      } else {
        console.log("ACTION PAYLOAD ERROR", action.payload.error)
        return { ...state, errorMessage: action.payload.error };
      }
    default:
      return state;
  }
}
