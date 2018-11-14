import React, { Component } from 'react'

export default class LoadDirectory extends Component {
  render() {
    return (
      <div className="load-container">
        <div
          onClick={this.props.getDirectory}
          className="load-button" >
          Load Directory
        </div>
      </div>
    )
  }
}
