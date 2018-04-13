import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlaceholder: true,
      placeholder: props.children || (<p>span</p>),
    }
  }

  handleChange(e) {
    if(e.target.value === "") {
      this.setState({ showPlaceholder: true })
    } else if(!this.state.placeholder) {
      this.setState({ showPlaceholder: false })
    }

    if(this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    return (
      <div>
        <input type="text"
               onChange={ this.handleChange.bind(this) } />
        <span>{ this.state.showPlaceholder }</span>
      </div>
    )
  }
}
