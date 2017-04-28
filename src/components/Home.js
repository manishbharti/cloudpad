import React, {Component} from "react";
import {firebaseAuth} from "../config/constants";
import {Redirect} from "react-router-dom";

export default class Home extends Component {
    state = {
        user: null
    };

    componentWillMount() {
        this.setState({user: firebaseAuth().currentUser});
    }

    render() {
        return (
            <div className="container">
                {this.state.user ? <Redirect to="/dashboard"/> : null}
                <h3>Welcome to Cloudpad</h3>
                <p>A online notepad facility provider</p>
                <p>Login and enjoy :-)</p>
            </div>
        )
    }
}