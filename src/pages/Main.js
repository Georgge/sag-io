import React, { Component } from 'react';
import FileList from '../componets/FilesList';
import Cover from '../componets/Cover';
import LateralPanel from '../componets/LateralPanel';
import '../assets/css/sagio.css';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <LateralPanel />
        <Cover />
        <FileList />
      </div>
    )
  }
}
