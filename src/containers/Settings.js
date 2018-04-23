import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setSettings } from "../actions/settings.js"
import api from "../services/vexdb.js"

class Settings extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      settings: nextProps.settings
    }
  }

  setSetting(e, setting) {
    this.setState({ setting: e.target.value })
  }

  saveSettings(e) {
    this.props.dispatch(setSettings({ ...this.state.settings }))
  }

  render() {
    const inputs = Object.keys(this.state.settings).map((key, i) => (
      <div key={ i }>
        <p>{ key }: </p>
        <input type="text" defaultValue={ this.state.settings[key] }
               onChange={ e => this.setSetting(e, key) }/>
      </div>
    ))
    return (
      <div>
        <Link to="/app/teams/">{ "<" } Teams</Link>
        <h1>Settings</h1>
        { inputs }
        <button onClick={ this.saveSettings.bind(this) }>Save Settings</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

export default connect(mapStateToProps)(Settings)
