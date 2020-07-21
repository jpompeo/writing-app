import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/FakeLoginForm.css'
import { setFakeUser } from '../../actions'

class FakeLoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }
        this.sendFakeUser = this.sendFakeUser.bind(this);
    }

    sendFakeUser(event) {
        event.preventDefault();

        // get user info 
        const username = this.state.username;
        const password = this.state.password;

        // check if all fields were completed 
        if (username && password) {
            this.props.setFakeUser(username, () => {
                    console.log("FAKE USER CALLBACK", username, this.props.history)
                    this.props.history.push('/me')
            })
        } else {
            alert("All fields must be completed")
        }

    }

    render() {
        return (
            <Form id="fake-login-form" onSubmit={event => { event.preventDefault() }}>
                <h3 className="form-header">Sign In</h3>

                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        value={this.state.username}
                        onChange={event => {
                            this.setState({ username: event.target.value });
                        }} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={event => {
                            this.setState({ password: event.target.value });
                        }} />
                </Form.Group>

                <Form.Group className="form-button-container">
                        <Button
                            id="login-user-button"
                            onClick={event => {this.sendFakeUser(event)}}
                        >
                            Sign In
                        </Button>
                </Form.Group>
            </Form>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         username: state.userData.username,
//         currentBook: state.currentBook
//     };
// }

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { setFakeUser },
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(FakeLoginForm);
