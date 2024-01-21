const Express = require('express');
const { fetchLaunches, scheduleLaunch, cancelLaunch } = require('./launchesController');

const launchesRouter = Express.Router();

launchesRouter.get('/', fetchLaunches);

launchesRouter.post('/', scheduleLaunch);

launchesRouter.delete('/:ID', cancelLaunch);

module.exports = launchesRouter;