const MonGoose = require('mongoose');

const planetsSchema = new MonGoose.Schema({
	name: {
		type: String,
		required: true
	}
});