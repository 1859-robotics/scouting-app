import React, { Component } from 'react';


export default class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      keys: Object.keys(props.data),
      sortedKeys: Object.keys(props.data),
    }
  }

  render() {
    const theads = this.state.sortedKeys((header, i) => (
      <th key={ "header" + i }>{ header }</th>
    ))
    return (
      <table>
        <thead>
          { theads }
        </thead>
      </table>
    )
  }

}
