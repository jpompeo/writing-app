import { AUTH_USER } from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {
      case AUTH_USER:
        
        if (action.payload.request.status == 200) {
          return true;
        } else {
         
          return state
        }
      default:
        return state;
    }
  }