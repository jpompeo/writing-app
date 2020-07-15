import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/Goals.css';

class Goals extends Component {
    render() {
        return (
            <Container id="goal-container" fluid>
                <Row>
                    <Col>
                <h2>Goals</h2>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Goals;