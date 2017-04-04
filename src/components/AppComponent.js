import React, {Component} from "react";
import LoginComponent from "./LoginComponent";
import NavbarComponent from "./NavbarComponent";
import NotesComponent from "./NotesComponent";
import {UserData} from "../App";
import SignUpComponent from "./SignUpComponent";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {Col} from "react-bootstrap";

class AppComponent extends Component {

    constructor() {
        super();
        this.state = {
            showLoginForm: true,
            showSignUpForm: false
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <NavbarComponent ref="navbar"/>
                    <Col xs={12}>
                        {this._loginForm()}
                        {this._singUpForm()}
                        <Route exact path="/"/>
                        <Route exact path="/" render={() => (
                            UserData.isLoggedin() ? <Redirect to="/notepads"/> : null)}/>
                    </Col>

                    <Route path="/notepads" component={NotesComponent}/>
                </div>
            </Router>
        );
    }

    _updateUser(user) {
        UserData.setUserData(user);
        this.setState({showLoginForm: !UserData.isLoggedin()});
        this.refs.navbar._updateNavbar(UserData.user.username);
    }

    _toggleLoginAndSignUpShowState() {
        this.setState({showLoginForm: !this.state.showLoginForm, showSignUpForm: !this.state.showSignUpForm});
    }

    _loginForm() {
        if (this.state.showLoginForm) {
            return <LoginComponent updateUser={this._updateUser.bind(this)}
                                   showSignUpForm={this._toggleLoginAndSignUpShowState.bind(this)}/>;
        } else {
            return null;
        }
    }

    _singUpForm() {
        if (this.state.showSignUpForm) {
            return <SignUpComponent showLoginForm={this._toggleLoginAndSignUpShowState.bind(this)}/>;
        } else {
            return null;
        }
    }
}

export default AppComponent;
