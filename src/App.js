import React, { Component } from 'react';
import Main from './pages/Main';
import LoadDirectory from './pages/LoadDirectory';
import './App.css';

const { dialog } = window.require('electron').remote;

class App extends Component {
  state = {
    directoryIsLoad: false,
    directory: '',
  }

  openDialog = (e) => {
    const directory = dialog.showOpenDialog({ 
      properties: ['openDirectory']
    });
    if (directory) {
      localStorage.setItem('localDirectory', directory);
      this.setState({
        directoryIsLoad: true,
        directory,
      });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.directoryIsLoad
          ? <Main />
          : <LoadDirectory getDirectory={this.openDialog} />
        }
      </div>
    );
  }
}

export default App;
