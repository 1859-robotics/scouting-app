import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addTeams, setTeam, setTeamNote } from "../actions/teams.js"
import api from "../services/vexdb.js"

import List from "../components/List/List.js"

class TeamList extends Component {
  constructor(props, context) {
    super( props, context )
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
      number: this.newTeamInput.value.toUpperCase()
    }))
  }

  getTeamDivisions(e) {
    this.state.teams.forEach((team) => {
      api.getTeamDivisions(team.number).then((divisions) => {
        this.props.dispatch(setTeamNote(team.number, { key: "divisions", value: divisions }))
      })
    })
  }

  render() {
    return (
      <div>

        <Link to="/app/matches/">{ "<" } Matches</Link>
        <button onClick={ this.getTeamDivisions.bind(this) }>Get Team Divisions</button>
        {this.state.teams ? (
          <List label={["number", "name", "divisions", "auton", "autonPoints"]}
                link={["number"]}
                search={["number", "name", "divisions", "auton", "autonPoints"]}
                list={ this.state.teams.map((team) => ({
                  number: team.number,
                  name: (team.teamInfo != null ? team.teamInfo.team_name : undefined),
                  divisions: (team.divisions != null ? team.divisions.join(", ") : undefined),
                  auton: (team.userInputData != null ? team.userInputData.autonWorks ? "works" : "doesn't" : undefined),
                  autonPoints: (team.userInputData != null ? team.userInputData.autonPoints : undefined)

                })) }
                linkURL={ "/app/teams/" } />
        ) : (
          <div>
            <p>Getting Teams...</p>
          </div>
        )}
        <button onClick={ this.addNewTeam.bind(this) }>add team</button>
        <input type="text"
               ref={ newTeamInput => this.newTeamInput = newTeamInput }/>
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
