import React, { Component } from "react";
import {  Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


class SignInButton extends Component {
    render() {
      return (

  <div id="toggle-login-button">
  <Link to="/login">
    <Button size="sm"
    className="mb-2 login-button"
    variant="outline-secondary"
    type="submit">
    Sign In
  </Button>
  </Link>
  </div>
   )
      }
  }

  export default SignInButton;