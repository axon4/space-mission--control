const Express = require('express');
const { fetchLaunches, scheduleLaunch } = require('./launchesController');

const launchesRouter = Express.Router();

launchesRouter.get('/', fetchLaunches);

launchesRouter.post('/', scheduleLaunch);

module.exports = launchesRouter;