const HTTP = require('http');
const Express = require('./Express');
const { loadPlanets } = require('./models/planetsModel');

const PORT = process.env.PORT || 3001;

const server = HTTP.createServer(Express);

Promise.all([loadPlanets()])
	.then(() => {
		server.listen(PORT, () => {
			console.log(`listening on port: ${PORT}`);
		});
	});