const Express = require('express');
const { fetchLaunches, scheduleLaunch } = require('./launchesController');

const launchesRouter = Express.Router();

launchesRouter.get('/launches', fetchLaunches);

launchesRouter.post('/launches', scheduleLaunch);

module.exports = launchesRouter;