import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addMatches, setMatch } from "../actions/matches.js"
import api from "../services/vexdb.js"

import List from "../components/List.js"

class MatchList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    api.getMatches().then(
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

  render() {
    return (
      <div>
        {this.state.matches ? (
          <List label="matchnum"
                list={ this.state.matches }
                linkURL={ "/app/matches/" } />
        ) : (
          <div>
            <p>Getting Maches...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    matches: state.matches
  }
}

export default connect(mapStateToProps)(MatchList)
