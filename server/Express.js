const path = require('path');
const Express = require('express');
const CORS = require('cors');
const Morgan = require('morgan');
const API = require('./routers/API/v1');

const server = Express();

server.use(CORS({origin: 'http://localhost:3000'}));
server.use(Morgan('combined'));
server.use(Express.json());
server.use(Express.static(path.join(__dirname, 'dist')));

server.use('/v1', API);

server.get('/*', (_request, response) => {
	response.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = server;