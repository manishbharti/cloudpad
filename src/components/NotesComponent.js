import React, {Component} from "react";
import jquery from "jquery";
import {Button, Col, ControlLabel, Glyphicon, Table} from "react-bootstrap";
import {DELETE_NOTE_URL, NOTE_LIST_URL} from "../constants";
import NoteFormComponent from "./NoteFormComponent";
import {UserData} from "../App";

class NotesComponent extends Component {

    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this._getNotes();
    }

    render() {
        let notes = null;
        if(UserData.isLoggedin()) {
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
                                            <Glyphicon glyph="remove" className="pull-right"
                                                       onClick={() => this._deleteNote(note)}/>
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
        }else {
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

    _deleteNote(note) {
        if (confirm(`Are you sure you want to delete the notepad (${note.name})?`)) {
            let self = this;
            jquery.ajax({
                url: DELETE_NOTE_URL + note.id,
                type: "DELETE",
                crossDomain: true,
                beforeSend: function (request) {
                    request.setRequestHeader('Authorization', UserData.getAccessToken());
                },
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (response) {
                    self.refs.noteForm._hideForm();
                    self._removeNote(note.id);
                },
                error: function (xhr, status) {
                    console.info("Error");
                }
            });
        }
    }

    _removeNote(noteId) {
        let notes = this.state.notes;
        for (let idx in notes) {
            if (notes[idx].id === noteId) {
                notes.splice(idx, 1);
                break;
            }
        }
        this.setState({notes: notes});
    }
}

export default NotesComponent;