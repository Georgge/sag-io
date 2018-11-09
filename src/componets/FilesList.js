import React, { Component, PureComponent } from 'react';
import MiniCover from './MiniCover';

const NodeID3 = window.require('node-id3');
const uniqid = require('uniqid');
const raedDir = window.require('readdir');

export default class FileList extends PureComponent {
  state = {
    isLoading: false,
    baseFiles: [],
    files: {
      id: {
        tags: false,
      }
    }
  }

  getFiles = () => {
    const directoryPath = localStorage.getItem('localDirectory');
    const content = raedDir.readSync(directoryPath);
    if (!this.state.isLoading) {
      this.setState({
        baseFiles: content,
        isLoading: true,
      })
    }
    return content
  }

  getTags = (id, file) => {
    const basePath = localStorage.getItem('localDirectory');
    const tags = NodeID3.read(`${basePath}/${file}`);
    return ({
      [id]: {
        title: tags.title || false,
        image: tags.image || false,
      }
    });
  }

  componentDidMount () {
    this.getFiles();
  }

  render() {
    const { isLoading, baseFiles } = this.state;
    const { spinnerS, spinnerF} = this.props.spinner;
    console.log(this.state.baseFiles.length);
    return (
      <div className={spinnerS ? "spinner-container" : "files-container"}>
        {spinnerS ? <div className="spinner"></div> : <p>Songs</p>}
        {isLoading
          ? <div>{(
              baseFiles.map(file => {
                const id = uniqid('sagio-');
                console.log(file);
                return (
                  <div key={id} className="mini-cover">
                    <MiniCover
                      file={file}
                      id={id}
                      getTags={this.getTags}
                    />
                  </div>
                )
              }) this.state.baseFiles;
            )}</div>
          : <p>end</p>
        }
      </div>
    );
  }
};
