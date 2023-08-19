const express = require('express');
const router = express.Router();

const { 
    getAllDestinations,
    getDestinationByName,
    getTrendingDestinations,
    bookDestination,
    favouriteDestination } = require('../controllers/destinations');

router.get('/', getAllDestinations)
router.get('/trending', getTrendingDestinations)
router.get('/:name', getDestinationByName)

router.post("/:name/book", bookDestination)
router.post("/:name/favourite", favouriteDestination)

module.exports = router;
