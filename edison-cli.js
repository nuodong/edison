/**
* Edison CLI to provide time-saving Bash calls via NPM
*/
var util = require('util'),
    exec = require('child_process').exec,
    request = require("request"),
	moment = require("moment"),
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
		    	var outputFilename = '/weather.json';

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
	}

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
