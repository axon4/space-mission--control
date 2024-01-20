const Express = require('express');
const CORS = require('cors');
const planetsRouter = require('./routers/planets/planetsRouter');

const server = Express();

server.use(CORS({
	origin: 'http://localhost:3000'
}));
server.use(Express.json());

server.use(planetsRouter);

module.exports = server;