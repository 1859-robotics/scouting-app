import React, { Component } from 'react';
import { connect } from 'react-redux'

import { setTeamNote } from "../actions/teams.js"
import api from "../services/vexdb.js"

import List from "../components/List.js"

class TeamList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(nextProps) {

    return null
  }

  render() {
    return (
      <div>
        <List label="number"
              list={ this.state.list }
              linkURL={ "/app/teams/" } />
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

export default connect(mapStateToProps)(TeamList)
