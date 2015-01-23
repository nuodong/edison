/**
* Edison CLI to provide time-saving Bash calls via NPM
*/
var util = require('util'),
    exec = require('child_process').exec,
    child;

var EdisonCLI = function () {};

EdisonCLI.prototype = {

	/**
	* Automatically starts blinking Edison's pin 13
	*/
	blink: function(next){
		var Cylon = require('cylon');

		Cylon.robot({
		  connections: {
		    edison: { adaptor: 'intel-iot' }
		  },

		  devices: {
		    led: { driver: 'led', pin: 13 }
		  },

		  work: function(my) {
		    every((1).second(), my.led.toggle);
		  }
		}).start();
	},

	/**
	* Automatically runs a program to get the weather.
	*/
	weather: function(next){
		//
	}
};

module.exports = new EdisonCLI();
