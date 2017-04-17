import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import * as sessionActions from "../actions/sessionActions";
import NavbarComponent from "./NavbarComponent";

const Home = ({actions: {logout}, user, authenticated}) => (
    <div>
        <NavbarComponent actions={logout} user={user} authenticated={authenticated}/>
        <h3>Welcome {user.email}</h3>
        <h5>{authenticated ? 'You are authenticated :)' : 'Error'}</h5>
    </div>
);

const {object, bool} = PropTypes;

Home.propTypes = {
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

export default connect(mapState, mapDispatch)(Home);
