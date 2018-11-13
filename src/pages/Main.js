import React, { Component } from 'react';
import FileList from '../componets/FilesList';
import Cover from '../componets/Cover';
import LateralPanel from '../componets/LateralPanel';
import '../assets/css/sagio.css';

export default class Main extends Component {
  state = {
    currentFile: false,
  }

  _handleCurrent = (fileKey) => {
    this.setState({ currentFile: fileKey });
  }

  render() {
    const fileKey = this.state.currentFile;
    return (
      <div className="main">
        <LateralPanel />
        <Cover current={fileKey} />
        <FileList
          sagioDB={this.props.sagioDB}
          directory={this.props.directory}
          handleCurrent={this._handleCurrent}/>
      </div>
    )
  }
}
