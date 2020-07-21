import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Container, Col, Row, Form } from 'react-bootstrap';
import '../styles/StoryMap.css';
import _ from 'lodash';
import moment from 'moment';
import { getUserData } from '../actions'

class StoryMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBookTitle: ''
    }


    this.renderBooks = this.renderBooks.bind(this);
    this.renderChapters = this.renderChapters.bind(this);
  }

  componentDidMount() {
    this.props.getUserData(this.props.currentUser)
  }

  componentDidUpdate() {
    console.log("STORY MAP UPDATED", this.state)
  }

 

  renderChapters() {

    if (this.state.currentBookTitle) {
      //find book
      const selectedBook = this.props.userData.books.find(book => {
        return book.title === this.state.currentBookTitle;
      })

      return _.sortBy(selectedBook.chapters, (chapter => { return chapter.number })).map(chapter => {
        let deadline = moment(chapter.deadline).format("MM/DD/YYYY");
        let completedStatus = chapter.completed ? "Completed" : "In progress";
        return (
          <Col md={3}>
            <p className="chapter-number">Chapter {chapter.number}</p>
            <h3 className="chapter-title">"{chapter.title}"</h3>
            <p className="chapter-description">Summary: {chapter.description}</p>
            <p className="chapter-length">Expected length: {chapter.expectedLength} words</p>
            <p className="chapter-deadline">Target date: {deadline}</p>
            <p className="chapter-completed">Status: {completedStatus}</p>
          </Col>
        )
      })
    } else {
      return (
        <Col id="storymap-default-view">
          <p>no book selected</p>
        </Col>
      )
    }

  }

  render() {

    return (
      <Container id="storymap-container" fluid>
        <Row>
          <Col>
            <div id="no-book">
              <p >Select a book to start mapping! Don't have any books yet? <Link to="/me/addbook">Add one here!</Link></p>
            </div>
            <hr />

          </Col>
        </Row>
        <Row>
          {this.renderChapters()}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
    currentBook: state.currentBook,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { getUserData },
        dispatch
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(StoryMap);




