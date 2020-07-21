import { SET_CURRENT_USER} from '../actions/types';

const INITIAL_STATE = localStorage.getItem('username') || '';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("CURRENT USER REDUCER", action.payload)
      if(action.payload) {
        console.log("USER REDUCER IF")
        return action.payload;
      } else {
        return state;
      }
    default:
      return state;
  }
}
