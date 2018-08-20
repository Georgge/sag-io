const resolution = getParentPath();
console.log(resolution);
const { dialog } = require('electron').remote;

function openFileDialog() {
  let response = null;

  dialog.showOpenDialog({ properties: ['openDirectory'] }, (value) => {
    response = setParentPath(value);
  });
}

const folderButton = document.getElementById('button-folder');
folderButton.addEventListener('click', openFileDialog, false);
