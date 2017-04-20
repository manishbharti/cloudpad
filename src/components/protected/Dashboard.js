import React, {Component} from "react";


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <p>Dashboard.</p>
                <p>This is a protected route.</p>
                <p>You can only see this if you're authed.</p>
            </div>
        )
    }
}