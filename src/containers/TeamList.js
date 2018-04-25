import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addTeams, setTeam, setTeamNote } from "../actions/teams.js"
import api from "../services/vexdb.js"

import List from "../components/List/List.js"

const getColor = (match, number) => {
  return number === match.red1 || number === match.red2 || number === match.red3
         ? "red"
         : number === match.blue1 || number === match.blue2 || number === match.blue3
         ? "blue"
         : null
}

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
      teams: nextProps.teams,
      settings: nextProps.settings
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

  isAlliance(matches, number) {
    if(this.state.settings.userTeam) {
      let is = false
      matches.forEach((match) => {
        if(getColor(match, this.state.settings.userTeam) === getColor(match, number)) is = true
      })
      return is
    } else return false
  }

  isOpposition(matches, number) {
    if(this.state.settings.userTeam) {
      let is = false
      matches.forEach((match) => {
        if(getColor(match, this.state.settings.userTeam) && getColor(match, number) &&
          (getColor(match, this.state.settings.userTeam) !== getColor(match, number))) is = true
      })
      return is
    } else return false
  }

  render() {
    return (
      <div>

        <Link to="/app/matches/">{ "<" } Matches</Link>
        <br/>
        <button onClick={ this.getTeamDivisions.bind(this) }>Get Team Divisions & aliance data (will heccing destroy your computer)</button>
        <hr/>
        {this.state.teams ? (
          <List label={["number", "name", "divisions", "auton", "autonPoints", "allicance", "opposition"]}
                link={["number"]}
                search={["number", "name", "divisions", "auton", "autonPoints", "allicance", "opposition"]}
                list={ this.state.teams.map((team) => ({
                  number: team.number,
                  name: (team.teamInfo != null ? team.teamInfo.team_name : undefined),
                  divisions: (team.divisions != null ? team.divisions.join(", ") : undefined),
                  auton: (team.userInputData != null ? team.userInputData.autonWorks ? "works" : "doesn't" : undefined),
                  autonPoints: (team.userInputData != null ? team.userInputData.autonPoints : undefined),
                  allicance: team.matches ? this.isAlliance(team.matches, team.number) ? "yes a" : "no" : "No Data",
                  opposition: team.matches ? this.isOpposition(team.matches, team.number) ? "yes o" : "no" : "No Data",
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
    teams: state.teams,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(TeamList)
