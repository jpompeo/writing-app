import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import Goals from './Goals';
import Progress from './Progress';
import Updates from './Updates';
import { getUserData } from '../actions'

class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserData(this.props.userId)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  this.props)
}

  render() {

    return (
      <Container fluid>
        <Row>
          {/* Goals  */}
          <Col md={6}>
            <Goals />
          </Col>

          {/* Progress */}
          <Col md={6}>
            <Progress />
          </Col>
        </Row>

        {/* Updates */}
        <Row>
          <Col>
            <Updates />
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
   user: state.userData,
   userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { getUserData },
        dispatch
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);




