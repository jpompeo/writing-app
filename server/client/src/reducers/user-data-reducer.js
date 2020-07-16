import { GET_USER_DATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_DATA:
      console.log("REDUCER FOR GET USER DATA")
      return action.payload.data;
    default:
      console.log("DEFAULT STATE GET USER DATA")
      return state;
  }
}
