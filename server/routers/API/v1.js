const Express = require('express');
const planetsRouter = require('../planets/planetsRouter');
const launchesRouter = require('../launches/launchesRouter');

const API = Express.Router();

API.use('/planets', planetsRouter);
API.use('/launches', launchesRouter);

module.exports = API;