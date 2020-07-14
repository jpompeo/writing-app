import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/Nav.css'
import * as actions from '../actions';
import { Navbar, Container, Col, Row, Button, NavDropdown, Form, FormControl, ButtonGroup } from 'react-bootstrap';

const Nav = ({ authenticated, username, signout }) => {
  const handleSignOutClick = () => {
    signout();
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <React.Fragment>
          <p>Signed in as {username} </p>
            <Button onClick={handleSignOutClick}>Sign Out</Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/signin">
            <Button className="mr-2" variant="secondary">
          Sign In
          </Button>
          </Link>
          <Link to="/signup">
          <Button variant="secondary">
            Register
          </Button></Link>
        </React.Fragment>
      );
    }
  }


  return (
    <Container>
      <Row>
        <Col md={8}>
        <Link to="/">Writing App</Link>
        </Col>

          <Col md={4}>
          {renderLinks()}
          </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
}

export default connect(mapStateToProps, actions)(Nav);
