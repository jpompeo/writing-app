import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { loginUser, registerUser, logoutUser } from '../../actions';
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
        this.renderLoginNav = this.renderLoginNav.bind(this);
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
    }

    handleSignOutClick() {
        logoutUser();
        // this.props.history.push('/');
    };

    componentDidUpdate(prevProps) {
        // if(this.props.authenticated !== this.prevProps.authenticated) {

        // }
        console.log("LOGIN UPDATED")
        
    }

    handleLogin(event) {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        loginUser(userInfo)
        // this.props.history.push('/me');
    }

    handleRegister(event) {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        registerUser(userInfo)
    }

    renderLoginNav() {
        if (this.props.authenticated) {
            return (
                <React.Fragment>
                    <span>Signed in as {this.props.username} </span>
                    <Link to="/"><Button size="sm"
                        className="mb-2"
                        variant="outline-danger"
                        type="submit"
                        onClick={event => { this.handleSignOutClick(event) }}>
                        Sign Out
                </Button>
                </Link>
                </React.Fragment>
            )
        } else {
            return (
                <Form inline>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control size="sm"
                            className="mb-2 mr-sm-2"
                            type="text"
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={event => { this.setState({ username: event.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control size="sm"
                            className="mb-2 mr-sm-2"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={event => { this.setState({ password: event.target.value }) }}
                        />
                    </Form.Group>
                    <Button size="sm"
                        className="mb-2"
                        variant="outline-secondary"
                        type="submit"
                        onClick={event => { this.handleLogin(event) }}>
                        Sign In
                </Button>
                    <div className="button-break"> or </div>
                    <Button size="sm"
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

            )
        }
    }

    render() {
        return (
            <Col className="login-section">
              {/* <Container>
                <Row> */}
                  {this.renderLoginNav()}
                {/* </Row>
              </Container> */}
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage,
        authenticated: state.auth.authenticated,
        username: state.auth.username
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { loginUser, registerUser },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);