import React, {Component} from "react";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";
import NoteListComponent from "./components/NoteListComponent";

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
                {this.state.user.username === '' ? <LoginComponent updateUser={this._updateUser.bind(this)}/> : null}
                <NoteListComponent ref="noteList"/>
            </div>
        );
    }

    _updateUser(user) {
        this.setState({
            user: {
                username: user.username,
                token_type: user.token_type,
                access_token: user.access_token,
                roles: user.roles
            }
        });

        this.refs.navbar._updateNavbar(user.username);
        this.refs.noteList._getNotes(this.state.user.username, this.state.getAccessToken());
    }
}

export default App;
