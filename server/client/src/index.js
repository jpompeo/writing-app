import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import Nav from "./components/Nav";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import MainPage from './components/MainPage'
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import TextEditor from './components/TextEditor';
import './css/index.css'

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <App>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/editor" component={TextEditor} />
          </Switch>
        </App>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
