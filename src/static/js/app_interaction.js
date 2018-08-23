import { remote } from 'electron';
import { getParentPath, setParentPath } from './app_storage';
import { spinner } from './renders/render';


const resolution = getParentPath();
console.log(resolution);
if (resolution === false) {
  spinner.classList.add('not__visible');
}

const { dialog } = remote;

function openFileDialog() {
  let response = null;
  dialog.showOpenDialog({ properties: ['openDirectory'] }, (value) => {
    if (value) {
      response = setParentPath(value);
    }
  });
}

const folderButton = document.getElementById('button-folder');
folderButton.addEventListener('click', openFileDialog, false);
