import Loki from 'lokijs';
import { LocalStorage } from 'node-localstorage';
import fs from 'fs';
import uniqid from 'uniqid';
import { renderFolderTemplate } from './renders/render';


// global variables
const localStorage = new LocalStorage('./src/temp/scratch');
const db = new Loki('loki_db.json');
const item = db.addCollection('files');

const getContent = (pathValue) => {
  const parentPath = pathValue;
  fs.readdir(parentPath, (err, files) => {
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    files.forEach((file) => {
      const fullPath = `${parentPath}/${file}`;
      fs.lstat(fullPath, (err, stats) => {
        if (err) {
          return console.log(err);
        }
        if (stats.isFile()) {
          console.log(`file: ${stats.isFile()}`);
        } else if (stats.isDirectory()) {
          const directoryData = {
            did: uniqid(),
            name: file,
            type: 'directory',
            full_path: fullPath,
          };

          item.insert(directoryData);
          renderFolderTemplate(directoryData);
        }
      });
      console.log(file);
    });
    console.log(files);
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

  return (null);
};

const setParentPath = (value) => {
  localStorage.setItem('parent_path', value);
  const parentPath = getParentPath();
  return (parentPath);
};
