import React, { PureComponent } from 'react';
import { MiniCover } from './MiniCover';

//const NodeID3 = window.require('node-id3');
const uniqid = require('uniqid');
const readDir = window.require('readdir');

export default class FileList extends PureComponent {
  state = {
    isLoading: false,
    baseFiles: [],
  }

  getFiles = () => {
    const directoryPath = this.props.directory;
    const content = readDir.readSync(directoryPath);
    this.setState({
      baseFiles: content,
    });
  }

  componentDidMount () {
    if (this.state.baseFiles.length === 0) {
      this.getFiles();
    }
  }

  render() {
    const { baseFiles } = this.state;
    return (
      <div className="files-container">
        {baseFiles.map(file => {
          const id = uniqid()
            return (
              <div className="mini-cover"
                key={id}
                onClick={() => this.props.handleCurrent(id)}>
                <MiniCover
                  file={file}
                  directory={this.props.directory} />
              </div>
            )
          }) 
        }
      </div>
    );
  }
};
