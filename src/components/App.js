import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {firebaseAuth} from "../config/constants";

import {PublicRoute} from "../config/PublicRoute";
import {PrivateRoute} from "../config/PrivateRoute";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./protected/Dashboard";
import NoteForm from "./protected/NoteForm";
import Profile from "./protected/Profile";

export default class App extends Component {
    state = {
        authed: false,
        loading: true,
    };

    componentWillMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }

    componentWillUnmount() {
        this.removeListener()
    }

    render() {
        if (this.state.loading) {
            return (
                <h1 className="loading">Loading&#8230;</h1>
            );
        } else {
            return (
                <BrowserRouter>
                    <div>
                        <Navbar authed={this.state.authed}/>

                        <Switch>
                            <PublicRoute authed={this.state.authed} path='/login' component={Login}/>
                            <PublicRoute authed={this.state.authed} path='/register' component={Register}/>

                            <PublicRoute authed={false} path='/notepad/:id' component={NoteForm}/>
                            <PublicRoute authed={false} path='/notepad' component={NoteForm}/>

                            <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard}/>
                            <PrivateRoute authed={this.state.authed} path="/profile" component={Profile}/>

                            <Route path='/' exact component={Home}/>
                            <Route render={() => <h3>No Match</h3>}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
    }
}
