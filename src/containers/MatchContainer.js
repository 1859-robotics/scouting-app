import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import api from "../services/vexdb.js"

import DataTable from "../components/DataTable.js"
import TeamContainer from "./TeamContainer.js"
import List from "../components/List.js"

const getTeams = (m) => {
  return [ m.red1, m.red2, m.blue1, m.blue2, (m.blue3 && m.blue3), (m.red3 && m.red3) ]
}

class MatchContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    // const teams = getTeams(this.state.match)
    api.getTeams({division: this.state.division, matchnum: this.state.matchnum}).then(
      (results) => {

        this.setstate({teams})
      }
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      match: nextProps.matchData || {},
      division: nextProps.division,
      matchnum: nextProps.matchnum,
      teams: prevState.teams || []
    }
  }

  render() {

    const teamContainers = this.state.teams.map((team, i) => (
      <TeamContainer number={ team.number }  key={ i }/>
    ))

    return (
      <div>
        <Link to="/app/matches/">{ "<" } Matches</Link>
        <h1>{ this.state.division + " - " + this.state.matchnum }</h1>
        <div>
          { this.state.teams && teamContainers }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const division = ownProps.match.params.division
  const matchnum = ownProps.match.params.matchnum

  if(state.matches.find((team) => team.division === division && team.matchnum === matchnum)) {
    return {
      division,
      matchnum,
      matchData: state.matches.find((team) => team.division === division && team.matchnum === matchnum)
    }
  } else {
    return {
      division,
      matchnum,
    }
  }
}

export default connect(mapStateToProps)(MatchContainer)
