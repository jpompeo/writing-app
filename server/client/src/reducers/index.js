import { combineReducers } from "redux";
import AuthReducer from './reducer-auth';
import LoginStatusReducer from './reducer-loginStatus';
import UserDataReducer from './user-data-reducer'
import CurrentBookReducer from './current-book-reducer'
import CurrentUserReducer from './current-user-reducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  loggedIn: LoginStatusReducer,
  userData: UserDataReducer,
  currentBook: CurrentBookReducer,
  currentUser: CurrentUserReducer
});

export default rootReducer;
