import React, {Component} from "react";
import "./App.css";
import Login from "./components/Login";
import AppNavbar from "./components/AppNavbar";

class App extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                username: null,
                access_token: null,
                role: []
            }
        }
    }

    render() {
        return (
            <div>
                <AppNavbar ref="navbar"/>
                <Login updateUser={this._updateUser.bind(this)}/>
            </div>
        );
    }

    _updateUser(user) {
        this.setState({
            user: {
                username: user.username,
                access_token: user.access_token,
                roles: user.roles
            }
        });

        this.refs.navbar._updateNavbar(user.username);
    }
}

export default App;
