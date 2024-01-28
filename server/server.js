const HTTP = require('http');
const MonGoose = require('mongoose');
const Express = require('./Express');
const { loadPlanets } = require('./models/planetsModel');

const PORT = process.env.PORT || 3001;
const { MONGO_CONNECTION_STRING } = process.env;

const server = HTTP.createServer(Express);

MonGoose.connection.once('open', () => {console.log('Mongo connected')});

MonGoose.connection.on('error', error => {console.error(error)});

Promise.all([
	MonGoose.connect(MONGO_CONNECTION_STRING, {
		// useNewUrlParser: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
		// useUnifiedTopology: true
	}),
	loadPlanets()
])
	.then(() => {
		server.listen(PORT, () => {
			console.log(`listening on port: ${PORT}`);
		});
	});