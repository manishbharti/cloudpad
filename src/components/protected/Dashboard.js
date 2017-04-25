import React, {Component} from "react";
import {Link} from "react-router-dom";
import {firebaseAuth, ref} from "../../config/constants";
import {convertObjectToArray, wrapText} from "../../helpers/Helper";

export default class Dashboard extends Component {
    state = {
        notes: []
    };

    componentWillMount() {
        let self = this;
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                ref.child('notes').orderByChild('userId').equalTo(user.uid).on("value", function (snapshot) {
                    self.setState({notes: convertObjectToArray(snapshot.val())});
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    <Link to="/new-notepad" key={0}>
                        <div className="col-xs-3">
                            <div className="notepadSticker newNotepadSticker">
                                <div className="content-text">
                                    <h3 className="lead">
                                        <span className="glyphicon glyphicon-plus"/> New
                                    </h3>
                                    <p>
                                        Create a new notepad.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {this.state.notes.map((note) => {
                            return (
                                <Link to={{pathname: `/notepad/${note.id}`}} key={note.id}>
                                    <div className="col-xs-3">
                                        <div className="notepadSticker">
                                            <div className="content-text">
                                                <h3 className="lead">
                                                    {note.name}
                                                </h3>
                                                <p>
                                                    {wrapText(note.content)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        }
                    )}

                </div>
            </div>
        )
    }
}