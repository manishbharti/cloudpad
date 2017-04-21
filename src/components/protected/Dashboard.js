import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">

                    <Link to="/new-notepad">
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
                </div>
            </div>
        )
    }
}