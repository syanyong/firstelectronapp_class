var BlynkLib = require('blynk-library'); 

var blynk = new BlynkLib.Blynk('TX26D5S6AHqEgY_jrl_icva1oTOcYUqu'); 
var value   = new blynk.VirtualPin(1); 
var led     = new blynk.WidgetLED(2); 
var button  = new blynk.VirtualPin(3); 

var toggle = 0
setInterval(() => {
    led.turnOn()
    toggle ? led.turnOn() : led.turnOff()
    toggle = !toggle
    value.write(new Date().getSeconds()); 
}, 1000);

// Incomming
button.on('write', function(param) { 
    console.log('Button:', parseInt(param))
}); 