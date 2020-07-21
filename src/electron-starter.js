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

    // Send message to frontend every 3 seconds
    var toggle = 0
    setInterval(function(){ 
        mainWindow.webContents.send("buttonStatus", toggle)
        toggle = !toggle
    }, 3000);
});

