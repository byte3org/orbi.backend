const express = require('express');
const router = express.Router();

const { 
    getAllDestinations,
    getDestinationByName,
    getTrendingDestinations,
    bookDestination,
    favouriteDestination,
    addReview,
    getReviews
} = require('../controllers/destinations');

router.get('/', getAllDestinations)
router.get('/trending', getTrendingDestinations)
router.get('/:name', getDestinationByName)
router.get('/:name/reviews', getReviews)

router.post("/:name/book", bookDestination)
router.post("/:name/favourite", favouriteDestination)
router.post("/:name/review", addReview)

module.exports = router;
