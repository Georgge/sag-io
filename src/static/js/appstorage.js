const Loki = require('lokijs');
const { LocalStorage } = require('node-localstorage');
const fs = require('fs');
const uniqid = require('uniqid');

// global variables
const localStorage = new LocalStorage('./src/temp/scratch');
const db = new Loki('loki_db.json');
const item = db.addCollection('files');


const getParentPath = () => {
  const parentPath = localStorage.getItem('parent_path');
  const initialScreen = document.querySelector('.initial-screen');
  const filesScreen = document.querySelector('.files-screen');

  if (parentPath) {
    initialScreen.classList.add('not__visible');
    filesScreen.classList.remove('not__visible');
    return (parentPath);
  }
  return (null);
};

const setParentPath = (value) => {
  localStorage.setItem('parent_path', value);
  const parentPath = getParentPath();
  return (parentPath);
};

const getContent = () => {
  const parentPath = getParentPath();
  fs.readdir(parentPath, (err, files) => {
    if (err) {
      return console.log(`Unable to scan directory: ${err}`);
    }
    files.forEach((file) => {
      fs.lstat(parentPath, (err, stats) => {
        if (err) {
          return console.log(err);
        }
        console.log(`type: ${stats.isFile()}`);
        console.log(`type: ${stats.isDirectory()}`);
      });
      console.log(file);
    });
    console.log(files);
    return files;
  });
};
