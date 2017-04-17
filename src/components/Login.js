import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import * as sessionActions from "../actions/sessionActions";
import "bootstrap/dist/css/bootstrap.css";

import NavbarComponent from "./NavbarComponent";

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {
                email: '',
                password: ''
            }
        };

        this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _onSubmit(history) {
        const {user} = this.state;
        const {login} = this.props.actions;
        login(user, history);
    }

    _onChange(e) {
        const {value, name} = e.target;
        const {user} = this.state;
        user[name] = value;
        this.setState({user});
    }

    render() {
        const submitButton = withRouter(({history}) => (
            <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={() => this._onSubmit(history)}>
                Login
            </button>
        ));

        return (
            <div>
                <NavbarComponent />
                <div className="container">
                    <form action="" method="post" name="Login_Form" className="form-signin">
                        <h3 className="form-signin-heading">Welcome! Please Sign In</h3>

                        <input type="email" name="email" className="form-control" placeholder="Username"
                               onChange={this._onChange}/>
                        <input type="password" name="password" className="form-control" placeholder="Password"
                               onChange={this._onChange}/>

                        { submitButton() }
                    </form>
                </div>
            </div>
        );
    }
}

const {object} = PropTypes;

Login.propTypes = {
    actions: object.isRequired
};

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators(sessionActions, dispatch)
    };
};

export default connect(null, mapDispatch)(Login);
