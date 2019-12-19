import React from 'react';
import loadable from '@loadable/component';
import {} from 'dotenv/config';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Login from './components/Login';
import Lobby from './components/Lobby';
import Room from './components/Room';
import OAuth from './components/OAuth';
import AuthGuard from './components/AuthGuard';

const Admin = loadable(() => import('./components/Admin'));

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/lobby" exact component={Lobby} />
        <Route path="/room/:roomId" component={Room} />
        <Route path="/oauth" exact component={OAuth} />
        <Route path="/admin" exact>
          <AuthGuard component={Admin} />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
