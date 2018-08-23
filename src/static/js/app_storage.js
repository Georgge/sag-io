import Loki from 'lokijs';
import { LocalStorage } from 'node-localstorage';
import fs from 'fs';
import uniqid from 'uniqid';
import { renderFolderTemplate, renderTrackTemplate } from './renders/render';
import { readId3Tags } from './id3_interaction';


// global variables
const localStorage = new LocalStorage('./src/temp/scratch');
const db = new Loki('loki_db.json');
const item = db.addCollection('files');

const getContent = (pathValue) => {
  const parentPath = pathValue;
  const activityIndicator = document.querySelector('.files-editor');
  fs.readdir(parentPath, (err, files) => {
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    console.log(files.length);
    files.forEach((file) => {
      const fullPath = `${parentPath}/${file}`;
      fs.lstat(fullPath, (err, stats) => {
        if (err) {
          return console.log(err);
        }
        if (stats.isFile()) {
          const tagResponse = readId3Tags(fullPath);
          const fileData = {
            tid: uniqid(),
            name: file, // file name not metadata name
            title: tagResponse.title || tagResponse.raw.TIT2,
            type: 'file',
            full_path: fullPath,
            artist: tagResponse.artist || tagResponse.raw.TPE1,
            image: tagResponse.image || false,
            id3: tagResponse || false,
          };

          item.insert(fileData);
          renderTrackTemplate(fileData, files.length);
        } else if (stats.isDirectory()) {
          const directoryData = {
            did: uniqid(),
            name: file,
            type: 'directory',
            full_path: fullPath,
          };
          item.insert(directoryData);
          renderFolderTemplate(directoryData, files.length);
        }
      });
    });
  });
};

export const getParentPath = () => {
  const parentPath = localStorage.getItem('parent_path');
  const initialScreen = document.querySelector('.initial-screen');
  const filesScreen = document.querySelector('.files-screen');

  if (parentPath) {
    initialScreen.classList.add('not__visible');
    filesScreen.classList.remove('not__visible');
    getContent(parentPath);
    return (parentPath);
  }

  return false;
};

export const setParentPath = (value) => {
  localStorage.setItem('parent_path', value);
  const parentPath = getParentPath();
  return (parentPath);
};
