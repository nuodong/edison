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
    .version('0.0.1')
    .usage('[options] <keywords>');

/**
* Make Edison start blinking.
*/ 
program
  .command('blink')
  .description('Generates a blink program for the Arduino breakout board using Cylon.js and executes it.')
  .action(function(){
		//Initiate a connection to an attached Edison.
		edisonCLI.blink(function handleBlink(err, result){
		  if ( err ) {
			  	process.exit(1);
			  } else {
			  // Fail!
		  }
		});
	});
/**
* Parse the args (e.g. --a etc)
*/
program.parse(process.argv);

/**
* Show help by default.
*/
if(!program.args.length) program.help();
