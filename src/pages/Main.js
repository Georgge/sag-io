import React, { Component } from 'react';
import FileList from '../componets/FilesList';
import Cover from '../componets/Cover';
import LateralPanel from '../componets/LateralPanel';
import '../assets/css/sagio.css';

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
    return (
      <div className="main">
        <div className={this.state.spinner
          ? "spinner-container"
          : "not-visible"}>
          <div className="spinner"></div>
        </div>
        <LateralPanel />
        <Cover current={fileKey} />
        <FileList
          SagIoDB={this.props.SagIoDB}
          directory={this.props.directory}
          handleCurrent={this._handleCurrent}
          spinner={this.spinner}
          spinnerStatus={this.state.spinner}/>
      </div>
    )
  }
}
