import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import App from './components/App';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";
import "bootstrap/dist/css/bootstrap.css";
import './styles/index.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Fragment>
        <Nav />
        <App/>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
