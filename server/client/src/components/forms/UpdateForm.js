import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/UpdateForm.css'
import { sendUpdate } from '../../actions'

class UpdateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chapterNumber: '',
            progress: 0,
            completed: false,
            date: ''
        }

        this.renderUpdateForm = this.renderUpdateForm.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);
        this.renderChapterNumbers = this.renderChapterNumbers.bind(this);
    }

    saveUpdate(event) {
        event.preventDefault();

        if (this.state.progress && this.state.chapterNumber) {

       
        const selectedChapter = this.props.currentBook.chapters.find(chapter => {
            return chapter.number == this.state.chapterNumber;
        })

        console.log("STATE CHAPTER NUMBER", this.state.chapterNumber)

        console.log("SELECTED CHAPTER", selectedChapter)
        console.log("CURRENT BOOK", this.props.currentBook)
        const chapterTitle = selectedChapter.title;
        const expectedLength = selectedChapter.expectedLength;

        const updateInfo = {
            username: this.props.username,
            update: {
                bookTitle: this.props.currentBook.title,
                progress: this.state.progress,
                expectedLength: this.props.currentBook.expectedLength,
                date: this.state.date || new Date(),
                chapterUpdates: [{
                    bookTitle: this.props.currentBook.title,
                    chapterNumber: this.state.chapterNumber,
                    progress: this.state.progress,
                    completed: this.state.completed,
                    chapterTitle: chapterTitle,
                    expectedLength: expectedLength
                }]
            }  
        }
        this.props.sendUpdate(updateInfo, () => {
            this.props.history.push('/me')
        });
    } else {
        alert("All required fields must be completed")
    }
    }

    renderChapterNumbers() {
        if (this.props.currentBook.title) {
            return this.props.currentBook.chapters.map(chapter => {
                return (
                    <option value={chapter.number}>Chapter {chapter.number}: {chapter.title}</option>
                    )
                })
            }
    }

    renderUpdateForm() {
        const currentBookTitle = this.props.currentBook.title;
        if (currentBookTitle) {
            return (

                <React.Fragment>
                
                <h3 className="form-header">Track Updates for "{currentBookTitle}"</h3>
                
                <Form.Group >
                    <Form.Label>How much did you write today?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter word count"
                            value={this.state.progress}
                            onChange={event => {
                                this.setState({ progress: event.target.value });
                            }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Which chapter were you working on?</Form.Label>
                    <Form.Control
                            as="select"
                            value={this.state.chapterNumber}
                            onChange={event => {
                                this.setState({ chapterNumber: event.target.value });
                            }}>
                            <option value="">Chapter...</option>
                            {this.renderChapterNumbers()}
                        </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Have you completed it?</Form.Label>
                    <Form.Control
                            as="select"
                            value={this.state.completed}
                            onChange={event => {
                                this.setState({ completed: event.target.value });
                            }}>
                            <option value="false">In Progress</option>
                            <option value="true">Complete</option>
                        </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label className="date-label">Select date to track</Form.Label>
                    <DatePicker
                        classname="start-date"
                        selected={this.state.date}
                        onChange={date => { this.setState({ date: date }) }}
                    /><span className="optional-info">optional - default today</span>
                </Form.Group>

                <Form.Group className="form-button-container">
                <Button 
                    id="add-update-button"
                    onClick={event => {this.saveUpdate(event)}}
                >
                    Save
                </Button>
                </Form.Group>
                </React.Fragment>
        )
        } else {
            return (
                <h3 className="form-header">Select a book to start tracking!</h3>
            )
        }
    }

    render() {
        return (
            <Form id="update-form" onSubmit={event => { event.preventDefault()}}>

                {this.renderUpdateForm()}
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.userData.username,
        currentBook: state.currentBook
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return bindActionCreators(
          { sendUpdate },
          dispatch
      );
    }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
  
  