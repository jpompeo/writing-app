import React from 'react';
import { Route, Switch } from "react-router-dom";
import { fetchUser } from '../actions';
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap'
import MainPage from './MainPage'
import Nav from './Nav'
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Login from './auth/Login';
import BubbleWordCount from './BubbleWordCount'
import { bindActionCreators } from "redux";
import '../styles/App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate() {
    console.log("APP UPDATED")
    this.props.fetchUser();
  }

  render() {
    return (
      <Container className="app">
        <Row>
          <Col>
          <Nav />
            <Switch>
              <Route exact path="/me" component={MainPage} />
              {/* <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} /> */}
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/bubblechart" component={BubbleWordCount}/> */}
            </Switch>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
    return {
      authenticatedUser: state.auth.authenticated
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

