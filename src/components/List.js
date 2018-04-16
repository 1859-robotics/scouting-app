import React, { Component } from 'react';
import { Link } from "react-router-dom"

import SearchBar from "./SearchBar"

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredList: props.list,
    }

  }

  render() {
    const listItems = this.state.filteredList.map((item) => (
      <li>
        <Link to={ this.props.linkURL + item[this.props.label] }>{ item[this.props.label] }</Link>
      </li>
    ))
    return (
      <div>
        <SearchBar />
        <ul>
          { listItems }
        </ul>
      </div>
    )
  }
}
