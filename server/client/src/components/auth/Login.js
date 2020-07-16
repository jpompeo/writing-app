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
        this.handleSignOutClick = this.handleLogout.bind(this);
    }

    handleLogout() {
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
        this.props.history.push('/me');
    }

    handleRegister(event) {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        registerUser(userInfo)
        this.props.history.push('/me');
    }

    renderLoginNav() {
        // if (this.props.auth.authenticated) {
            console.log("AUTHENTICATED", this.props.auth)
            // return (

                // <Container >
                //     <Row>
                //         <Col>
                //             <p className="text-muted signed-in">

                //                 Signed in as {this.props.auth.username}
                //             </p>
                //         </Col>
                //         <Col>
                //             <Link to="/">
                //                 <Button size="sm"
                //                 className="mb-2 logout-button"
                //                 type="submit"
                //                 onClick={event => { this.handleLogout(event) }}>
                //                 Sign Out
                //                 </Button>
                //             </Link>
                //         </Col>
                //     </Row>
                // </Container>
            // )
        // } else {
            return (
                <Form>
                    <Form.Row>
                        <Col>
                            {/* <Form.Group controlId="formBasicUsername"> */}
                            <Form.Control size="sm"
                                className="mb-2 mr-sm-2 login-input"
                                type="text"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={event => { this.setState({ username: event.target.value }) }}
                            />
                            {/* </Form.Group> */}

                            {/* <Form.Group controlId="formBasicPassword"> */}
                            <Form.Control size="sm"
                                className="mb-2 mr-sm-2 login-input"
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={event => { this.setState({ password: event.target.value }) }}
                            />
                            {/* </Form.Group> */}
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        {/* <Col >
                        </Col> */}
                        <Col className="login-buttons">
                            <Button size="sm"
                                className="mb-2 register-button"
                                variant="outline-danger"
                                type="submit"
                                onClick={event => { this.handleSignup(event) }}>
                                Register
                            </Button>

                            <Button size="sm"
                                className="mb-2 login-button"
                                variant="outline-secondary"
                                type="submit"
                                onClick={event => { this.handleLogin(event) }}>
                                Sign In
                            </Button>
                        </Col>
                    </Form.Row>
                        {this.props.auth.errorMessage ? (
                    <Form.Text className="text-muted">
                        {this.props.auth.errorMessage}
                    </Form.Text>
                        ) : ''}
                </Form>
            )
        // }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="login-section">
                        {this.renderLoginNav()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { loginUser, registerUser },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);