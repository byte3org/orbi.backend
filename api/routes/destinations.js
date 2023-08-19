const express = require('express');
const router = express.Router();

const { 
    getAllDestinations,
    getDestinationByName,
    bookDestination,
    favouriteDestination } = require('../controllers/destinations');

router.get('/', getAllDestinations)
router.get('/:name', getDestinationByName)

router.post("/:name/book", bookDestination)
router.post("/:name/favourite", favouriteDestination)

module.exports = router;
