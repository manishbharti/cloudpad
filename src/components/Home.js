import React, {Component} from "react";
import {firebaseAuth} from "../config/constants";
import {Link, Redirect} from "react-router-dom";

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
                <p>Login to see all your saved notes. <b>Or work as a <Link to={{pathname: `/notepad/`}}>GUEST</Link>.</b></p>
            </div>
        )
    }
}