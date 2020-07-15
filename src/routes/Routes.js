import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Play from "../components/play/Play";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/play" exact>
          <Play />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
