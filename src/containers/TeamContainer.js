import React, { Component } from 'react';
import { connect } from 'react-redux'

import { setTeamNote } from "../actions/teams.js"
import api from "../services/vexdb.js"

import DataTable from "../components/DataTable.js"

class TeamContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      number: props.number,
      stats: props.stats,
      matches: props.matches,
      teamInfo: props.teamInfo
    }
  }

  componentDidMount() {
    api.getStats(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "stats", value: results }))
      }
    )
    api.getMatches(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "matches", value: results }))
      }
    )
    api.getTeam(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "teamInfo", value: results }))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      number: nextProps.number,
      stats: nextProps.stats,
      matches: nextProps.matches,
      teamInfo: nextProps.teamInfo
    }
  }

  render() {
    return (
      <div>
        <h1>{ this.state.number }</h1>
        { this.state.matches &&
          <DataTable data={ this.state.matches} />
        }

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if(state.teams.find((team) => team.number === ownProps.number)) {
    return {
      number: ownProps.number,
      ...state.teams.find((team) => team.number === ownProps.number)
    }
  } else {
    return {
      number: ownProps.number
    }
  }
}

function mapStateToProps(state, ownProps) {
  if(state.teams.find((team) => team.number === ownProps.number)) {
    return {
      number: ownProps.number,
      ...state.teams.find((team) => team.number === ownProps.number)
    }
  } else {
    return {
      number: ownProps.number
    }
  }
}

export default connect(mapStateToProps)(TeamContainer)
