const HTTP = require('http');
require('dotenv').config();
const express = require('./express');
const { connectMongo } = require('./services/mongoService');
const { loadPlanets } = require('./models/planetsModel');
const { loadLaunches } = require('./models/launchesModel');

const PORT = process.env.PORT || 3001;

const server = HTTP.createServer(express);

Promise.all([connectMongo(), loadPlanets(), loadLaunches()])
	.then(() => {
		server.listen(PORT, () => {
			console.log(`server listening on port: ${PORT}`);
		});
	});