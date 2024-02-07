require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.connection.once('open', () => {console.log('Mongo connected')});

mongoose.connection.on('error', console.error);

async function connectMongo() {
	await mongoose.connect(MONGO_CONNECTION_STRING, {
		// useNewUrlParser: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
		// useUnifiedTopology: true
	});
};

async function disconnectMongo() {await mongoose.disconnect()};

module.exports = { connectMongo, disconnectMongo };