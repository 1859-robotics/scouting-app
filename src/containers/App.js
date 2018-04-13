import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import TeamContainer from "./TeamContainer.js"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/app/teams/:number/" component={ TeamContainer }/>
        </Switch>
      </div>
    );
  }
}
