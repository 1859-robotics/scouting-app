import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addTeams, setTeam } from "../actions/teams.js"
import api from "../services/vexdb.js"

import List from "../components/List.js"

class TeamList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    api.getTeams().then(
      (results) => {
        this.props.dispatch(addTeams(results.map(team => ({ number: team.number, teamInfo: team }))))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      teams: nextProps.teams
    }
  }

  addNewTeam(e) {
    this.props.dispatch(setTeam({
      number: this.newTeamInput.value
    }))

  }

  render() {
    return (
      <div>
        {this.state.teams ? (
          <List label="number"
                list={ this.state.teams }
                linkURL={ "/app/teams/" } />
        ) : (
          <div>
            <p>Getting Teams...</p>
          </div>
        )}
        <button onClick={ this.addNewTeam.bind(this) }>add team</button>
        <input type="text"
               ref={ newTeamInput => this.newTeamInput = newTeamInput}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teams: state.teams
  }
}

export default connect(mapStateToProps)(TeamList)
