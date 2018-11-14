import React, { Component } from 'react';
import Main from './pages/Main';
import LoadDirectory from './pages/LoadDirectory';
import { CONSTANTS } from './config/Constants';
import './App.css';
import './assets/css/sagio.css'

const Datastore = window.require('nedb');
const { dialog } = window.require('electron').remote;

const SagIoDB = new Datastore({
  filename: `./${CONSTANTS.DB_NAME}`,
  autoload: true,
});


class App extends Component {
  state = {
    directory: '',
  }

  basicDirectories () {
    SagIoDB.insert({
      _id: 'sagio-dir',
      path: false,
    })
    SagIoDB.insert({
      _id: 'sagio-files',
      files: []
    })
  }

  getDirectory = () => {
    SagIoDB.update(
      { _id: 'sagio-files' },
      { files: [] },
      { returnUpdatedDocs: true },
      ( err, numAffected, affectedDocuments, upsert ) => {
        console.log(affectedDocuments);
      }
    );

    SagIoDB.findOne({ _id: 'sagio-dir' }, (error, doc) => {
      this.setState({ directory: doc.path })
    });
  }

  updateDirectory = (newDirectory) => {
    SagIoDB.update(
      { _id: 'sagio-dir' },
      { path: newDirectory[0] },
      { returnUpdatedDocs: true },
      (error, numAffected, affectedDocuments, upsert) => {
        this.getDirectory();
      }
    );
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
        this.basicDirectories();
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
