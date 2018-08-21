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

export const renderTrackTemplate = (fileData) => {
  const filesScreen = document.querySelector('.files-screen');
  const trackTemplate = document.querySelector('#track-template');
  const trackContainer = trackTemplate.content.querySelector('.track-container');
  const labels = trackTemplate.content.querySelectorAll('.disc--cover-tag');
  trackContainer.id = fileData.tid;

  if (fileData.title) { labels[0].textContent = fileData.title; }
  else { labels[0].textContent = fileData.name; }

  if (fileData.artist) { labels[1].textContent = fileData.artist; }
  else { labels[0].textContent = ''; }

  const clone = document.importNode(trackTemplate.content, true);
  filesScreen.appendChild(clone);
};
