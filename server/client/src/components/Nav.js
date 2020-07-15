import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/Nav.css'
import { logoutUser } from '../actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Login from './auth/Login'


class Nav extends Component {
  constructor(props) {
    super(props)

    // this.handleSignOutClick = this.handleSignOutClick.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
  }

  // handleSignOutClick() {
  //   logoutUser();
  // };

  componentDidUpdate() {
    console.log("NAV UPDATED")
  }

  // const renderLinks = () => {
  //   console.log("IS AUTHENTICATED", authenticated)
  //   if (authenticated) {
  //     return (
  //       <React.Fragment>
  //         <p>Signed in as {username} </p>
  //           <Button onClick={handleSignOutClick}>Sign Out</Button>
  //       </React.Fragment>
  //     );
  //   } else {
  //     return (
  //       <React.Fragment>
  //         <Link to="/signin">
  //           <Button className="mr-2" variant="secondary">
  //         Sign In
  //         </Button>
  //         </Link>
  //         <Link to="/signup">
  //         <Button variant="secondary">
  //           Register
  //         </Button></Link>
  //       </React.Fragment>
  //     );
  //   }
  // }

  // renderLogin() {
  //   if (this.props.authenticated) {
  //     return (
  //       <React.Fragment>
  //         <p>Signed in as {this.props.username} </p>
  //         <Button onClick={this.handleSignOutClick}>Sign Out</Button>
  //       </React.Fragment>
  //     )
  //   } else {
  //     return (
  //       <Login />

  //     )
  //   }
  // }


  render() {
    return (
      <header>
        <Container id="header-nav">
          <Row>
            <Col>

            {/* app header  */}
              <Link to="/"><h1>Writing App</h1></Link>
              
            </Col>
            <Col className="login-section">
              <Container>
                <Row>

                  {/* login component */}
                  <Login />

                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
};

function mapStateToProps(state) {
  console.log("STATE", state)
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
}

export default connect(mapStateToProps, null)(Nav);
