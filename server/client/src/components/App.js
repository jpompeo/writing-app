import React from 'react';
import { withRouter } from "react-router-dom";
import * as actions from '../actions';
import { connect } from "react-redux";
import styled from "styled-components";
import { Container, Row, Col } from 'react-bootstrap'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <AppContainer>
        {this.props.children}
      </AppContainer>
    )
  }
}

export default withRouter(connect(
  null,
  actions
)(App));

const AppContainer = styled.div`
  padding-top: 90px;
`;
