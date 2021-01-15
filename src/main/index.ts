const { app, BrowserWindow } = require('electron');

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  if(process.env.NODE_ENV === 'develepment') {
    mainWindow.loadURL('http://127.0.0.1:8080')
  } else {
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  }
})