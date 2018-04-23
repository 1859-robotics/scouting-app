import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setTeamNote, addTeam, setTeam } from "../actions/teams.js"
import api from "../services/vexdb.js"

import DataTable from "../components/DataTable.js"
import List from "../components/List/List.js"

class Settings extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      
    }
  }

  render() {
    return (
      <div>
        <Link to="/app/teams/">{ "<" } Teams</Link>
        <h1>Settings</h1>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(mapStateToProps)(Settings)
