import React, { PureComponent } from 'react'

export default class Spinner extends PureComponent {
  render() {
    return (
      <div>
        <div className={this.props.spinnerState
          ? "spinner-container"
          : "not-visible"}>
          <div className="spinner"></div>
        </div>
      </div>
    )
  }
}
