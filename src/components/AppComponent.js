import React, {Component} from "react";
import LoginComponent from "./LoginComponent";
import NavbarComponent from "./NavbarComponent";
import NotesComponent from "./NotesComponent";
import {Col} from "react-bootstrap";
import {UserData} from "../App";

class AppComponent extends Component {

    constructor() {
        super();
        this.state = {
            showLoginForm: true
        }
    }

    render() {
        return (
            <div>
                <NavbarComponent ref="navbar"/>
                <Col xs={12}>
                    {this.state.showLoginForm ? <LoginComponent updateUser={this._updateUser.bind(this)}/> : null}
                    <NotesComponent ref="noteList"/>
                </Col>
            </div>
        );
    }

    _updateUser(user) {
        UserData.setUserData(user);
        this.setState({showLoginForm: !UserData.isLoggedin()});
        this.refs.navbar._updateNavbar(UserData.user.username);
        this.refs.noteList._getNotes();
    }
}

export default AppComponent;
