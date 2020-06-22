import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import css from "./index.css";

ReactDOM.render(<App />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
