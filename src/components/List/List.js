import React, { Component } from 'react';
import { Link } from "react-router-dom"

import SearchBar from "../SearchBar"

import "./style.css"

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
      let found = false
      for(let i = 0; i < this.props.search.length; i++) {
        if(item[this.props.search[i]]) {
          if(item[this.props.search[i]].constructor === String) {
            if(item[this.props.search[i]].length !== 0 &&
              item[this.props.search[i]].toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) found = true
            } else {
              if(item[this.props.search[i]].toString().length !== 0 &&
              item[this.props.search[i]].toString().toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) found = true
            }
        }
      }
      return found
    }, this);
    this.setState({ filteredList })
  }

  render() {
    const listItems = this.state.filteredList.map((item, i) => {
      const labels = this.props.label.map((label, j) => (
        <span key={ j }
              style={{ width: "200px" }}>
          { item[label] != undefined ? item[label] : "-" }
        </span>
      ))
      const url = this.props.linkURL + this.props.link.reduce((acc, cur) => acc + item[cur] + "/", "")
      return (
        <li key={ i }>
          <Link to={ url }
                style={{ display: "inline-flex" }}>
            { labels }
          </Link>
        </li>
      )
    })
    const headLabels = this.props.label.map((label, i) => (
      <span key={ i }
            style={{ width: "200px", display: "inline-block" }}>
        { label }
      </span>
    ))
    return (
      <div>
        <SearchBar onChange={ (e) => this.filterList(e) }/>
        <ul>
          <li style={{ display: "inline-flex" }}>
            { headLabels }
          </li>
          { listItems }
        </ul>
      </div>
    )
  }
}
