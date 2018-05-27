// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/

var tessel = require('tessel');

var climatelib = require('climate-si7020');
var climate = climatelib.	use(tessel.port['A']);

var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1

climate.on('ready', function () {
  console.log('Connected to climate module');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
      	temp=(temp-32)*5/9;
		console.log('Degrees:', temp.toFixed(4) + 'C', 'Humidity:', humid.toFixed(4) + '%RH');
		if(temp>34)
		{

			console.log('GO!');
			servo.move(servo1, 1);

		}
		if(temp<33.5)
		{
			console.log('Stop!');
			servo.move(servo1, 0.5);
		}
		
		setTimeout(loop, 300);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});