import { combineReducers } from "redux";
import AuthReducer from './reducer-auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer,
});

export default rootReducer;
