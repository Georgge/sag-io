const Redux = require('redux');
const { combineReducers } = require('redux');
const path = require('path');
const fs = require('fs');
const { dialog } = require('electron').remote;

let state = {
  path: null,
};

let store = Redux.createStore(reducers, state);

const reducers = combineReducers({

});

function pathReducer(state, action) {
  
}

function openFileDialog() {
  dialog.showOpenDialog({ properties: ['openDirectory'], }, (value) => {
    store.dispatch
    return (value);
  });
}

const folderButton = document.getElementById('button-folder');
let directory = folderButton.addEventListener('click', openFileDialog, false);

