const HTTP = require('http');
const Express = require('./Express');
const { connectMongo } = require('./services/mongoService');
const { loadPlanets } = require('./models/planetsModel');

const PORT = process.env.PORT || 3001;

const server = HTTP.createServer(Express);

Promise.all([connectMongo(), loadPlanets()])
	.then(() => {
		server.listen(PORT, () => {
			console.log(`server listening on port: ${PORT}`);
		});
	});