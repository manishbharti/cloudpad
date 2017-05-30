import React, {Component} from "react";
import {firebaseAuth, ref} from "../../config/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";

export default class NoteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            user: null,
            note: {},
            info: null
        };

        this._handleFormTextChange = this._handleFormTextChange.bind(this);
        this._submitForm = this._submitForm.bind(this);
    }

    componentWillMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user})
            } else if (this.state.id) {
                this.setState({info:`Please save the url <b>(${window.location.href})</b> for accessing this note in future.`});
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
                    {
                        this.state.info ?
                            <div className="alert alert-info" dangerouslySetInnerHTML={{__html: this.state.info}}/> :
                            null
                    }
                    <form className="contact-form" onSubmit={this._submitForm}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" placeholder="Notepad Name"
                                           value={this.state.note.name || ''} maxLength="100" required={true}
                                           onChange={this._handleFormTextChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                     <textarea className="form-control textarea" rows="31" name="content"
                                               value={this.state.note.content || ''}
                                               placeholder="Content" onChange={this._handleFormTextChange}/>
                                    {/*<ReactQuill value={this.state.note.content || ''}
                                     onChange={this._handleFormTextChange1.bind(this)}
                                     modules={{
                                     toolbar: [
                                     [{'header': [1, 2, false]}],
                                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                     [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                                     ['link', 'image'],
                                     ['clean']
                                     ]
                                     }}/>*/}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pull-right">
                                    <button type="submit" className="btn main-btn">Save</button>
                                    &nbsp;
                                    <button type="button" onClick={this._goToDashboard.bind(this)}
                                            className="btn main-btn">Cancel
                                    </button>
                                </div>
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

    /*_handleFormTextChange1(value) {
     let note = this.state.note;
     note["content"] = value;
     this.setState({note: note});
     }*/

    _submitForm(event) {
        event.preventDefault();
        if (this.state.id) {
            this._updateNote(this.state.id, this.state.note);
        } else {
            this._saveNote(this.state.note, this.state.user);
        }
    }

    _saveNote(note, user) {
        let id = ref.push().getKey();
        this.setState({id: id});
        ref.child(`notes/${id}`).set({
            id: id,
            name: note.name || null,
            content: note.content || null,
            userId: user ? user.uid : null
        }).then(() => this._goToDashboard());
    }

    _updateNote(id, note) {
        let updates = {};
        updates['/notes/' + id + '/name'] = note.name;
        updates['/notes/' + id + '/content'] = note.content;
        ref.update(updates).then(() => this._goToDashboard());
    }

    _goToDashboard() {
        if (this.state.user) {
            this.props.history.push('/')
        } else {
            this.props.history.push(`/notepad/${this.state.id}`)
        }
    }
}

NoteForm.propTypes = {
    history: React.PropTypes.object
};