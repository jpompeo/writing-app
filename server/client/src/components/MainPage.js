import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row } from 'react-bootstrap';
import Progress from './Progress';
import Updates from './Updates';
import { getUserData } from '../actions'
import '../styles/MainPage.css'
import CurrentStats from './CurrentStats';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.renderCurrentStats = this.renderCurrentStats.bind(this);
  }

  componentDidMount() {
  this.props.getUserData(this.props.currentUser)
  
}

//Comparisons - actual, average, goal
renderCurrentStats() {
  let currentBook = this.props.currentBook;
  let updates = this.props.updates;

  if (currentBook.title) {
      return (
          <CurrentStats />
      )
  }
}



  render() {

    return (
      <Container id="main-page-container" fluid>
        <Row >

      {/* Updates */}
          <Col md={5} >

            <h2 className="main-page-header">{this.props.currentBook.title ? `"${this.props.currentBook.title}"` : 'Updates'}</h2>
        <Updates />

          </Col>

          
          <Col md={7} >
   
{/* Current Stats  */}
<Row>
            <Col >
            <h2 className="main-page-header">Overview</h2>
          <CurrentStats /> 
            </Col>
          </Row>

{/* Progress */}
          <Row>
            <Col>
            <h2 className="main-page-header">Performance Graphs</h2>
          <Progress />
            </Col>
          </Row>

          </Col>
            

        </Row>
        </Container>
        
    );
  }
}

function mapStateToProps(state) {
  return {
   userData: state.userData,
   currentUser: state.currentUser,
   currentBook: state.currentBook
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { getUserData },
        dispatch
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);




