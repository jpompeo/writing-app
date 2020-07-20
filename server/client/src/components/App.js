import React from 'react';
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { fetchUser } from '../actions';
import { getUserData } from '../actions';
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/App.css'

import MainPage from './MainPage'
import Nav from './Nav'
// import Signup from './auth/Signup';
// import Signin from './auth/Signin';
// import Login from './auth/Login';
import TestLineChart from './charts/testChart'
import MixChart from './charts/Projections'
import BurnDownChart from './charts/BurnDownChart'
import WeeklyDoughnut from './charts/WeeklyDoughnut'
import LineGraph from './charts/LineGraph'
import AddBookForm from './forms/AddBookForm'
import AddChapterForm from './forms/AddChapterForm'
import UpdateForm from './forms/UpdateForm'
import StoryMap from './StoryMap'
import FakeData from './FakeData'

class App extends React.Component {
  componentDidMount() {
    // this.props.fetchUser();
    // this.props.getUserData('bestselling_author1');
  }

  // componentDidUpdate() {
  //   this.props.fetchUser();
  // }

  render() {
    return (
      <Container id="app-container" fluid>
        <Row>
          <Col id="app-col">
          <Switch>
            <Route path="/" component={Nav} />
          </Switch>
          {/* <Nav /> */}
            <Switch>
              <Route exact path="/me" component={MainPage} />
              {/* <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} /> */}
              {/* <Route exact path="/login" component={Login} /> */}
              <Route exact path="/me/addbook" component={AddBookForm} />
              <Route exact path="/mixchart" component={MixChart}/>
              <Route exact path="/burndownchart" component={BurnDownChart}/>
              <Route exact path="/linegraph" component={LineGraph}/>
              <Route exact path="/doughnut" component={WeeklyDoughnut}/>
              <Route exact path="/me/addchapter" component={AddChapterForm}/>
              <Route exact path="/me/addupdate" component={UpdateForm}/>
              <Route exact path="/me/storymap" component={StoryMap}/>
              <Route exact path="/generate-fake-data" component={FakeData} />
              <Route exact path="/TestLineChart" component={TestLineChart} />
            </Switch>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
    return {
      user: state.userData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

