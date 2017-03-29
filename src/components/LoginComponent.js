import React, {Component} from "react";
import jquery from "jquery";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import {LOGIN_URL} from "./../constants";

class LoginComponent extends Component {

    constructor() {
        super();
        this.state = {
            showLoginForm: true
        }
    }

    render() {
        if (this.state.showLoginForm) {
            return (
                <Form horizontal onSubmit={this._login.bind(this)}>
                    <FormGroup controlId="formHorizontalUsername">
                        <Col componentClass={ControlLabel} sm={1}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl type="username" placeholder="Username" inputRef={(u) => this._username = u}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={1}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" inputRef={(p) => this._password = p}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        } else {
            return null;
        }
    }

    _login(event) {
        event.preventDefault();
        let self = this;
        jquery.ajax({
            url: LOGIN_URL,
            type: "POST",
            crossDomain: true,
            data: JSON.stringify({"username": this._username.value, "password": this._password.value}),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (response) {
                self.props.updateUser(response);
                self.setState({showLoginForm: false});
            },
            error: function (xhr, status) {
                if (xhr.status === 401) {
                    alert("Invalid username or password.");
                } else {
                    alert("Something went wrong. Please try again later.");
                }
            }
        });
    }
}

export default LoginComponent;
