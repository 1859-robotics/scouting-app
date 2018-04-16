import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addTeams } from "../actions/teams.js"
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
        this.props.dispatch(addTeams(results))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      teams: nextProps.teams
    }
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
            <p>Getting Teams</p>
          </div>
        )}
        <button onClick={ () => {  } }>
          Add new Team
        </button>
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
