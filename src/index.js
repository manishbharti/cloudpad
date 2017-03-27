import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppNavbar from "./components/AppNavbar";
import "./index.css";

ReactDOM.render(<AppNavbar />, document.getElementById('navbar'));
ReactDOM.render(<App />, document.getElementById('root'));
