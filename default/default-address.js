const fs = require('fs');
const file = './default/default.json';

var setDefault = (address) => {
	data = {
		address
	};

	fs.writeFileSync(file, JSON.stringify(data));
	console.log('Default Address Saved');
};

var rmDefault = () => {
	fs.unlink(file, (err) => {
		if (err) {
			console.log('No default address exists to remove');
		} else {
			console.log('Default address removed Successfully');
		}
	});
};

var fetchDefault = () => {
	var data;
	if (fs.existsSync(file)) {
		data = fs.readFileSync(file);
		return JSON.parse(data).address;
	} else {
		console.log('No default address exist');
		return null;
	}
};


module.exports = {
	setDefault,
	rmDefault,
	fetchDefault,
};