import { combineReducers } from "redux";
import AuthReducer from './reducer-auth';
import LoginStatusReducer from './reducer-loginStatus';
import UserDataReducer from './user-data-reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  loggedIn: LoginStatusReducer,
  userData: UserDataReducer
});

export default rootReducer;
