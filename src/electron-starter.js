// Path firstelectronapp/src/electron-starter.js
// NodeJS Programming
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app      = electron.app;
const ipcMain  = electron.ipcMain;
const url      = require('url')
const path     = require('path')
var BlynkLib = require('blynk-library'); // Import blynk
var blynk    = new BlynkLib.Blynk('i5e2KXP08krOUS2Aqn0QOBYzOBpIxWL8'); // Regis
var iot_led  = new blynk.WidgetLED(2); // VirtualPin V2
const Gpio = require('onoff').Gpio;
const hw_led = new Gpio(17, 'out');
const hw_button = new Gpio(4, 'in', 'both', {debounceTimeout: 10});


var mainWindow;  // MainWindow Object

app.on('ready', () => {
    console.log("App is ready!!!")
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
    // console.log("Render")

    // Trigger from renderer process
    var toggle = false
    ipcMain.on('setLed', (event, message) => {
        console.log("At mainProcess " + toggle)
        if (toggle) {
            iot_led.turnOn()
            hw_led.writeSync(1)
        } else {
            iot_led.turnOff()
            hw_led.writeSync(0)
        }
        toggle = !toggle
    })
});

