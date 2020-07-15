import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import Goals from './Goals';
import Progress from './Progress';
import Updates from './Updates';

class MainPage extends Component {
  constructor(props) {
    super(props)
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

export default MainPage;

