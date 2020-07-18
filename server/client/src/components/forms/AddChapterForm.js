import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/AddChapterForm.css'

class AddChapterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            bookId: '',
            title: '',
            description: '',
            expectedLength: 0,
            progress: 0,
            deadline: ''
        }
        this.renderChapterNumbers = this.renderChapterNumbers.bind(this);
    }

    renderChapterNumbers() {
        let chapterNumbers = []
        for (let chapterNumber = 1; chapterNumber < 101; chapterNumber++) {
            chapterNumbers.push(chapterNumber)
        }

        return chapterNumbers.map(chapter => {
            return (
                <option>{chapter}</option>
            )
        })
    }

    render() {
        return (
            <Form id="add-chapter-form" onSubmit={event => { event.preventDefault()}}>
                <h3 className="form-header">
                    {this.props.currentBook.title ? `Add chapter to ${this.props.currentBook.title}` : "Select a book to add a new chapter" }</h3>
                <Form.Group>
                    <Form.Label>What number chapter is it?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Chapter..."
                            value={this.state.expectedLength}
                            onChange={event => {
                                this.setState({ expectedLength: event.target.value });
                            }}>
                            <option value="">Chapter...</option>
                            {this.renderChapterNumbers()}
                        </Form.Control>
                </Form.Group>
                <Form.Group >
                    <Form.Label>What is the name of your chapter?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={event => {
                                this.setState({ title: event.target.value });
                            }} />
                </Form.Group>
                

                <Form.Group>
                    <Form.Label>What is it about?</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Summary"
                            value={this.state.description}
                            onChange={event => {
                                this.setState({ description: event.target.value });
                            }} />
                </Form.Group>


                <Form.Group>
                    <Form.Label>How long do you plan for it to be?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Word Count"
                            value={this.state.expectedLength}
                            onChange={event => {
                                this.setState({ expectedLength: event.target.value });
                            }}>
                            <option value="">Word Count...</option>
                            <option>100</option>
                            <option>500</option>
                            <option>1000</option>
                            <option>1500</option>
                            <option>2000</option>
                            <option>2500</option>
                            <option>3000</option>
                            <option>3500</option>
                            <option>4000</option>
                            <option>4500</option>
                            <option>5000</option>
                            <option>5500</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="date-label">When do you plan to finish?  </Form.Label>
                <DatePicker
                    classname="deadline-date"
                    selected={this.state.deadline}
                    onChange={date => {this.setState({deadline: date})}}
                />
                </Form.Group>
                <Form.Group className="form-button-container">

                <Button id="add-chapter-button">
                    Save
                </Button>
                </Form.Group>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
     currentBook: state.currentBook
    };
  }
  
//   function mapDispatchToProps(dispatch) {
//       return bindActionCreators(
//           { getUserData },
//           dispatch
//       );
//     }
  
  export default connect(mapStateToProps, null)(AddChapterForm);