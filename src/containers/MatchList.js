import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addMatches, setMaches } from "../actions/matches.js"
import api from "../services/vexdb.js"

import List from "../components/List.js"

class MatchList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    api.getTeams().then(
      (results) => {
        this.props.dispatch(addMatches(results))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      matches: nextProps.matches
    }
  }

  addNewTeam(e) {
    this.props.dispatch(setTeam({
      number: this.newTeamInput.value.toUpperCase()
    }))
  }

  render() {
    return (
      <div>
        {this.state.teams ? (
          <List label="matchnum"
                list={ this.state.matches }
                linkURL={ "/app/matches/" } />
        ) : (
          <div>
            <p>Getting Maches...</p>
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
    matches: state.matches
  }
}

export default connect(mapStateToProps)(MatchList)
