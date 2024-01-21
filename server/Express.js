const path = require('path');
const Express = require('express');
const CORS = require('cors');
const planetsRouter = require('./routers/planets/planetsRouter');

const server = Express();

server.use(CORS({origin: 'http://localhost:3000'}));
server.use(Express.json());
server.use(Express.static(path.join(__dirname, 'dist')));

server.use(planetsRouter);

server.get('/', (_request, response) => {
	response.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = server;