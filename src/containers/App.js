import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom"
import TeamContainer from "./TeamContainer.js"

import TeamList from "./TeamList.js"
import MatchList from "./MatchList.js"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/app/teams/:number/" component={ TeamContainer }/>
          <Route exact path="/app/teams/" component={ TeamList }/>
          <Route exact path="/app/matches/" component={ MatchList }/>
          <Route exact path="/app/matches/:matchnum/" component={ MatchList }/>

          <Redirect to="/app/teams/"/>
        </Switch>
      </div>
    );
  }
}
