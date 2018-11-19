import React, { PureComponent } from 'react';
import Spinner from '../componets/Spinner';
import FileList from '../componets/FilesList';
import Cover from '../componets/Cover';
import LateralPanel from '../componets/LateralPanel';
import SoundPlayer from '../componets/SoundPlayer'

export default class Main extends PureComponent {
  state = {
    currentFile: false,
    picture: false,
    title: '',
    artist: '',
    path: '',
    file: '',
    format: '',
    spinner: false,
  }

  spinner = () => {
    if (!this.state.spinner)
      this.setState({ spinner: true })
    else
      this.setState({ spinner: false })
  }

  _handleCurrent = (fileKey, picture, title, artist) => {
    this.setState({ currentFile: fileKey });
  }

  setValues = (picture, title, artist, path, file, format) => {
    this.setState({
      picture,
      title,
      artist,
      path,
      file,
      format,
    })
    this.spinner();
  }

  render() {
    const fileKey = this.state.currentFile;
    const data = this.state;
    const spinnerState = this.state.spinner;
    return (
      <div className="main">
        <Spinner spinnerState={spinnerState} />
        <LateralPanel />
        <Cover current={fileKey} setValues={this.setValues} />
        <FileList
          SagIoDB={this.props.SagIoDB}
          directory={this.props.directory}
          handleCurrent={this._handleCurrent}
          spinner={this.spinner} />
        <SoundPlayer soundData={data} spinner={this.spinner} />
      </div>
    )
  }
}
