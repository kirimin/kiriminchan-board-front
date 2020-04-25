import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Top } from './components/Top';
import { ThreadDetail } from './components/ThreadDetail';
import './index.css';
import { UserProvider, UserContext } from './Context/UserContext';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';

render(
  <UserProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Top}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route path="/thread/:id" component={ThreadDetail}></Route>
      </Switch>
    </Router>
  </UserProvider>,
  document.getElementById('root')
);
