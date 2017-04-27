import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../helpers/auth";
import {firebaseAuth, ref} from "../config/constants";

export default class Navbar extends Component {
    state = {
        userName: null
    };

    componentWillMount() {
        let self = this;
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                ref.child(`users/${user.uid}`).on('value', function (snapshot) {
                    self.setState({userName: snapshot.val().firstName + (snapshot.val().lastName ? " " + snapshot.val().lastName : "")});
                });
            }
        });
    }

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
                                        : <Link to="/dashboard" className="navbar-brand" title="Dashboard">
                                            <span className="glyphicon glyphicon-home" aria-hidden="true"/>
                                        </Link>}
                                    <button
                                        style={{border: 'none', background: 'transparent'}}
                                        onClick={() => {
                                            logout()
                                        }}
                                        className="navbar-brand" title="Logout">
                                            <span className="glyphicon glyphicon-off" aria-hidden="true"/>
                                    </button>
                                    <Link to={{pathname: `/profile`}}>
                                        <div className="navbar-brand">{this.state.userName}</div>
                                    </Link>
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