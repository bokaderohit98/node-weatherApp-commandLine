
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}		
	})
	.help()
	.alias('help', 'h')
	.argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocode) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(geocode.address);
		weather.getWeather(geocode, (errorMessage, result) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${result.temperature} F.`);
			}
		});
	}
});


