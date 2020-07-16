import { AUTH_USER } from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {
      case AUTH_USER:
        console.log("ACTION PAYLOAD", action.payload)
        if (action.payload.request.status == 200) {
          return true;
        } else {
          console.log("ACTION PAYLOAD ERROR", action.payload)
          return state
        }
      default:
        return state;
    }
  }