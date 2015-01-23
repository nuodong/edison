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
    .version('0.0.3')
    .usage('[options] <keywords>');

/**
* Make Edison start blinking.
*/ 
program
  .command('blink')
  .option("-p, --pin [option]", "Pin you would like to blink, defaults to 13.")
  .option("-i, --interval [option]", "Blink speed in seconds, defaults to 1.")
  .description('Generates a blink program for the Arduino breakout board using Cylon.js and executes it.')
  .action(function(options){
		//Initiate a connection to an attached Edison.
  		var interval = (options.interval)?options.interval:1;
  		var pin = (options.pin)?options.pin:13;

		edisonCLI.blink(interval,pin,function handleBlink(err, result){
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
* Turn Edison into an iBeacon
*/ 
/*
program
  .command('beacon')
  .description('Turn Intel Edison into an iBeacon using Bleno.')
  .action(function(){
		//Initiate a connection to an attached Edison.
		edisonCLI.status(function handleBeacon(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});
*/

/**
* Install + Enable Bluetooth Smart
*/ 
/*
program
  .command('ble-enable')
  .description('Configure Edison for BLE development.')
  .action(function(){
		//Initiate a connection to an attached Edison.
		edisonCLI.enableBluetoothSmart(function handleBLEEnable(err, result){
		  if ( err ) {
			  	console.log(err);
			  } else {
			  // Success?
			  console.log(result);
		  }
		  (err)?process.exit(1):process.exit(0);
		});
	});
*/
/**
* Parse the args (e.g. --a etc)
*/
program.parse(process.argv);

/**
* Show help by default.
*/
if(!program.args.length) program.help();
