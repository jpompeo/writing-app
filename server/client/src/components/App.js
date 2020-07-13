import React from 'react';
import { withRouter, Route, Switch } from "react-router-dom";
import * as actions from '../actions';
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap'
import MainPage from './MainPage'
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import TextEditor from './TextEditor';
import '../css/App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Container className="app">
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/editor" component={TextEditor} />
            </Switch>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(connect(
  null,
  actions
)(App));
