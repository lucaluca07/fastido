/* eslint global-require: off, no-console: off */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { menubar } from 'menubar';
import mainWindow from './main/window/mainWindow';

const { create: createMainWindow, show: showMainWindow } = mainWindow;

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const mb = menubar({
  index: `file://${__dirname}/menubar.html`,
  browserWindow: {
    width: 300,
    height: 680,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  },
});

mb.on('ready', () => {
  console.log(11111);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createMainWindow).catch(console.log);

app.on('activate', () => {
  showMainWindow();
});
