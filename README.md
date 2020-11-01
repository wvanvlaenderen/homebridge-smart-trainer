# homebridge-smart-trainer
[![Version](http://img.shields.io/npm/v/homebridge-smart-trainer.png)](https://www.npmjs.org/package/homebridge-smart-trainer)
[![License](https://img.shields.io/npm/l/homebridge-smart-trainer.svg)](https://github.com/wvanvlaenderen/homebridge-smart-trainer/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/homebridge-smart-trainer.svg)](https://www.npmjs.org/package/homebridge-smart-trainer)
[![Build Status](https://travis-ci.org/wvanvlaenderen/homebridge-smart-trainer.svg?branch=master)](https://travis-ci.org/wvanvlaenderen/homebridge-smart-trainer)
[![Dependencies](https://david-dm.org/wvanvlaenderen/homebridge-smart-trainer.svg)](https://david-dm.org/wvanvlaenderen/homebridge-smart-trainer)

Homebridge accessory exposing a BLE controlled smart cycling trainer as a contact sensor. 

Once configured in Homebridge the plugin will scan for BLE devices exposing the BLE Cycling Measurement service. Once one of these services starts emitting power values the sensor is triggered, allowing to control lights/scenes through Homekit.

The sensor should support all smart trainers which support the Cycling Service descriptor. Both Tacx and Wahoo are verified to use this service at the moment of writing.

Supported actions include:
* start cycling

## Changes

You can read the complete history of changes in the 
[CHANGELOG](https://github.com/wvanvlaenderen/homebridge-smart-trainer/blob/master/CHANGELOG.md).

## Project Principles

This project has a few principles that have and will continue to guide its 
development.

1. **Dependency lean**. Try to keep the required dependencies to a minimum.
2. **Simple**. Using the plugin should be simple and straightforward 
following common conventions.

## Contributing

Contributions are welcome, particularly bug fixes and enhancements!
Refer to our [Contribution Guidelines](https://github.com/wvanvlaenderen/homebridge-smart-trainer/blob/master/CONTRIBUTING.md) for details.

> Please note that Project owners reserve the right to accept or reject any PR
> for any reason.

## Code of Conduct

Before contributing or participating in the homebridge-smart-trainer community please be sure to 
familiarize yourself with our project 
[CODE OF CONDUCT](https://github.com/wvanvlaenderen/homebridge-smart-trainer/blob/master/CODE_OF_CONDUCT.md). 
These guidelines are intended to govern interactions with and within the homebridge-smart-trainer 
community.

# Warranty Disclaimer

You may use this plugin with the understanding that doing so is 
**AT YOUR OWN RISK**. No warranty, express or implied, is made with regards 
to the fitness or safety of this code for any purpose. If you use this 
plugin to query or change settings of your smart trainer you understand that it 
is possible to break your smart trainer and may require the replace of devices or 
intervention of professionals of which costs cannot be returned by the project team.

# Installation

In order to use the plugin you must first download and install it globally.

    npm install -g homebridge-smart-trainer

You may also install directly from the GitHub 
[source](https://github.com/wvanvlaenderen/homebridge-smart-trainer). Either download and unzip 
the source, or clone the repository. Run the build command and pass the **-P** flag to homebridge to be able to locate the plugin.

## Connecting the trainer

Following options are available for configuring the plugin.
* name (optional)

	  
Add the plugin to the **platforms** section in your homebridge configuration file.
```json
  "accessories": [
    {
        "accessory": "SmartTrainer",
        "name": "Wahoo KICKR"
    }
  ]
```

### More Configuration Options

#### Verbose Logging

Another configuration option is de `verbose` switch. It cranks up the information that is published to the logs. This is still at an informational level and can help in detecting anomalies. To really see debugging level details, run homebridge with the `-D` switch.

## Plugin Development

When working on this plugin, you'll want Homebridge to load it from your development directory instead of publishing it to `npm` each time.

Run this command inside your plugin project folder so your global install of Homebridge can discover it:


```shell
npm link
```

*You can undo this using the `npm unlink` command.*

Then start Homebridge in debug mode:

```shell
homebridge -D
```

This will start up Homebridge and load your in-development plugin. Note that you can also direct Homebridge to load your configuration from somewhere besides the default `~/.homebridge`, for example:

```shell
homebridge -D -U ./homebridge-dev
```

This is very useful when you are already using your development machine to host a "real" Homebridge instance (with all your accessories) that you don't want to disturb.
