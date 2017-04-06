import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {UserData} from "../App";

class NavbarComponent extends Component {

    constructor() {
        super();
        this.state = {username: null}
    }

    render() {
        let nav = null;
        if (this.state.username) {
            nav = <ul className="nav navbar-nav navbar-right">
                <li><a href="#">{this.state.username}</a></li>
                <li><Link to="/" onClick={() => this._logout()}>Logout</Link></li>
            </ul>;
        }

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Cloud Pad</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {nav}
            </Navbar>
        );
    }

    _updateNavbar(username) {
        this.setState({username: username});
    }

    _logout() {
        UserData.removeUserData();
        this.props.showLoginFrom();
    }
}

export default NavbarComponent;
