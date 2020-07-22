const Gpio = require('onoff').Gpio;
const hw_led = new Gpio(17, 'out');

var toggle = 0;
setInterval(() => {
    console.log(`LED ${toggle}`)
    hw_led.writeSync(toggle)
    toggle = !toggle;
}, 1000);

