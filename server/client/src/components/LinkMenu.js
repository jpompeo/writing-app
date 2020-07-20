import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LinkMenu.css'

class LinkMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul id="link-menu-list">

                <Link to="/me/addbook">
                    <li>Create a Book</li>
                </Link>
                <Link to="/me/addchapter">
                    <li>Add a Chapter</li>
                </Link>
                <Link to="/me/addupdate">
                    <li>Track Updates</li>
                </Link>
                
            </ul>
        )
    }
}

export default LinkMenu;