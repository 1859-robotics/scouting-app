import React, { Component } from 'react';


export default class DataTable extends Component {
  constructor(props) {
    super(props)
    let yLabels = props.data.constructor === Array
                  ? []
                  : props.data.constructor === Object
                    ? Object.keys(props.data)
                    : []
    let xLabels = []
    for(const key in props.data) {
      xLabels.concat(Object.keys(props.data[key]))
    }
    this.state = {
      data: props.data,
      yLabels,
      xLabels,

    }
  }

  render() {

    return (
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    )
  }

}
