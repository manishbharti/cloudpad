import React, {Component} from "react";
import LoginComponent from "./LoginComponent";
import NavbarComponent from "./NavbarComponent";
import NotesComponent from "./NotesComponent";
import {Col} from "react-bootstrap";
import {UserData} from "../App";
import SignUpComponent from "./SignUpComponent";

class AppComponent extends Component {

    constructor() {
        super();
        this.state = {
            showLoginForm: true,
            showSignUpForm: false
        }
    }

    render() {
        let loginForm = this.state.showLoginForm ? <LoginComponent updateUser={this._updateUser.bind(this)}
                                                                   showSignUpForm={this._toggleLoginAndSignUpShowState.bind(this)}/> : null;
        let signUpForm = this.state.showSignUpForm ?
            <SignUpComponent showLoginForm={this._toggleLoginAndSignUpShowState.bind(this)}/> : null;

        return (
            <div>
                <NavbarComponent ref="navbar"/>
                <Col xs={12}>
                    {loginForm}
                    {signUpForm}
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

    _toggleLoginAndSignUpShowState() {
        this.setState({showLoginForm: !this.state.showLoginForm, showSignUpForm: !this.state.showSignUpForm});
    }
}

export default AppComponent;
