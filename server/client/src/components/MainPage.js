import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';

class MainPage extends Component {  
  constructor(props) {
    super(props)

    this.renderUserView = this.renderUserView.bind(this);
  }

  renderUserView() {
    // if ()
  }

  render() {
    
    return (
      <Container>
          <Row>
              <Col>
              <h1>Public Main Page</h1>
              </Col>
          </Row>
      </Container>
    );
  }
}

export default MainPage;

