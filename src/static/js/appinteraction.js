const resolution = getParentPath();
console.log(resolution);
const { dialog } = require('electron').remote;

function openFileDialog() {
  let response = null;

  dialog.showOpenDialog({ properties: ['openDirectory'] }, (value) => {
    response = setParentPath(value);
  });
}

const renderFolderTemplate = (directoryData) => {
  const filesScreen = document.querySelector('.files-screen');
  const folderTemplate = document.querySelector('#folder-template');
  const folderContainer = folderTemplate.content.querySelector('.folder-container');
  const folderName = folderTemplate.content.querySelector('.folder--icon-tag');
  folderContainer.id = directoryData.did;
  folderName.textContent = directoryData.name;

  const clone = document.importNode(folderTemplate.content, true);
  filesScreen.appendChild(clone);
};

const folderButton = document.getElementById('button-folder');
folderButton.addEventListener('click', openFileDialog, false);
