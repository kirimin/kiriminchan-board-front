import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Top } from "./components/Top";
import { ThreadDetail } from "./components/ThreadDetail"
import './index.css';

render(
  <Router>
    <Switch>
      <Route exact path="/" component={Top}></Route>
      <Route path='/thread/:id' component={ThreadDetail} ></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
