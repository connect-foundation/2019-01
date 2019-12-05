import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Lobby from './components/Lobby';
import Room from './components/Room';
import Admin from './components/Admin';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/lobby" exact component={Lobby} />
        <Route path="/room/:roomId" component={Room} />
        <Route path="/admin" component={Admin} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
