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
		    json: true,
		    qs: params
		}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        var entries = body;
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
	}
};

module.exports = new EdisonCLI();
