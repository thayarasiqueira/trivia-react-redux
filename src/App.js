import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Raking from './Pages/Raking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/gameplay" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/raking" component={ Raking } />
      </Switch>
    </div>
  );
}
