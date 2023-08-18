const express = require('express');
const router = express.Router();

const { getAllDestinations, getDestinationByName } = require('../controllers/destinations');

router.get('/', getAllDestinations)
router.get('/:name', getDestinationByName)

module.exports = router;
