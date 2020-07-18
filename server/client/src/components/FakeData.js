import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { generateFakeData } from '../actions'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class FakeData extends Component {
    constructor(props) {
super(props)
        this.state = {
            username: ''
        }
    }

    render() {
        
        
        



        return (
            <Form inline>
                <Form.Group >

            <Form.Control
            style={{margin: 20}}
            value={this.state.username}
            onChange={event => this.setState({username: event.target.value})}
            />
            </Form.Group>
            <Button variant="info"
            style={{margin: 20}}
            onClick={event => { 
                event.preventDefault(); 
                const userUrl = `/generate-fake-user/${this.state.username}`;
                this.props.generateFakeData(userUrl)}}
            >Generate Fake User</Button>
            <Button variant="warning"
            style={{margin: 20}}
            onClick={event => { 
                event.preventDefault(); 
                const bookUrl = `/generate-fake-books/${this.state.username}`;
                this.props.generateFakeData(bookUrl)}}
            >Generate Fake Books</Button>
            <Button variant="secondary"
            style={{margin: 20}}
            onClick={event => { 
                event.preventDefault(); 
                const updateUrl = `/generate-fake-updates/${this.state.username}`;
                this.props.generateFakeData(updateUrl)}}
            >Generate Fake Updates</Button>
            </Form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { generateFakeData },
        dispatch
    );
  }

export default connect(null, mapDispatchToProps)(FakeData);


