import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { Col, Form, Container, Row, Button } from 'react-bootstrap';
import '../styles/Nav.css'
import { setCurrentBook, getUserData } from '../actions'
import Popup from "reactjs-popup";
import LinkMenu from './LinkMenu'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBook: ''
        }

        this.renderBooks = this.renderBooks.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
    }

    componentDidMount() {
        this.props.getUserData('bestselling_author1')

    }

    handleBookChange(event) {
        // event.preventDefault();
        // console.log("Book selected:", event.target.value)
        // //set current book value
        // this.setState({ selectedBook: event.target.value }, () => {
        //     console.log("Nav state set book to:", this.state.selectedBook)
        // });
        console.log("Book selected in nav state", this.state.selectedBook)
        //find book object
        let currentBook = this.props.books.find(book => {
            console.log("Books being iterated in handleBookChange", book)
            return book.title == this.state.selectedBook;
        })

        console.log("Book object found, to be set to current book:", currentBook)

        //reset current book in store
        this.props.setCurrentBook(currentBook);

        setTimeout(console.log("Updated nav props after book sent", this.props), 3000)
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
                <Container id="container-in-header">

                    <Row>
                        <Col lg={4} id="logo-container" className="my-auto">

                            <div id="header-logo">
                                <Link to="/me">
                                    <h1> Write Track </h1>
                                </Link>
                            </div>
                        </Col>

                        <Col lg={8} id="nav-links">
                            <div id="select-book-container">
                                <h4 id="select-book-header">Select a book to start tracking!</h4>

                                <div id="choose-book-form-container">
                                    <Form id="choose-book-form" >

                                        <Form.Group>
                                            {/* <Form.Label></Form.Label> */}
                                            <Form.Control
                                                as="select"
                                                id="choose-book-select"
                                                value={this.props.selectedBook}
                                                onChange={event => {

                                                    this.setState({ selectedBook: event.target.value }, () => {
                                                        this.handleBookChange(event)
                                                    })
                                                }}>
                                                <option value="">Choose Book...</option>
                                                {this.renderBooks()}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>

                                <div id="new-book-link-container">
                                    <Popup 
                                        id="link-menu-popup"
                                        trigger={
                                            <span id="new-book-link">

                                            [+]

                                            </span>
                                        } 
                                        position="left center">
                                        <LinkMenu />
                                    </Popup>
                                </div>

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
        { setCurrentBook, getUserData },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

