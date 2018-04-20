import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import api from "../services/vexdb.js"
import { setMatch } from "../actions/matches.js"

import DataTable from "../components/DataTable.js"
import TeamContainer from "./TeamContainer.js"
import List from "../components/List.js"

const getTeams = (m) => {
  console.log(m);
  const result = []
  m.blue1 && result.push(m.blue1)
  m.red1  && result.push(m.red1)
  m.blue2 && result.push(m.blue2)
  m.red2  && result.push(m.red2)
  m.blue3 && result.push(m.blue3)
  m.red3  && result.push(m.red3)

  return result
}

class MatchContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    api.getMatches({division: this.state.division, matchnum: this.state.matchnum, round: this.state.round}).then(
      (results) => {
        this.props.dispatch(setMatch(results))
        this.setState({ teams: getTeams(results) })
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {

  }


  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      match: nextProps.matchData || {},
      division: nextProps.division,
      matchnum: nextProps.matchnum,
      round: nextProps.round,
      teams: prevState.teams || []
    }
  }

  render() {
    console.log(this.state.teams);

    const teamContainers = this.state.teams.map((team, i) => {
      return (
        <div style={{ marginBottom: "64px", borderBottom: "1px solid" }}>

          <TeamContainer number={ team }  key={ i }/>
        </div>
      )
    })

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
  const round = ownProps.match.params.round

  if(state.matches.find((match) => match.division === division &&
                                   match.matchnum === parseInt(matchnum, 10) &&
                                   match.round === parseInt(round, 10))) {
    return {
      division,
      matchnum,
      round,
      matchData: state.matches.find((match) => match.division === division && match.matchnum === parseInt(matchnum, 10))
    }
  } else {
    return {
      division,
      matchnum,
      round
    }
  }
}

export default connect(mapStateToProps)(MatchContainer)
