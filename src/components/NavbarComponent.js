import React, {Component} from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavbarComponent extends Component {

    constructor() {
        super();
        this.state = {username: null}
    }

    render() {

        let banner = null;
        if (this.state.username) {
            banner = <Nav pullRight>
                <NavItem eventKey={1} href="#">{this.state.username}</NavItem>
                <NavItem eventKey={1} href="#" onClick={() => location.reload()}>Logout</NavItem>
            </Nav>;
        }

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Cloud Pad</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {banner}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    _updateNavbar(username) {
        this.setState({username: username});
    }
}

export default NavbarComponent;
