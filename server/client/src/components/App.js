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
import BurnDownChart from './BurnDownChart'
import WeeklyDoughnut from './WeeklyDoughnut'
import LineGraph from './LineGraph'
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
      <Container id="app-container" fluid>
        <Row>
          <Col>
          <Nav />
            <Switch>
              <Route exact path="/me" component={MainPage} />
              {/* <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/bubblechart" component={BubbleWordCount}/>
              <Route exact path="/burndownchart" component={BurnDownChart}/>
              <Route exact path="/linegraph" component={LineGraph}/>
              <Route exact path="/doughnut" component={WeeklyDoughnut}/>
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

