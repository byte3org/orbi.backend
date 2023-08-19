const express = require('express');
const router = express.Router();

const { getUserByName, getBookings, getFavourites } = require('../controllers/user');

router.get('/:name', getUserByName)
router.get('/:name/bookings', getBookings)
router.get('/:name/favourites', getFavourites)

module.exports = router;
