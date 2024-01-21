const Express = require('express');
const { fetchPlanets } = require('./planetsController');

const planetsRouter = Express.Router();

planetsRouter.get('/planets', fetchPlanets);

module.exports = planetsRouter;