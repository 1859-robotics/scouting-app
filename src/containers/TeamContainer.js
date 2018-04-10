import React, { Component } from 'react';
import { connect } from 'react-redux'

import ReactTable from "react-table";
import 'react-table/react-table.css'

import { setTeamNote } from "../actions/teams.js"
import api from "../services/vexdb.js"


class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
      stats: props.stats
    }
  }



  componentDidMount() {
    api.getStats(this.state.number).then(
      (results) => {
        this.props.dispatch(setTeamNote(this.state.number, { key: "stats", value: results }))
      }
    )
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      number: nextProps.number,
      stats: nextProps.stats
    }
  }

  render() {
    return (
      <div>
        <h1>{ this.state.number }</h1>
        { this.state.stats && (
          <ReactTable data={ [this.state.stats] }
                      columns={ Object.keys(this.state.stats).map(stat => ({Header: stat, accessor: stat})) }>
          </ReactTable>
        ) }

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
