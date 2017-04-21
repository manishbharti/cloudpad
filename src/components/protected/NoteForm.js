import React, {Component} from "react";
import {ref} from "../../config/constants";

export default class NoteForm extends Component {
    state = {
        id: this.props.match.params.id,
        note: {}
    };

    componentWillMount() {
        if (this.state.id) {
            let self = this;
            ref.child(`notes/${this.state.id}`).on('value', function (snapshot) {
                self.setState({note: snapshot.val()});
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="contact-form" onSubmit={this._saveNote.bind(this)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" placeholder="Notepad Name"
                                           value={this.state.note.name || ''}
                                           onChange={this._handleFormTextChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="form-control textarea" rows="10" name="content"
                                              value={this.state.note.content || ''}
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
            id: id,
            name: note.name,
            content: note.content
        });
    }
}