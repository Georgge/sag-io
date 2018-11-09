import React, { Component } from 'react';
import FileList from '../componets/FilesList';
import '../assets/css/sagio.css';

export default class Main extends Component {
  render() {
    return (
      <div>
        <h1>Main</h1>
        <FileList />
      </div>
    )
  }
}
