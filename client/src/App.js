import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
<<<<<<< HEAD
import Lobby from './component/Lobby';
import Room from './component/Room';
import Admin from './component/Admin';
=======
import Lobby from './components/Lobby';
import Room from './components/Room';
import Login from './components/Login';
>>>>>>> 787fa8d03d521ec85b898a6fbd5cada7fe376995

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
