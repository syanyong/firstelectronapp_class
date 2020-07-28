// Path firstelectronapp/src/electron-starter.js
// NodeJS Programming
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app      = electron.app;
const url      = require('url')
const path     = require('path')

var mainWindow;  // MainWindow Object

app.on('ready', () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, height: 480, webPreferences: { nodeIntegration: true }
    });

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
    });
    mainWindow.loadURL(startUrl);
    console.log("Render")
});