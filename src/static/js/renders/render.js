export const renderFolderTemplate = (directoryData) => {
  const filesScreen = document.querySelector('.files-screen');
  const folderTemplate = document.querySelector('#folder-template');
  const folderContainer = folderTemplate.content.querySelector('.folder-container');
  const folderName = folderTemplate.content.querySelector('.folder--icon-tag');
  folderContainer.id = directoryData.did;
  folderName.textContent = directoryData.name;

  const clone = document.importNode(folderTemplate.content, true);
  filesScreen.appendChild(clone);
};
