import React, { Component, PureComponent } from 'react';
import { List } from 'react-virtualized';
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
    this.setState({
      baseFiles: content,
      isLoading: true,
    })
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

  rowRenderer = ({index, key, style}) => {
    console.log(index);
    return (
      <div key={key} style={style} className="list-item">
        {this.state.baseFiles[index]}
      </div>
    )
  }

  componentDidMount () {
    if (this.state.baseFiles.length === 0)
      this.getFiles();
  }

  render() {
    console.log(this.state.baseFiles.length);
    return (
      <div className="files-container">
        <List
          width={776}
          height={384}
          rowCount={this.state.baseFiles.length}
          rowHeight={20}
          rowRenderer={this.rowRenderer}
          />
      </div>
    );
  }
};
