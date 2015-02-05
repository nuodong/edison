/**
* Edison CLI to provide time-saving Bash calls via NPM
*/
var util = require('util'),
    exec = require('child_process').exec,
    request = require("request"),
	moment = require("moment"),
	fs = require("fs"),
    child = require('child_process'),
    async = require('async');

var EdisonCLI = function () {};

EdisonCLI.prototype = {

	/**
	* Automatically starts blinking Edison's pin 13
	*/
	blink: function(interval, pin, next){
		var Cylon = require('cylon');

		Cylon.robot({
		  connections: {
		    edison: { adaptor: 'intel-iot' }
		  },

		  devices: {
		    led: { driver: 'led', pin: pin }
		  },

		  work: function(my) {
		  	console.log("Hit CNTRL+C to exit at any time.")
		    every((interval).second(), my.led.toggle);
		  }
		}).start();
	},

	/**
	* Automatically runs an API call to get the weather.
	*/
	weather: function(key, state, city, next){
		// Build the API string.
		var url = "http://api.wunderground.com/api/" + key + "/forecast/q/" + state + "/" + city + ".json";

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		    	var result = JSON.stringify(body,null, 4);

		    	// write the output to a file.
		    	var outputFilename = './weather.json';

				fs.writeFile(outputFilename, result, function(err) {
				    if(err)
				      next("There was an error writing the weather output to a file.");
		   			else
		    		  next(null, "Weather saved to \'weather.json\', use \'cat weather.json\' to view it.");
				}); 
		    } else {
		    	next("There was an error. Did you provide an API key? Is your Edison online? Try running edison status to check!");
		    }
		});
	},

	/**
	* Automatically runs a program to get the weather.
	*/
	status: function(next){
		// Check and see if Edison is online or not.
		require('dns').resolve('www.google.com', function(err) {
		  if (err)
		     next("You are not online, try running \'edison wifi\'");
		  else
		  	 next(null, "You are online!");
		});
	},

	/**
	* Execute an upgrade on LibMRAA.
	*/
	updateLibMRAA: function(next){
		async.parallel([
		  async.apply(exec, 'echo \"src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic\" > /etc/opkg/intel-iotdk.conf'),
		  async.apply(exec, 'opkg update'),
		  async.apply(exec, 'opkg upgrade')
		], 
		function (err, results) {
		  if(err){
		  	next("You may already have the latest libMRAA. Try running opkg update then opkg upgrade to see.");
		  } else {
		  	next(null, "Success!");
		  }
		});
	},

	/**
	* Scan for a Wi-Fi network
	*/
	scanWiFi: function(next){
		var spawn = require('child_process').spawn,
		ssh = spawn('configure_edison', ["--wifi"],{stdio: 'inherit'});
	},

	/**
	* White list an IP
	*/
	whitelist: function(ip, next){
		var spawn = require('child_process').spawn,
		list = spawn('xdk-whitelist', ["--add", ip],{stdio: 'inherit'});
	},

	/**
	* Sense Temperature
	*/
	temp: function(pin, next){
		var Cylon = require('cylon');

		Cylon
		  .robot({ name: 'Temperature'})
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('sensor', { driver: 'analogSensor', pin: pin, connection: 'edison' })
		  .on('ready', function(my) {
		    var sensorVal = 0;
		    var ready = false;

		    my.sensor.on('analogRead', function(data) {
		      sensorVal = data;
		      console.log('Temperature Sensor Value:' + sensorVal);
		    });

		    setInterval(function() {
		      if (ready) {
		        var toSend = {
		          analogSensor: sensorVal
		        };
		        if (err != null) {
		          console.log("Error sending analog sensor information: " + err);
		        }
		      }
		    }, 2000);
		  })
		  .start();
	},

	/**
	* Sense Sound
	*/
	sound: function(pin, next){
		var Cylon = require('cylon');

		Cylon
		  .robot({ name: 'Temperature'})
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('sensor', { driver: 'analogSensor', pin: pin, connection: 'edison' })
		  .on('ready', function(my) {
		    var sensorVal = 0;
		    var ready = false;

		    my.sensor.on('analogRead', function(data) {
		      sensorVal = data;
		      console.log('Sound Sensor Value:' + sensorVal);
		    });

		    setInterval(function() {
		      if (ready) {
		        var toSend = {
		          analogSensor: sensorVal
		        };
		        if (err != null) {
		          console.log("Error sending analog sensor information: " + err);
		        }
		      }
		    }, 2000);
		  })
		  .start();
	},

	/**
	* Sense light
	*/
	light: function(pin, next){
		var Cylon = require('cylon');

		Cylon
		  .robot({ name: 'LightSensor'})
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('sensor', { driver: 'analogSensor', pin: pin, connection: 'edison' })
		  .on('ready', function(my) {
		    var sensorVal = 0;
		    var ready = false;

		    my.sensor.on('analogRead', function(data) {
		      sensorVal = data;
		      console.log('Light Sensor Value:' + sensorVal);
		    });

		    setInterval(function() {
		      if (ready) {
		        var toSend = {
		          analogSensor: sensorVal
		        };
		        if (err != null) {
		          console.log("Error sending analog sensor information: " + err);
		        }
		      }
		    }, 2000);
		  })
		  .start();
	},

	/**
	* Sense button presses
	*/
	button: function(pin, next){
		var Cylon = require('cylon');

		Cylon
		  .robot()
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('touch', { driver: 'button', pin: pin, connection: 'edison' })
		  .on('ready', function(my) {
		    my.touch.on('press', function() {
		      console.log('detected press');
		    });

		    my.touch.on('release', function() {
			   console.log('touch released');
		    });
		  }).start();
	},

	/**
	* Buzzer
	*/
	buzzer: function(pin, next){
		var Cylon = require('cylon');

		Cylon.robot({
			connections: {
				edison: { adaptor:  'intel-iot'}
			},

			devices: {
				pin: { driver: 'direct-pin', pin: pin }
			},

		work: function(my) {
			var value = 0;
				every((1).second(), function() {
				  my.pin.digitalWrite(value);
				  value = (value == 0) ? 1 : 0;
				});
			}
		}).start();
	},

	/**
	* LCD screen
	*/
	lcd: function(text, next){
		var Cylon = require('cylon');

		function writeToScreen(screen, message) {
		  screen.setCursor(0,0);
		  screen.write(message);
		}

		Cylon
		  .robot({ name: 'LCD'})
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('screen', { driver: 'upm-jhd1313m1', connection: 'edison' })
		  .on('ready', function(my) {
		    writeToScreen(my.screen, text);
		  })
		  .start();
	},

	/**
	* Rotary angle sensor
	*/
	rotary: function(pin, next){
		var Cylon = require('cylon');

		Cylon
		  .robot({ name: 'Rotary'})
		  .connection('edison', { adaptor: 'intel-iot' })
		  .device('rotary', { driver: 'analogSensor', pin: 0, connection: 'edison' })
		  .on('ready', function(my) {
		     var sensorVal = 0;
		     my.rotary.on('analogRead', function(data) {
		      sensorVal = data;
		      console.log("Reading: " + sensorVal);
		    });
		  })
		  .start();
	}
};

module.exports = new EdisonCLI();
