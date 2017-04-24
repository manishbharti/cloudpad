import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../helpers/auth";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to={this.props.authed ? "/dashboard" : "/"} className="navbar-brand">Cloudpad</Link>
                    </div>
                    <ul className="nav navbar-nav pull-right">
                        <li>
                            {this.props.authed
                                ? <span>
                                    {location.pathname === "/dashboard"
                                        ? null
                                        : <Link to="/dashboard" className="navbar-brand">Dashboard</Link>}
                                    <button
                                        style={{border: 'none', background: 'transparent'}}
                                        onClick={() => {
                                            logout()
                                        }}
                                        className="navbar-brand">Logout</button>
                                  </span>
                                : <span>
                                    <Link to="/login" className="navbar-brand">Login</Link>
                                    <Link to="/register" className="navbar-brand">Register</Link>
                                  </span>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}