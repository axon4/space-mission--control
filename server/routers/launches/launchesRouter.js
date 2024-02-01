const express = require('express');
const { fetchLaunches, scheduleLaunch, cancelLaunch } = require('./launchesController');

const launchesRouter = express.Router();

launchesRouter.get('/', fetchLaunches);

launchesRouter.post('/', scheduleLaunch);

launchesRouter.delete('/:ID', cancelLaunch);

module.exports = launchesRouter;