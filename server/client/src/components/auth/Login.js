import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Form, Button } from 'react-bootstrap';
import { loginUser, registerUser } from '../../actions';
import '../../styles/Login.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        loginUser(userInfo)
    }

    handleRegister(event) {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        registerUser(userInfo)
    }


    render() {
        return (
            <Form inline>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control 
                        className="mb-2 mr-sm-2" 
                        type="text" 
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={event => {this.setState({username: event.target.value})}} 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control 
                        className="mb-2 mr-sm-2" 
                        type="password" 
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={event => {this.setState({password: event.target.value})}} 
                    />
                </Form.Group>
                <Button
                    className="mb-2"
                    variant="outline-secondary"
                    type="submit"
                    onClick={event => { this.handleLogin(event) }}>
                    Sign In
                </Button>
                <div className="button-break"> or </div>
                <Button
                    className="mb-2"
                    variant="outline-danger"
                    type="submit"
                    onClick={event => { this.handleSignup(event) }}>
                    Register
                </Button>
                <Form.Text className="text-muted">
                    {this.props.errorMessage}
                </Form.Text>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { loginUser, registerUser },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);