import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import '../styles/Updates.css'

class Updates extends Component {
    render() {
        return (
            <Container id="update-container" fluid>
                <Row>
                    <Col>
                        <h2>Updates</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Updates;