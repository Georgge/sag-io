import React, { PureComponent } from 'react';
import Main from './pages/Main';
import { SagIoDB } from './store/Nedb';
import {
  createBasicCollections,
  cleanFiles,
  updateDirectory } from './store/Store';
import LoadDirectory from './pages/LoadDirectory';
import { CONSTANTS } from './config/Constants';
import './App.css';
import './assets/css/sagio.css'

const { dialog } = window.require('electron').remote;

class App extends PureComponent {
  state = {
    directory: '',
  }

  getDirectory = () => {
    cleanFiles();
    SagIoDB.findOne({ _id: CONSTANTS.DIRECTORY_COLLECTION_ID }, (error, doc) => {
      this.setState({ directory: doc.path })
    });
  }

  updateDirectory = (newDirectory) => {
    updateDirectory(newDirectory[0]);
    this.getDirectory();
  }

  openDialog = (e) => {
    const directory = dialog.showOpenDialog({ 
      properties: ['openDirectory']
    });
    if (directory) {
      this.updateDirectory(directory);
    }
  }

  componentDidMount () {
    SagIoDB.findOne({ _id: 'sagio-dir' }, (error, doc) => {
      if (doc === null) {
        createBasicCollections();
      } else {
        if (doc.path !== false)
          this.getDirectory();
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.directory
          ? <Main SagIoDB={SagIoDB} directory={this.state.directory} />
          : <LoadDirectory getDirectory={this.openDialog} />
        }
      </div>
    );
  }
}

export default App;
