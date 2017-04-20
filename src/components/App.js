import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import NoteFormComponent from "./NoteFormComponent";

const App = ({authenticated, checked}) => (
    <Router>
        { checked &&
        <div>
            <PrivateRoute exact path="/" component={Home} authenticated={authenticated}/>
            <Route path="/login" component={Login}/>
            <Route path="/notepad" component={NoteFormComponent}/>
        </div>
        }
    </Router>
);

const {bool} = PropTypes;

App.propTypes = {
    authenticated: bool.isRequired,
    checked: bool.isRequired
};

const mapState = ({session}) => ({
    checked: session.checked,
    authenticated: session.authenticated
});

export default connect(mapState)(App);
