#!/usr/bin/env node

/**
* This is Edison, a CLI tool to help developers get up and running with Intel Edison.
*/

/**
* Define version, help info here
*/
var program = require('commander'),
	edisonCLI = require('./edison-cli.js');

/**
* Define version, help info here
*/
program
    .version('0.0.6')
    .usage('[options] <keywords>');

/**
* Make Edison start blinking.
*/ 
program
  .command('blink')
  .option("-p, --pin [option]", "Pin you would like to blink, defaults to 13.")
  .option("-i, --interval [option]", "Blink speed in seconds, defaults to 1.")
  .description('Blink the on-board LED using Cylon.js.')
  .action(function(options){
		//Initiate a connection to an attached Edison.
  		var interval = (options.interval)?options.interval:1;
  		var pin = (options.pin)?options.pin:13;

		edisonCLI.blink(interval,pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Output text to the LCD
*/ 
program
  .command('lcd')
  .option("-t, --text [option]", "Text to put on the screen, defaults to Ready!")
  .description('Output text onto the LCD screen.')
  .action(function(options){
  		var pin = (options.text)?options.text:"Ready!";

		edisonCLI.lcd(text,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get temperature data
*/ 
program
  .command('temp')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 0.")
  .description('Fetch temperature data.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:0;

		edisonCLI.temp(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get sound data
*/ 
program
  .command('sound')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 0.")
  .description('Fetch sound data.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:0;

		edisonCLI.sound(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get light data
*/ 
program
  .command('light')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 0.")
  .description('Fetch light data.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:0;

		edisonCLI.light(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Activate the buzzer
*/ 
program
  .command('buzzer')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 4.")
  .description('Trigger the buzzer.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:4;

		edisonCLI.buzzer(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Gather rotary data
*/ 
program
  .command('rotary')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 0.")
  .description('Gather rotary data.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:0;

		edisonCLI.buzzer(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Check the button
*/ 
program
  .command('button')
  .option("-p, --pin [option]", "Pin you would like to use, defaults to 4.")
  .description('Gather rotary data.')
  .action(function(options){
  		var pin = (options.pin)?options.pin:4;

		edisonCLI.button(pin,function handleResult(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});


/**
* Get a local weather report, takes in a city and an API key from weather underground
*/ 
program
  .command('weather')
  .option("-c, --city [option]", "Weather city, default to Seattle.")
  .option("-s, --state [option]", "Weather state, default to WA.")
  .option("-k, --key [option]", "Weather Underground API Key, required.")
  .description('Logs a weather report using the Weather Channel API.')
  .action(function(options){
		//Initiate a connection to an attached Edison.
  		var city = (options.city)?options.city:"seattle";
  		var state = (options.state)?options.state:"wa";
  		var key = (options.key)?options.key:"";

		edisonCLI.weather(key,state,city,function handleWeather(err, result){
		  if ( err ) {
			  console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get a local weather report, takes in a city and an API key from weather underground
*/ 
program
  .command('status')
  .description('Gets a general overview of Edison\'s current status.')
  .action(function(){
		//Initiate a connection to an attached Edison.
		edisonCLI.status(function handleStatus(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get the current installed version of libMRAA
*/ 
program
  .command('mraa-version')
  .description('Output the current version of libMRAA installed on this Intel Edison')
  .action(function(){
		console.log(require("mraa").getVersion());
	});

/**
* Update the current installed version of libMRAA
*/ 
program
  .command('update-mraa')
  .description('Update the version of libMRAA installed on this Intel Edison')
  .action(function(){
		edisonCLI.updateLibMRAA(function handleUpgrade(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  	console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Get Edison online via wi-fi
*/ 
program
  .command('wifi')
  .description('Scan for a wi-fi network to join.')
  .action(function(){
		edisonCLI.scanWiFi(function handleWiFi(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  	console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});

/**
* Whitelist an ip
*/ 
program
  .command('whitelist')
  .option("-i, --ip [option]", "Set the ip address you want to whitelist.")
  .description('Whitelist an ip with the XDK Daemon.')
  .action(function(options){

		if(options.ip){
			edisonCLI.whitelist(options.ip,function handleWhitelist(err, result){
			  if ( err ) {
				  	console.log(err);
				  } else {
				  	console.log(result);
			  }
			  (err)?process.exit(1):process.exit(0);
			});
		} else {
			console.log ("you must provide an ip using: -i 10.0.1.7 (example ip)");
			process.exit(0);
		}
	});

/**
* Parse the args (e.g. --a etc)
*/
program.parse(process.argv);

/**
* Show help by default.
*/
if(!program.args.length) program.help();
