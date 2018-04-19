import React, { Component } from 'react';
import { Link } from "react-router-dom"

import SearchBar from "./SearchBar"

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      filteredList: nextProps.list,
    }
  }

  filterList(e) {
    let filteredList = this.props.list.filter((item) => {
      return item[this.props.link].indexOf(e.target.value) !== -1
    });
    this.setState({ filteredList })
  }

  render() {
    const listItems = this.state.filteredList.map((item, i) => {
      const labels = this.props.label.map((label, j) => (
        <span key={ j }
              style={{ width: "100px" }}>
          { item[label] }
        </span>
      ))

      return (
        <li key={ i }>
          <Link to={ this.props.linkURL + item[this.props.link] }
                style={{ display: "flex" }}>
            { labels }
          </Link>
        </li>
      )
    })
    const headLabels = this.props.label.map((label, i) => (
      <span key={ i }
            style={{ width: "100px", display: "inline-block" }}>
        { label }
      </span>
    ))
    return (
      <div>
        <SearchBar onChange={ this.filterList.bind(this) }/>
        <ul>
          <li>{ headLabels }</li>
          { listItems }
        </ul>
      </div>
    )
  }
}
