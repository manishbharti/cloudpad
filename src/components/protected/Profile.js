import React, {Component} from "react";
import {firebaseAuth, ref} from "../../config/constants";
import "../../sticker.css";

export default class Profile extends Component {
    state = {
        user: ''
    };

    componentWillMount() {
        let self = this;
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                ref.child(`users/${user.uid}`).on('value', function (snapshot) {
                    self.setState({user: snapshot.val()});
                    console.info(self.state.user);
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Sheena Shrestha</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-3 col-lg-3">
                                        <img alt="User Pic" className="img-circle img-responsive"
                                             src="http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg"/>
                                    </div>

                                    <div className="col-md-9 col-lg-9">
                                        <table className="table table-user-information">
                                            <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td>{this.state.user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Name</td>
                                                <td>{this.state.user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{this.state.user.email}</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                Cloudpad
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}