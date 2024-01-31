const MonGoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = process.env;

MonGoose.connection.once('open', () => {console.log('Mongo connected')});

MonGoose.connection.on('error', error => {console.error(error)});

async function connectMongo() {
	await MonGoose.connect(MONGO_CONNECTION_STRING, {
		// useNewUrlParser: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
		// useUnifiedTopology: true
	});
};

async function disconnectMongo() {await MonGoose.disconnect()};

module.exports = { connectMongo, disconnectMongo };