import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Col, Form, Container, Row, Navbar } from 'react-bootstrap';
import '../styles/Nav.css'
import { setCurrentBook } from '../actions'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBook: ''
        }

        this.renderBooks = this.renderBooks.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
    }

    handleBookChange(event) {
        //set current book value
        this.setState({ selectedBook: event.target.value });

        //find book object
        let currentBook = this.props.books.find(book => {
            return book.title = this.state.selectedBook
        })

        //reset current book in store
        this.props.setCurrentBook(currentBook);
    }

    renderBooks() {
        console.log("story map props", this.props)
        if (this.props.books) {
            console.log(this.props)
            return this.props.books.map(book => {
                return (
                    <option key={book._id}>{book.title}</option>
                )
            });
        }
    }

    render() {
        return (
            <div id="header-nav">
                <Container>

                    <Row>
                        <Col lg={4} id="logo-container" className="my-auto">

                            <div id="header-logo">

                                <h1>Write Track</h1>
                            </div>
                        </Col>

                        <Col id="nav-links">
                            <div id="select-book-container">

                                <Form id="choose-book-form" inline >
                                    <Form.Group>
                                        {/* <Form.Label></Form.Label> */}
                                        <Form.Control
                                            as="select"
                                            defaultValue=""
                                            value={this.state.selectedBook}
                                            onChange={event => {
                                                this.handleBookChange(event)

                                            }}>
                                            <option value="">Select Book...</option>
                                            {this.renderBooks()}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.userData.books
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { setCurrentBook },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

