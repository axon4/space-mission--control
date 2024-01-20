const Express = require('express');
const { getPlanets } = require('./planetsController');

const planetsRouter = Express.Router();

planetsRouter.get('/planets', getPlanets);

module.exports = planetsRouter;