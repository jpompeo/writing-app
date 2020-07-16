import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Route, Switch } from 'react-router-dom';
import '../styles/Nav.css';
import { logoutUser } from '../actions';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Login from './auth/Login'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'







class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLogin: false,
    }

    // this.handleSignOutClick = this.handleSignOutClick.bind(this);
    // this.renderLogin = this.renderLogin.bind(this);
    // this.handleLogoutClick = this.handleLogout.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.renderLogin = this.renderLoginButtons.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // handleSignOutClick() {
  //   logoutUser();
  // };

  componentDidUpdate() {
    console.log("NAV UPDATED")
    console.log("UPDATED AUTH", this.props.auth)
  }

  toggleLogin(event) {
    event.preventDefault();
    if (this.props.loggedIn) {
      this.setState({ showLogin: false })
    } else {
      this.setState({ showLogin: true })
    }
  }

  handleLogout(event) {
    logoutUser();
    this.props.history.push('/');
    this.toggleLogin(event);
};

  renderLoginButtons() {
    if (this.props.loggedIn) {
      return (
      <Container >
        <Row>
          <Col>
            <p className="text-muted signed-in">
              Signed in as {this.props.auth.username}
            </p>
          </Col>
          <Col>
            <Link to="/">
              <Button size="sm"
                className="mb-2 logout-button"
                type="submit"
                onClick={event => { this.handleLogout(event) }}>
                Sign Out
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      )
    } else {
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
                  <h1>Write Track</h1>
                </Link>
              </div>

            </Col>
            <Col md={4} className="login-section">
              {/* {this.renderLoginButtons()} */}
              <Switch>
                <Route exact path="/" component={SignInButton} />
                <Route path="/me" component={SignOutButton} />
              </Switch>
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
    auth: state.auth,
    loggedIn: state.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      { logoutUser },
      dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
