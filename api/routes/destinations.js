const express = require('express');
const router = express.Router();

const { getAllDestinations, getDestinationByName, bookDestination } = require('../controllers/destinations');

router.get('/', getAllDestinations)
router.get('/:name', getDestinationByName)

router.post("/:name/book", bookDestination)

module.exports = router;
