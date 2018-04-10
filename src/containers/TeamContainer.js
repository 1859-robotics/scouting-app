import React, { Component } from 'react';
import api from "../services/vexdb.js"


export default class TeamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    }
  }

  componentDidMount() {
    api.getStats(this.state.number).then(
      (results) => {
        this.setState({stats: results})
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
