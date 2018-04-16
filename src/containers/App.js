import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom"
import TeamContainer from "./TeamContainer.js"

import TeamList from "./TeamList.js"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/app/teams/:number/" component={ TeamContainer }/>
          <Route exact path="/app/teams/" component={ TeamList }/>

          <Redirect to="/app/teams/"/>
        </Switch>
      </div>
    );
  }
}
