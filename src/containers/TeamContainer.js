import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setTeamNote } from "../actions/teams.js"

import api from "../services/vexdb.js"


class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    }
  }



  componentDidMount() {
    api.getStats(this.state.number).then(
      (results) => {
        console.log(results)
        this.props.dispatch(setTeamNote(this.state.number, { key: "stats", value: results }))
      }
    )
  }

  render() {
    return (
      <div>
        <h1>{ this.state.number }</h1>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if(state.teams.some((team) => team.number === ownProps.number)) {
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
