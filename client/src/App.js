import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Lobby from './component/Lobby';
import Room from './component/Room';
import Admin from './component/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h2>login page</h2>
        </Route>
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
