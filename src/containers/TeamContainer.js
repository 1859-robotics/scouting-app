import React, { Component } from 'react';
import { connect } from 'react-redux'

import { setTeamNote, addTeam, setTeam } from "../actions/teams.js"
import api from "../services/vexdb.js"

import DataTable from "../components/DataTable.js"

class TeamContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
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
      number: (nextProps.number || nextProps.match.params.number),
      stats: nextProps.stats || {},
      matches: nextProps.matches || {},
      teamInfo: nextProps.teamInfo || {},
      userInputData: {
        notes: "",
        auton: {
          works: false,
          points: 0
        },
        ...nextProps.userInputData
      }
    }
  }

  setNote(e) {
    const state = { ...this.state }
    state.userInputData.note = e.target.value
    this.setState({ userInputData: state.userInputData })
  }

  componentWillUnmount() {
    this.props.dispatch(setTeam(this.state))
    alert("hi")
  }

  render() {
    return (
      <div>
        <h1>{ this.state.number + " - " + (!this.state.teamInfo ? "" : this.state.teamInfo.team_name) }</h1>

        <textarea placeholder="notes on team"
                  value={ this.state.userInputData.note }
                  onChange={ this.setNote.bind(this) }>

        </textarea>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const number = (ownProps.number || ownProps.match.params.number)
  if(state.teams.find((team) => team.number === number)) {
    return {
      number,
      ...state.teams.find((team) => team.number === number)
    }
  } else {
    return {
      number
    }
  }
}

export default connect(mapStateToProps)(TeamContainer)
