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
    console.log(this.state.baseFiles.length);
    return (
      <div className="files-container">
        
      </div>
    );
  }
};
