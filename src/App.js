import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import Main from './pages/Main';
import LoadDirectory from './pages/LoadDirectory';
import './App.css';

const { dialog } = window.require('electron').remote;
const dbName = 'sagio-test'
const SagIoDB = new PouchDB(dbName);

class App extends Component {
  state = {
    directoryIsLoad: false,
    directory: '',
  }

  basicDirectories () {
    const dir = {
      _id: 'sagio-dir',
      directory: false,
    }
    const fil = {
      _id: 'sagio-fil',
      files: {}
    }

    SagIoDB.put(dir);
    SagIoDB.put(fil);
  }

  getDirectory () {
    SagIoDB.get('sagio-dir').then(doc => {
      if (doc.directory) {
        console.log(doc.directory)
        this.setState({
          directoryIsLoad: true,
          directory: doc.directory,
        });  
      }
    })
  }

  updateDirectory (newDirectory) {
    console.log(newDirectory);
    SagIoDB.get('sagio-dir')
    .then(doc => {
      doc.directory = newDirectory[0];
      return SagIoDB.put(doc);
    })
    .then(() => {
      return SagIoDB.get('sagio-dir');
    })
    .then(doc => {
      console.log(doc);
    })
    .catch(error => {
      console.log(error);
    })
  }

  openDialog = (e) => {
    const directory = dialog.showOpenDialog({ 
      properties: ['openDirectory']
    });
    if (directory) {
      this.updateDirectory(directory);
      localStorage.setItem('localDirectory', directory);
      this.getDirectory();
    }
  }

  componentDidMount () {
    SagIoDB.info()
      .then(response => {
        if (response.doc_count === 0)
          this.basicDirectories();
        else
          this.getDirectory()
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.directoryIsLoad
          ? <Main sagioDB={SagIoDB} directory={this.state.directory} />
          : <LoadDirectory getDirectory={this.openDialog} />
        }
      </div>
    );
  }
}

export default App;
