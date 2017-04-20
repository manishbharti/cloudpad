import React, {Component} from "react";
import {Link} from "react-router-dom";
import {sessionService} from "redux-react-session";
import * as jquery from "jquery";

import NavbarComponent from "./NavbarComponent";
import "../index.css";
import {NOTE_LIST_URL} from "../constants";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        console.info(this)
        // this._getNotes();
    }

    render() {
        return (
            <div>
                <NavbarComponent/>

                <div className="container">
                    <div className="row">

                        <Link to="/notepad">
                            <div className="col-xs-3" key="0">
                                <div className="text">
                                    <div className="content-text">
                                        <h3 className="lead">
                                            New
                                        </h3>
                                        <p>
                                            Create a new notepad.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/*{this.state.notes.map((note) => {
                                return (
                                    <div className="col-xs-3" key={note.id}>
                                        <div className="text">
                                            <div className="content-text">
                                                <h3 className="lead">
                                                    {note.name}
                                                </h3>
                                                <p>
                                                    {note.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}*/}

                    </div>
                </div>
            </div>
        );
    };

    /*_getNotes() {
        let self = this;
        sessionService.loadUser()
            .then(user => {
                jquery.ajax({
                    url: NOTE_LIST_URL,
                    type: "GET",
                    crossDomain: true,
                    beforeSend: function (request) {
                        request.setRequestHeader('Authorization', user.token);
                    },
                    data: {username: user.email},
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    success: function (response) {
                        self.setState({notes: response.notes});
                    },
                    error: function (xhr, status) {
                        console.info("Error");
                    }
                });
            }).catch(err => console.error(err));
    }*/
}

export default Home;
