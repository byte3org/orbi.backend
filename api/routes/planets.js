const express = require('express');
const router = express.Router();

const { getAllPlanets, getPlanetByName } = require('../controllers/planets');

router.get('/', getAllPlanets)
router.get('/:name', getPlanetByName)

module.exports = router;
