import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from "react-router-dom"

import TeamList from "./TeamList.js"
import MatchList from "./MatchList.js"
import TeamContainer from "./TeamContainer.js"
import MatchContainer from "./MatchContainer.js"
import Settings from "./Settings.js"

// TODO: maybe seperate this out into its own file?
function download(filename, text) {
  const pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}

export default class App extends Component {

  downloadState() {
    const content = localStorage.getItem("state")
    download("state.json", content)

  }

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
        <button onClick={ this.downloadState.bind(this) }>Download state JSON</button>
      </div>
    );
  }
}
