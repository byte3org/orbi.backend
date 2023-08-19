const express = require('express');
const router = express.Router();

const { getUserByName, getBookings } = require('../controllers/user');

router.get('/:name', getUserByName)
router.get('/:name/bookings', getBookings)

module.exports = router;
