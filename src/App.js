import React, {Component} from "react";
import "./App.css";
import Login from "./components/Login";
import AppNavbar from "./components/AppNavbar";

class App extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Login />
            </div>
        );
    }
}

export default App;
