import React, {Component} from "react";
import jquery from "jquery";
import {Button, ButtonToolbar, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import {SAVE_USER_URL} from "./../constants";

class SignUpComponent extends Component {
    render() {
        return (
            <Form horizontal onSubmit={this._signUp.bind(this)}>
                <FormGroup controlId="formHorizontalFirstName">
                    <Col componentClass={ControlLabel} sm={1}>
                        First Name
                    </Col>
                    <Col sm={10}>
                        <FormControl type="firstName" placeholder="First Name" inputRef={(fn) => this._firstName = fn}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                    <Col componentClass={ControlLabel} sm={1}>
                        Last Name
                    </Col>
                    <Col sm={10}>
                        <FormControl type="lastName" placeholder="Last Name" inputRef={(ln) => this._lastName = ln}/>
                    </Col>
                </FormGroup>

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
                        <ButtonToolbar>
                            <Button type="submit" bsStyle="primary">Save</Button>
                            <Button type="button" onClick={() => this.props.showLoginForm()}>Sign in</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    _signUp(event) {
        event.preventDefault();
        let self = this;
        jquery.ajax({
            url: SAVE_USER_URL,
            type: "POST",
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: JSON.stringify({
                "firstName": this._firstName.value,
                "lastName": this._lastName.value,
                "username": this._username.value,
                "password": this._password.value
            }),
            success: function (response) {
                alert("Account created successfully.");
                self.props.showLoginForm();
            },
            error: function (xhr, status) {
                alert("Something went wrong. Please try again later.");
            }
        });
    }
}

export default SignUpComponent;