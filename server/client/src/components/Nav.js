import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/Nav.css'
import { logoutUser } from '../actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Login from './auth/Login'
import FeatherPen from '../assets/feather_pen.jpg'


class Nav extends Component {
  constructor(props) {
    super(props)

    // this.handleSignOutClick = this.handleSignOutClick.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
    // this.handleLogoutClick = this.handleLogout.bind(this);
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

//   handleLogout() {
//     logoutUser();
//     // this.props.history.push('/');
// };

  // renderLoginNav() {
  //   if (this.props.authenticated) {
  //     return (
  //       <React.Fragment>
  //                   <span>Signed in as {this.props.username} </span>
  //                   <Link to="/"><Button size="sm"
  //                       className="mb-2"
  //                       variant="outline-danger"
  //                       type="submit"
  //                       onClick={event => { this.handleLogout(event) }}>
  //                       Sign Out
  //               </Button>
  //               </Link>
  //               </React.Fragment>
  //     )
  //   } else {
  //     return (
  //       <React.Fragment>
  //         <Link to="/login">
  //           <Button size="sm"
  //             className="mb-2"
  //             variant="outline-secondary"
  //             type="text">
  //             Sign In
  //           </Button>
  //         </Link>

  //         <div className="button-break"> or </div>

  //         <Link to="/login">
  //           <Button size="sm"
  //             className="mb-2"
  //             variant="outline-danger"
  //             type="text">
  //             Register
  //           </Button>
  //         </Link>
  //       </React.Fragment>
  //     )
  //   }
  // }

  render() {
    return (
      <header>
        <Container id="header-nav">
          <Row>
            <Col md={8}>

              {/* app header  */}
              <div id="app-logo">

              <Link to="/">
                <h1>Write Time</h1>
              </Link>
              </div>

            </Col>
            

            <Col md={4} className="login-section">
                  {/* login/logout buttons */}
                  <Login />

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
