import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Wrapper from "./components/wrapper";

import "./_index.css";

const App = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/er"
        component={Wrapper}
      />
      <Redirect from="/" to="/er" />
    </Switch>
  </Router>
);

App.displayName = "App";

render(<App />, document.getElementById("root"));
