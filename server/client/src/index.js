import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from "react-dom";
import Nav from "./components/Nav";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import './css/index.css'

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Nav />
        <App/>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
