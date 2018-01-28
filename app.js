
const yargs = require('yargs');
const axios = require('axios');
const da = require('./default/default-address.js');

const argv = yargs
	.options({
		a: {
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		},
		d: {
			alias: 'default',
			describe: 'Default address',
			string: true
		},
		r: {
			alias: 'remove',
			describe: 'Removes default address',
		}		
	})
	.help()
	.alias('help', 'h')
	.argv;

console.log(argv);

var encodedAddress;

if (argv.default) {
	da.setDefault(argv.default);
} else if (argv.remove) {
	da.rmDefault();
} else if(argv.address) {
	encodedAddress = encodeURIComponent(argv.address);
	weather();
} else {
	var address = da.fetchDefault();
	if (address === null){
		return;
	}
	encodedAddress = encodeURIComponent(da.fetchDefault());
	weather();
}

function weather() {
	var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=%20AIzaSyAG7a_6xxgpGsd96isT3Zp6cvadnJbK7ro`;
	axios.get(geocodeUrl).then((response) => {
			if (response.data.status === 'ZERO_RESULTS') {
				throw new Error('Unable to find that address');
			}

			var lat = response.data.results[0].geometry.location.lat;
			var lng = response.data.results[0].geometry.location.lng;
			var weatherUrl = `https://api.darksky.net/forecast/ccff61c9cc5dc7feedf952d58cf0af9a/${lat},${lng}`;

			console.log(response.data.results[0].formatted_address);
			
			return axios.get(weatherUrl);
		}).then((response) => {
			var temperature = response.data.currently.temperature;
			console.log(`Temeprature: ${temperature}F.`);
		}).catch((e) => {
			if(e.code === 'ENOTFOUND')
				console.log('Unable to connect to api server');
			else {
				console.log(e.message);
			}
		});
}


