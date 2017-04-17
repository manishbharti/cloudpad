import React, {PropTypes} from "react";
import {Navbar} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as sessionActions from "../actions/sessionActions";

const NavbarComponent = ({actions: {logout}, user, authenticated}) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Cloud Pad</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        {getUserNav(user, logout)}
    </Navbar>
);

function getUserNav(user, logout) {
    return user.email ?
        <ul className="nav navbar-nav navbar-right">
            <li><a href="#">{user.email}</a></li>
            <li>
                {
                    withRouter(({history}) => (
                        <a href="javascript:void(0)" onClick={() => logout(history)}>Logout</a>
                    ))()
                }
            </li>
        </ul>
        : null;
}

const {object, bool} = PropTypes;

NavbarComponent.propTypes = {
    actions: object.isRequired,
    user: object.isRequired,
    authenticated: bool.isRequired
};

const mapState = (state) => ({
    user: state.session.user,
    authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
};

export default connect(mapState, mapDispatch)(NavbarComponent);
