const Express = require('express');
const { getLaunches } = require('./launchesController');

const launchesRouter = Express.Router();

launchesRouter.get('/launches', getLaunches);

module.exports = launchesRouter;