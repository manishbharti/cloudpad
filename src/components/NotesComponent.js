import React, {Component} from "react";
import jquery from "jquery";
import {Button, Col, ControlLabel, Table} from "react-bootstrap";
import {NOTE_LIST_URL} from "../constants";
import NoteFormComponent from "./NoteFormComponent";
import {UserData} from "../App";

class NotesComponent extends Component {

    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    render() {
        if (this.state.notes.length > 0) {
            return (
                <div>
                    <Col xs={12} md={2}>
                        <Button block onClick={() => this.refs.noteForm._newNote()}>New</Button>

                        <br/>
                        <ControlLabel>Saved Notepads</ControlLabel>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.notes.map((note) => {
                                    return (<tr key={note.id}>
                                        <td>
                                            <a href="#"
                                               onClick={() => this.refs.noteForm._showNote(note.id)}>{note.name}</a>
                                        </td>
                                    </tr>);
                                }
                            )}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={12} md={10}>
                        <NoteFormComponent ref="noteForm" onUpdate={this._updateNoteAfterServerUpdate.bind(this)}
                                           onAddingNewNote={this._updateNotesAfterSavingNewNote.bind(this)}/>
                    </Col>
                </div>
            );
        } else {
            return null;
        }
    }

    _getNotes() {
        let self = this;
        jquery.ajax({
            url: NOTE_LIST_URL,
            type: "GET",
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', UserData.getAccessToken());
            },
            data: {username: UserData.user.username},
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (response) {
                self.setState({notes: response.notes});
            },
            error: function (xhr, status) {
                console.info("Error");
            }
        });
    }

    _updateNoteAfterServerUpdate(updatedNote) {
        let notes = this.state.notes;
        for (let idx in notes) {
            if (notes[idx].id === updatedNote.id) {
                notes[idx].name = updatedNote.name;
                break;
            }
        }
        this.setState({notes: notes});
    }

    _updateNotesAfterSavingNewNote(newNote) {
        let notes = this.state.notes;
        notes.push(newNote);
        this.setState({notes: notes});
    }
}

export default NotesComponent;