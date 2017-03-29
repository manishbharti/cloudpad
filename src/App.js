import React, {Component} from "react";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";
import jquery from "jquery";

class App extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                username: '',
                token_type: '',
                access_token: '',
                role: []

            },
            getAccessToken: function () {
                if (this.user.token_type !== '' || this.user.access_token !== '') {
                    // 'Bearer ' + accessToken
                    return this.user.token_type + " " + this.user.access_token;
                } else {
                    return '';
                }
            }
        }
    }

    render() {
        return (
            <div>
                <NavbarComponent ref="navbar"/>
                <LoginComponent updateUser={this._updateUser.bind(this)}/>
            </div>
        );
    }

    _updateUser(user) {
        console.info(user);
        this.setState({
            user: {
                username: user.username,
                token_type: user.token_type,
                access_token: user.access_token,
                roles: user.roles
            }
        });

        this.refs.navbar._updateNavbar(user.username);
        // this._getNotes();
    }

    _getNotes() {
        event.preventDefault();
        let username = this.state.user.username;
        let accessToken = this.state.getAccessToken();

        jquery.ajax({
            url: "http://localhost:8080/dashboard",
            type: "GET",
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', accessToken);
            },
            data: {username: username},
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (response) {
                console.info(response);
            },
            error: function (xhr, status) {
                console.info("Error");
            }
        });
    }
}

export default App;
