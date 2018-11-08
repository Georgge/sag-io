import React, { Component } from 'react';
const uniqid = require('uniqid');
const raedDir = window.require('readdir');

export default class FileList extends Component {
  getFiles () {
    const directoryPath = localStorage.getItem('localDirectory');
    const content = raedDir.readSync(directoryPath);
    return content
  }

  render() {
    const files = this.getFiles();
    return (
      <div>
        <h3>Files:</h3>
        {
          files.map(file => {
            return (
              <div key={uniqid('sagio-')}>
                { file }
              </div>
            )
          })
        }
      </div>
    );
  }
};
