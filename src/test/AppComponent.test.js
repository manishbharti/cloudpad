import React from "react";
import ReactDOM from "react-dom";
import AppComponent from "../components/AppComponent";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent />, div);
});
