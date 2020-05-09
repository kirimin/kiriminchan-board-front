import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Top } from './components/Screens/Top';
import { ThreadDetail } from './components/Screens/ThreadDetail';
import './index.css';
import { UserProvider } from './Context/UserContext';
import { SignUp } from './components/Screens/SignUp';
import { SignIn } from './components/Screens/SignIn';
import { Settings } from './components/modules/Settings';

render(
  <UserProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={Top}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/settings" component={Settings}></Route>
        <Route path="/thread/:id" component={ThreadDetail}></Route>
      </Switch>
    </Router>
  </UserProvider>,
  document.getElementById('root')
);
