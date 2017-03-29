import React, {Component} from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

class NavbarComponent extends Component {

    constructor() {
        super();
        this.state = {username: null}
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Cloud Pad</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">{this.state.username}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    _updateNavbar(username) {
        this.setState({username: username});
    }
}

export default NavbarComponent;
