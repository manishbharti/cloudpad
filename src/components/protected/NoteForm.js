import React, {Component} from "react";

export default class NoteForm extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="contact-form">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="Name" placeholder="Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="form-control textarea" rows="31" name="Message" placeholder="Message"/>
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
}