/**
* Edison CLI to provide time-saving Bash calls via NPM
*/
var util = require('util'),
    exec = require('child_process').exec,
    cylon = require('cylon'),
    child;

var EdisonCLI = function () {};

EdisonCLI.prototype = {
	/**
	* Automatically runs a program to make Edison's onboard LED start blinking.
	*/
	blink: function(next){
		var me = this;
		cylon
  			.robot()
  			.connection('edison', { adaptor: 'intel-iot' })
			.device('led', { driver: 'led', pin: 13, connection: 'edison' })
  			.on('ready', function(my) {
				 setInterval(function() {
				  my.led.toggle();
				  next();
    				}, 1000);
		 });
	}
};

module.exports = new EdisonCLI();
