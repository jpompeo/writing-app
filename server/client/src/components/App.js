import React from 'react';
import { withRouter, Route, Switch } from "react-router-dom";
import { fetchUser } from '../actions';
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap'
import MainPage from './MainPage'
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Login from './auth/Login';
import { bindActionCreators } from "redux";
import '../styles/App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    console.log("")
    return (
      <Container className="app">
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);

