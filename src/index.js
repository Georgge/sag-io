const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 680,
    title: app.getName(),
  };

  win = new BrowserWindow(windowOptions);
  win.loadFile('./src/app.html');
  // win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
