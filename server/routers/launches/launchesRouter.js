const Express = require('express');
const { fetchLaunches } = require('./launchesController');

const launchesRouter = Express.Router();

launchesRouter.get('/launches', fetchLaunches);

module.exports = launchesRouter;