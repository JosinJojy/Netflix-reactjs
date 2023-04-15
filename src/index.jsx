import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseApp } from "./Firebase/FirebaseConfig";
import Context from "./Context/UserContext";
import Context2 from "./Context/moviePopUpContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Context>
        <Context2>
          <App />
        </Context2>
      </Context>
    </Router>
  </React.StrictMode>
);
