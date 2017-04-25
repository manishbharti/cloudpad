import React, {Component} from "react";
import {firebaseAuth, ref} from "../../config/constants";

export default class NoteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            user: null,
            note: {}
        };

        this._handleFormTextChange = this._handleFormTextChange.bind(this);
        this._submitForm = this._submitForm.bind(this);
    }

    componentWillMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user})
            }
        });

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
                    <form className="contact-form" onSubmit={this._submitForm}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" placeholder="Notepad Name"
                                           value={this.state.note.name || ''}
                                           onChange={this._handleFormTextChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="form-control textarea" rows="10" name="content"
                                              value={this.state.note.content || ''}
                                              placeholder="Content" onChange={this._handleFormTextChange}/>
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

    _submitForm(event) {
        event.preventDefault();
        if (this.state.user) {
            if (this.state.id) {
                this._updateNote(this.state.id, this.state.note);
            } else {
                this._saveNote(this.state.note, this.state.user);
            }
        } else {
            console.error("User not found.")
        }
    }

    _saveNote(note, user) {
        let id = ref.push().getKey();
        ref.child(`notes/${id}`).set({
            id: id,
            name: note.name,
            content: note.content,
            userId: user.uid
        }).then(() => this._goToDashboard());
    }

    _updateNote(id, note) {
        let updates = {};
        updates['/notes/' + id + '/name'] = note.name;
        updates['/notes/' + id + '/content'] = note.content;
        ref.update(updates).then(() => this._goToDashboard());
    }

    _goToDashboard() {
        this.props.history.push('/dashboard')
    }
}

NoteForm.propTypes = {
    history: React.PropTypes.object
};