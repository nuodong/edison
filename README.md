# Edison
Edison is a CLI tool for help developers work on Intel Edison. It comes with helpful generators to instantly create working code for common tasks such as displaying the local weather on an LCD and making the Intel Edision Arduino Breakout board's "pin 13" LED blink. 

*NOTE: Edison is currently in BETA, the blink sketch doesn't seem to be quite working yet. Will update hopefully soon.*

*To install locally while developing us npm install -g*

[![npm version](https://badge.fury.io/js/edison.svg)](http://badge.fury.io/js/edison)

## Commands:

`$ edison blink (-i, --i to set a blink interval in seconds, defaults to 1 second)`

*Automatically generates and executes code to make the Edison Arduino Breakout Board LED blink. Note: This is meant for the large form factor Arduino breakout board! Use -i or --interval to set a blink interval in seconds. Defaults to 1 second.*

`$ edison status`

*A quick check to let you know if Edison is online or offline. Use configured_edison --wifi to get your Edison online.*

`$ edison weather (-c, --city to set a city, defaults to Seattle), (-s, --state to set state, defaults to WA), (-k, --key required Weather Underground API key) `

*Automatically makes a REST API call to the Weather Underground API. You must have a registered API key and provide it using -k or --key. City and State default to Seattle, WA unless otherwise specified.*

`$ edison beacon`

*Instantly turns Intel Edison into an active iBeacon.*

## Installation:

`$ npm install -g edison`

