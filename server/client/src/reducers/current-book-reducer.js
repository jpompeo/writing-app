import { SET_CURRENT_BOOK} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_BOOK:
      if(action.payload) {
        return action.payload;
      } else {
        return state;
      }
    default:
      return state;
  }
}
