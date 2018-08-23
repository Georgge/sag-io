let counter = 0;
let totalElement = 0;
export const spinner = document.querySelector('.activity-spinner');
export const editor = document.querySelector('.files-editor');

export const documentCheck = (total) => {
  totalElement = total;
  counter += 1;
  spinner.classList.remove('not__visible');
  if (counter === totalElement) {
    spinner.classList.add('not__visible');
    editor.classList.remove('not__visible');
    counter = 0;
    totalElement = 0;
  }
};

export const renderFolderTemplate = (directoryData, elements) => {
  window.onload = documentCheck(elements);
  const filesScreen = document.querySelector('.files-screen');
  const folderTemplate = document.querySelector('#folder-template');
  const folderContainer = folderTemplate.content.querySelector('.folder-container');
  const folderName = folderTemplate.content.querySelector('.folder--icon-tag');
  folderContainer.id = directoryData.did;
  folderName.textContent = directoryData.name;

  const clone = document.importNode(folderTemplate.content, true);
  filesScreen.appendChild(clone);
};

export const renderTrackTemplate = (fileData, elements) => {
  window.onload = documentCheck(elements);
  const filesScreen = document.querySelector('.files-container');
  const trackTemplate = document.querySelector('#track-template');
  const trackContainer = trackTemplate.content.querySelector('.track-container');
  const labels = trackTemplate.content.querySelectorAll('.disc--cover-tag');
  const icon = trackTemplate.content.querySelector('.disc--cover__icon');
  const img = trackTemplate.content.querySelector('img');
  trackContainer.id = fileData.tid;

  if (fileData.title) {
    labels[0].textContent = fileData.title;
  } else { labels[0].textContent = fileData.name; }

  if (fileData.artist !== false) {
    labels[1].textContent = fileData.artist;
  } else { labels[1].textContent = ''; }

  if (fileData.image !== false) {
    icon.classList.add('not__visible');
    img.classList.remove('not__visible');
    const imgBuffer = fileData.image.imageBuffer;
    const { mime } = fileData.image;
    const to64 = new Buffer(imgBuffer).toString('base64');
    img.src = `data:image/${mime};base64,${to64}`;
  } else {
    img.classList.add('not__visible');
    icon.classList.remove('not__visible');
  }

  const clone = document.importNode(trackTemplate.content, true);
  filesScreen.appendChild(clone);
};
