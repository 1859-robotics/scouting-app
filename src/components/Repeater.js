import React, { Component } from 'react';


export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: props.defaultValue || []
    }
  }

  render() {
    const instances = this.state.values.map((value) => (
      this.props.children
    ))
    return (
      <div>

      </div>
    )
  }

}
