import React, {Component} from "react";
import Recaptcha from "react-grecaptcha";

import {validateRegistrationForm} from "../helpers/Helper";
import {auth} from "../helpers/auth";

export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            registerError: null,
            captchaVerified: false
        };
    }

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" ref={(fn) => this.firstName = fn} placeholder="First Name"
                               required={true}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" ref={(ln) => this.lastName = ln} placeholder="Last Name"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" ref={(email) => this.email = email}
                               placeholder="Email" required={true}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" required={true}
                               ref={(pw) => this.pw = pw}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm Password" required={true}
                               ref={(cpw) => this.cpw = cpw}/>
                    </div>
                    <div className="form-group">
                        <Recaptcha
                            sitekey="6LemmR4UAAAAAHQibE0Bivd-cbbMBane_C2xDNiQ"
                            callback={this._captchaCallback.bind(this)}
                            expiredCallback={this._captchaExpired.bind(this)}
                            locale="en" data-theme="light"/>
                    </div>
                    {
                        this.state.registerError &&
                        <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
                            <span className="sr-only">Error:</span>
                            &nbsp;{this.state.registerError}
                        </div>
                    }
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let user = {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            email: this.email.value,
            pw: this.pw.value,
            cpw: this.cpw.value,
            captchaVerified: this.state.captchaVerified
        };

        let formValidation = validateRegistrationForm(user);
        if (formValidation) {
            this.setState({registerError: formValidation});
        } else {
            auth(user).catch(e => this.setState({registerError: e.message}))
        }
    };

    _captchaCallback(response) {
        this.setState({captchaVerified: true});
    }

    _captchaExpired() {
        this.setState({captchaVerified: false});
    }
}
