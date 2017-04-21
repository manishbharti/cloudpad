import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../helpers/auth";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Cloudpad</Link>
                    </div>
                    <ul className="nav navbar-nav pull-right">
                        <li>
                            <Link to="/" className="navbar-brand">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                        </li>
                        <li>
                            {this.props.authed
                                ? <button
                                    style={{border: 'none', background: 'transparent'}}
                                    onClick={() => {
                                        logout()
                                    }}
                                    className="navbar-brand">Logout</button>
                                : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}