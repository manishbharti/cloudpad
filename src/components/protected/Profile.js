import React, {Component} from "react";
import {firebaseAuth, ref} from "../../config/constants";
import "../../sticker.css";
import {CloudinaryContext, Image, Transformation} from "cloudinary-react";

export default class Profile extends Component {
    state = {
        user: '',
        profilePublicId: 'Blank_Club_Website_Avatar_Gray_kjrefw'
    };

    componentWillMount() {
        let self = this;
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                ref.child(`users/${user.uid}`).on('value', function (snapshot) {
                    if (snapshot.val()) {
                        self.setState({user: snapshot.val(), profilePublicId: snapshot.val().profileImagePublicId});
                    }
                });
            }
        });
    }

    _uploadImage(event) {
        event.preventDefault();
        let self = this;

        let formData = new FormData();
        formData.append('upload_preset', 'qs7oupjy');
        formData.append('file', document.getElementsByName('file')[0].files[0]);

        fetch("https://api.cloudinary.com/v1_1/dsrgjx9tu/image/upload", {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json();
        }).then(function (data) {
            self.setState({profilePublicId: data.public_id});
            self._saveUserProfileImageInUserTable(data.public_id)
        });
    }

    _saveUserProfileImageInUserTable(profileImagePublicId) {
        if (this.state.user) {
            let updates = {};
            updates['/users/' + this.state.user.uid + '/profileImagePublicId'] = profileImagePublicId;
            ref.update(updates);
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">{this.state.user.firstName} {this.state.user.lastName}</h3>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-3 col-lg-3">
                                        <CloudinaryContext cloudName="dsrgjx9tu">
                                            <Image publicId={this.state.profilePublicId}>
                                                <Transformation width="250" height="250" radius="max" crop="crop"/>
                                            </Image>
                                        </CloudinaryContext>

                                        <form encType="multipart/form-data" onSubmit={this._uploadImage.bind(this)}>
                                            <legend>Change profile image</legend>
                                            <p><input type="file" name="file"/></p>
                                            <p><input type="submit" value="Submit" className="btn btn-primary"/></p>
                                        </form>
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