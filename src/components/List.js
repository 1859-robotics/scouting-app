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
      return item.number.indexOf(e.target.value) !== -1
    });
    this.setState({ filteredList })
  }

  render() {
    const listItems = this.state.filteredList.map((item, i) => (
      <li key={ i }>
        <Link to={ this.props.linkURL + item[this.props.label] }>{ item[this.props.label] }</Link>
      </li>
    ))
    return (
      <div>
        <SearchBar onChange={ this.filterList.bind(this) }/>
        <ul>
          { listItems }
        </ul>
      </div>
    )
  }
}
