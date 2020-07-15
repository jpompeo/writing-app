import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/Progress.css'

class Progress extends Component {
    render() {
        return (
            <Container id="progress-container" fluid>
                <Row>
                    <Col>
                <h2>Progress</h2>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Progress;