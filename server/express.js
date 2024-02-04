var path = require('path');
let express = require('express');
const helmet = require('helmet');
const CORS = require('cors');
const morgan = require('morgan');
const API = require('./routers/API/v1');

const server = express();

server.use(helmet());
server.use(CORS({origin: 'http://localhost:3000'}));
server.use(morgan('combined'));
server.use(express.json());
server.use(express.static(path.join(__dirname, 'dist')));

server.use('/v1', API);

server.get('/*', (_request, response) => {
	response.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = server;