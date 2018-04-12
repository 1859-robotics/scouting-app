import React, { Component } from 'react';


export default class DataTable extends Component {
  constructor(props) {
    super(props)
    let keys
    if(props.data.constructor === Array) {
      keys = Object.keys(props.data[0])
    } else if(props.data.constructor === Object) {
      keys = Object.keys(props.data)
    }
    this.state = {
      data: props.data,
      keys,
      sortedKeys: keys,
    }
  }

  render() {
    const theads = this.state.sortedKeys.map((header, i) => (
      <th key={ "header" + i }>{ header }</th>
    ))
    let trows
    if(this.state.data.constructor === Array) {
      trows = this.state.data.map((key, i) => (
        <tr key={"row" + i}>
          {
            this.state.sortedKeys.map((value, j) => (
              <td key={"col" + j}>
                { key[value] }
              </td>
            ))
          }
        </tr>
      ))
    } else if(this.state.data.constructor === Object) {

    }

    return (
      <table>
        <thead>
          <tr>
            { theads }
          </tr>
        </thead>
        <tbody>
          { trows }
        </tbody>
      </table>
    )
  }

}
