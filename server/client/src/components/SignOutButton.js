// import React, { Component } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { connect } from 'react-redux';
// import { bindActionCreators } from "redux";
// import { Route, Switch } from 'react-router-dom';
// import { Container, Col, Row, Button } from 'react-bootstrap';
// // import { logoutUser } from '../actions';
// import SignInButton from './SignInButton'
// import '../styles/Nav.css';
// import '../styles/Login.css';

// class SignOutButton extends Component {
//     constructor(props) {
//       super(props)
  
//       // this.state = {
//       //   showLogin: false,
//       // }
  
//       // this.handleSignOutClick = this.handleSignOutClick.bind(this);
//       // this.renderLogin = this.renderLogin.bind(this);
//       // this.handleLogoutClick = this.handleLogout.bind(this);
//       // this.toggleLogin = this.toggleLogin.bind(this);
//       // this.renderLogin = this.renderLoginButtons.bind(this);
//       this.handleLogout = this.handleLogout.bind(this);
//     }
  
//     handleLogout(event) {
//       logoutUser();
//       this.props.history.push('/');
//       // this.toggleLogin(event);
//   }
  
//      render() {
//          if (this.props.auth.authenticated) {
//             return (
//                 <Container >
//                 <Row>
//                   <Col>
//                     <p className="text-muted signed-in">
//                       {/* Signed in as {this.props.auth.username} */}
//                     </p>
//                   </Col>
//                   <Col>
//                   <div className="logout-button-container">
//                     <Link to="/">
//                       <Button size="sm"
//                         className="mb-2 logout-button"
//                         type="submit"
//                         onClick={event => { this.handleLogout(event) }}>
//                         Sign Out
//                       </Button>
//                     </Link>
//                     </div>
//                   </Col>
//                 </Row>
//               </Container>
              
//             )
//          } else {
// return (
//     <SignInButton />
// )
//          }
       
//        }
//   }


//   function mapStateToProps(state) {
//     return {
//       auth: state.auth,
//       loggedIn: state.loggedIn
//     };
//   }
  
//   function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { logoutUser },
//         dispatch
//     );
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton);
  