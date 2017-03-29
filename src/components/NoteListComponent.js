import React, {Component} from "react";
import jquery from "jquery";
import {Col, Table} from "react-bootstrap";

class NoteListComponent extends Component {

    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    render() {
        if (this.state.notes.length > 0) {
            return (
                <Col xs={12}>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Created On</th>
                        </tr>
                        </thead>
                        <NoteRow notes={this.state.notes}/>
                    </Table>
                </Col>
            );
        } else {
            return null;
        }
    }

    _getNotes(username, accessToken) {
        let self = this;
        jquery.ajax({
            url: "http://localhost:8080/dashboard",
            type: "GET",
            crossDomain: true,
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', accessToken);
            },
            data: {username: username},
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
}

let NoteRow = React.createClass({
    render() {
        return <tbody>
        {this.props.notes.map((note) => {
                return <tr key={note.id}>
                    <td>{note.id}</td>
                    <td>{note.name}</td>
                    <td>{new Date(note.dateCreated).toDateString()}</td>
                </tr>;
            }
        )}
        </tbody>;
    }
});

export default NoteListComponent;