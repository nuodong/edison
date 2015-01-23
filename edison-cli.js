/**
* Edison CLI to provide time-saving Bash calls via NPM
*/
var util = require('util'),
    exec = require('child_process').exec,
    request = require("request"),
	moment = require("moment"),
    child;

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
		    every((interval).second(), my.led.toggle);
		  }
		}).start();
	},

	/**
	* Automatically runs an API call to get the weather.
	*/
	weather: function(key, state, city, next){
		//
		var url = "http://api.wunderground.com/api/" + key + "/forecast/q/" + state + "/" + city + ".json";

		request({
		    url: url,
		    json: true
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        var entries = "temp: " + body['temp_f'] + " wind mph: " + body['wind_mph'];
		        console.log(body);
		        next(null, body);
		    } else {
		    	next(error);
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
		     next("You are not online, try running configure_edison --wifi");
		  else
		  	 next(null, "You are online!");
		});
	},

	/**
	* Automatically turns Edison into an iBeacon
	*/
	/*
	beacon: function(next){
		var bleno = require('bleno');

		console.log('bleno - iBeacon');

		bleno.on('stateChange', function(state) {
		  console.log('on -> stateChange: ' + state);

		  if (state === 'poweredOn') {
		    bleno.startAdvertisingIBeacon('e2c56db5dffb48d2b060d0f5a71096e0', 0, 0, -59);
		  } else {
		    bleno.stopAdvertising();
		  }
		});

		bleno.on('advertisingStart', function() {
		  console.log('on -> advertisingStart');
		});

		bleno.on('advertisingStop', function() {
		  console.log('on -> advertisingStop');
		});
	},

	enableBluetoothSmart: function(next){
		var command = spawn('sh', ['/enable_bluetooth.sh']);
		var output  = [];

		command.on('close', function(code) {
		     next();    
		});
	}*/
};

module.exports = new EdisonCLI();
