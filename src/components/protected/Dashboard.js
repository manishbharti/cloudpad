import React, {Component} from "react";
import {Link} from "react-router-dom";
import {firebaseAuth, ref} from "../../config/constants";
import {convertObjectToArray, wrapText} from "../../helpers/Helper";
import {Draggable, Droppable} from "react-drag-and-drop";
import "../../sticker.css";

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

    _deleteNote(data) {
        if (data.noteid && confirm("Are you sure, you want to delete this notepad!")) {
            ref.child(`notes/${data.noteid}`).remove()
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">

                        <Link to="/notepad" key={0}>
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
                                        <Draggable type="noteid" data={note.id}>
                                            <div className="col-xs-3">
                                                <div className="notepadSticker">
                                                    <div className="content-text">
                                                        <h3 className="lead">
                                                            {wrapText(note.name, 21)}
                                                        </h3>
                                                        <p>
                                                            {wrapText(note.content, 300)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Draggable>
                                    </Link>
                                );
                            }
                        )}
                    </div>
                </div>

                {this.state.notes.length > 0
                    ? <div className="col-xs-2 ">
                        <div className="fixedContainer">
                            <Droppable types={['noteid']} onDrop={this._deleteNote.bind(this)}>
                                        <span className="trash" title="Drag and drop to delete the notepad.">
                                            <span name="trashSpan"/>
                                            <i/>
                                        </span>
                            </Droppable>
                        </div>
                    </div>
                    : null
                }
            </div>
        )
    }
}