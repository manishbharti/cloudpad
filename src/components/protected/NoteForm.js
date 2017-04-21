import React, {Component} from "react";
import {ref} from "../../config/constants";

export default class NoteForm extends Component {
    state = {
        note: {}
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="contact-form" onSubmit={this._saveNote.bind(this)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" placeholder="Notepad Name"
                                           onChange={this._handleFormTextChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="form-control textarea" rows="10" name="content"
                                              placeholder="Content" onChange={this._handleFormTextChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button type="submit" className="btn main-btn pull-right">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    _handleFormTextChange(event) {
        let note = this.state.note;
        note[event.target.name] = event.target.value;
        this.setState({note: note});
    }

    _saveNote(event) {
        event.preventDefault();

        let id = ref.push().getKey();
        let note = this.state.note;

        ref.child(`notes/${id}`).set({
            uid: id,
            name: note.name,
            content: note.content
        });
    }
}