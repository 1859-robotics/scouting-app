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
    let tHead, tBody
    if(this.state.yLabels) {
      tHead = (
        <thead>
          <tr>
            { this.state.yLabels.map((label, i) => (
              <td key={ i }>{ label }</td>
            )) }
          </tr>
        </thead>
      )
    }
    if(this.state.data.constructor === Object) {
      tBody = []
      Object.keys(this.state.data).forEach((item, i) => {
        if(!(this.state.data[item].constructor === Array)) {
          tBody.push(
            <td key={ tBody.length }>{ this.state.data[item] || "" }</td>
          )
        } else {
          tBody.push(
            <tr key={ i }>
              {
                this.state.xLabels.constructor === Array ? (
                  this.state.xLabels.map((item, j) => (
                    <td key={ j }>{ this.state.data[this.state.xLabels[j]] }</td>
                  ))
                ) : (
                  this.state.yLabels.map((label, j) => (
                    <td key={ j }>{ this.state.data[label] || "" }</td>
                  ))
                )
              }
            </tr>
          )
        }
      })
    }
    if(this.state.xLabels) {

    }

    return (
      <table>
        { tHead || ""}
        <tbody>
          { tBody }
        </tbody>
      </table>
    )
  }
}
