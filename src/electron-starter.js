// NodeJS Programming
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app      = electron.app;
const url      = require('url')
const path     = require('path')

var mainWindow;  // MainWindow Object
//#region include blynk library
var BlynkLib = require('blynk-library'); 
var blynk = new BlynkLib.Blynk('TX26D5S6AHqEgY_jrl_icva1oTOcYUqu'); 
var iot_led = new blynk.WidgetLED(2); // VirtualPin V2
var iot_button = new blynk.VirtualPin(3); 
//#endregion include blynk library

//#region onoff library
const Gpio = require('onoff').Gpio;
// const hw_button = new Gpio(4, 'in', 'both');
// const hw_led = new Gpio(17, 'out');
//#endregion

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

    // hw_button.watch((err, value) => {    // From onOff
    //     if (err) {
    //       throw err;
    //     }
    //     console.log(value)
    //     mainWindow.webContents.send("buttonStatus", !parseInt(value)) // To React
    //     iot_led.setValue(!parseInt(value) == 1 ? 255 : 0) // To Blynk
    // });
    iot_button.on('write', function(param) {  // From Blynk
        console.log('IoT Button:', parseInt(param))
        // hw_led.writeSync(parseInt(param))  // To onOff
    });     
});

