# Edison
Edison is a CLI tool for help developers work on Intel Edison. 

*NOTE: Edison is currently in BETA*

*To install locally while developing us npm install -g*

[![npm version](https://badge.fury.io/js/edison.svg)](http://badge.fury.io/js/edison)

## Commands:

`$ edison blink (-i, --i to set a blink interval in seconds, defaults to 1 second), (-p, --pin to specify the desired pin, defaults to 13)`

*Automatically executes code to make the Edison Arduino Breakout Board LED blink. Note: This is meant for the large form factor Arduino breakout board! Use -i or --interval to set a blink interval in seconds. Defaults to 1 second. Change the pin by passing in -p or --pin, defaults to pin 13.*

`$ edison wifi`

*Scan and setup local wi-fi.*

`$ edison status`

*A quick check to let you know if Edison is online or offline. Use 'edison wifi' to get your Edison online.*

`$ edison weather (-c, --city to set a city, defaults to Seattle), (-s, --state to set state, defaults to WA), (-k, --key required Weather Underground API key) `

*Automatically makes a REST API call to the Weather Underground API. You must have a registered API key and provide it using -k or --key. City and State default to Seattle, WA unless otherwise specified.*

`$ edison mraa-version`

*Print the current installed version of libMRAA.*

`$ edison update-mraa`

*Update the installed version of libMRAA.*

## Installation:

`$ npm install -g edison`

