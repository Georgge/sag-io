import React, { Component } from 'react'

export default class Cover extends Component {
  render() {
    console.log('cover');
    console.log(this.props.current);
    return (
      <div className="cover-container">
        <div className="cover">
          <div className="cover--image">
            <div className="cover--image__without"></div>
          </div>
        </div>
        <div className="cover-data"></div>
      </div>
    )
  }
}
