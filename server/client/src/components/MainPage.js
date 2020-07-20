import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import Goals from './Goals';
import Progress from './Progress';
import Updates from './Updates';
import { getUserData } from '../actions'
import '../styles/MainPage.css'

class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  this.props.getUserData('bestselling_author1')
  
}



  render() {

    return (
      <Container id="main-page-container" fluid>

        {/* Progress */}
        {/* <Row>
          <Col> */}
          {/* </Col>
        </Row> */}
      
        <Row>
          {/* Goals  */}
          <Col md={5}>
        
        <Updates />

            {/* <Goals /> */}
          </Col>

          {/* Updates */}
          <Col md={7}>
          <Progress />
          </Col>
        </Row>

        </Container>
        
    );
  }
}

function mapStateToProps(state) {
  return {
   user: state.userData
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { getUserData },
        dispatch
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);




