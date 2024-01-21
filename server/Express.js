const path = require('path');
const Express = require('express');
const CORS = require('cors');
const Morgan = require('morgan');
const planetsRouter = require('./routers/planets/planetsRouter');
const launchesRouter = require('./routers/launches/launchesRouter');

const server = Express();

server.use(CORS({origin: 'http://localhost:3000'}));
server.use(Morgan('combined'));
server.use(Express.json());
server.use(Express.static(path.join(__dirname, 'dist')));

server.use(planetsRouter);
server.use(launchesRouter);

server.get('/', (_request, response) => {
	response.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = server;