const express = require('express');
const { fetchPlanets } = require('./planetsController');

const planetsRouter = express.Router();

planetsRouter.get('/', fetchPlanets);

module.exports = planetsRouter;