import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Home from './home';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect path="/" exact to="/home" />
        <Route path="/home" exact component={Home}/>
      </Switch>
    );
  }
}

