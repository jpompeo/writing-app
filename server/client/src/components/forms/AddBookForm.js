import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom'
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/AddBookForm.css'
import { addBook } from '../../actions'

class AddBookForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '5f0fb6ea99e55b48642fb54a',
            title: '',
            description: '',
            expectedLength: 0,
            deadline: '',
        }
        this.sendBook = this.sendBook.bind(this);
    }

    sendBook(event) {
        event.preventDefault();

        // get book info 
        const title = this.state.title;
        const description = this.state.description;
        const expectedLength = this.state.expectedLength;
        const deadline = this.state.deadline;

        // check if all fields were completed 
        if (title && description && expectedLength && deadline) {

            const bookInfo = {
                userId: this.props.userId,
                title,
                description,
                expectedLength,
                deadline,
            }

            addBook(bookInfo)
            this.props.history.push('/me')
        } else {
            alert("All fields must be completed")
        }

    }

    render() {
        return (
            <Form id="add-book-form" onSubmit={event => { event.preventDefault() }}>
                {/* <h1>Add a new book</h1> */}
                <Form.Group >
                    <Form.Label>What is the name of your book?</Form.Label>
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
                        <option>10000</option>
                        <option>20000</option>
                        <option>30000</option>
                        <option>40000</option>
                        <option>50000</option>
                        <option>60000</option>
                        <option>70000</option>
                        <option>80000</option>
                        <option>90000</option>
                        <option>100000</option>
                        <option>110000</option>
                        <option>120000</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label className="date-label">When do you plan to finish?  </Form.Label>
                    <DatePicker
                        classname="deadline-date"
                        selected={this.state.deadline}
                        onChange={date => { this.setState({ deadline: date }) }}
                    />
                </Form.Group>

                <Form.Group className="form-button-container">
                        <Button
                            id="add-book-button"
                            onClick={this.sendBook}
                        >
                            Save
                        </Button>
                </Form.Group>
            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.userId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { addBook },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookForm);
