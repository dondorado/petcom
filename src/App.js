import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import Login from "./layout/login";
import Report from "./layout/report";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/report" component={Report} />
      </BrowserRouter>
    </div>
  );
}

export default App;
