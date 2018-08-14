const { dialog } = require('electron').remote;

function openFileDialog() {
  dialog.showOpenDialog({ properties: ['openDirectory'], }, (value) => {
    console.log(value);
  });
}

const folderButton = document.getElementById('button-folder');
folderButton.addEventListener('click', openFileDialog, false);
