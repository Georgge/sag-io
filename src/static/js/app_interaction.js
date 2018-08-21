import { remote } from 'electron';
import { getParentPath } from './app_storage';

const resolution = getParentPath();
console.log(resolution);
const { dialog } = remote;

function openFileDialog() {
  let response = null;
  dialog.showOpenDialog({ properties: ['openDirectory'] }, (value) => {
    response = setParentPath(value);
  });
}

const folderButton = document.getElementById('button-folder');
folderButton.addEventListener('click', openFileDialog, false);
