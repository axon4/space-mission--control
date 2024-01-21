const Express = require('express');
const { fetchPlanets } = require('./planetsController');

const planetsRouter = Express.Router();

planetsRouter.get('/', fetchPlanets);

module.exports = planetsRouter;