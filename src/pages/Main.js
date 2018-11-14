import React, { Component } from 'react';
import Spinner from '../componets/Spinner';
import FileList from '../componets/FilesList';
import Cover from '../componets/Cover';
import LateralPanel from '../componets/LateralPanel';

export default class Main extends Component {
  state = {
    currentFile: false,
    spinner: false,
  }

  spinner = () => {
    if (!this.state.spinner)
      this.setState({ spinner: true })
    else
      this.setState({ spinner: false })
  }

  _handleCurrent = (fileKey) => {
    this.setState({ currentFile: fileKey });
  }

  render() {
    const fileKey = this.state.currentFile;
    const spinnerState = this.state.spinner;
    return (
      <div className="main">
        <Spinner spinnerState={spinnerState} />
        <LateralPanel />
        <Cover current={fileKey} />
        <FileList
          SagIoDB={this.props.SagIoDB}
          directory={this.props.directory}
          handleCurrent={this._handleCurrent}
          spinner={this.spinner} />
      </div>
    )
  }
}
