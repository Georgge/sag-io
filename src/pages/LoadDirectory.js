import React, { Component } from 'react'

export default class LoadDirectory extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.getDirectory}>Load Directory</button>
      </div>
    )
  }
}
