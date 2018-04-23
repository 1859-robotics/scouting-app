import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from "react-router-dom"

import TeamList from "./TeamList.js"
import MatchList from "./MatchList.js"
import TeamContainer from "./TeamContainer.js"
import MatchContainer from "./MatchContainer.js"
import Settings from "./Settings.js"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/app/settings/">{"<"} Settings</Link>
        <Switch>
          <Route exact path="/app/teams/:number/" component={ TeamContainer }/>
          <Route exact path="/app/teams/" component={ TeamList }/>
          <Route exact path="/app/matches/" component={ MatchList }/>
          <Route exact path="/app/matches/:division/:matchnum/:round" component={ MatchContainer }/>
          <Route exact path="/app/settings/" component={ Settings }/>

          <Redirect to="/app/teams/"/>
        </Switch>
      </div>
    );
  }
}
