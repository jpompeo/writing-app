import { GET_USER_DATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA:
      if(action.payload.status === 200) {
        return action.payload.data;
      } else {
        return state;
      }
    default:
      return state;
  }
}
