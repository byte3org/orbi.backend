const express = require('express');
const router = express.Router();

const { getAllPrivateTransportation, getAllPublicTransportForDestination } = require('../controllers/transportation')

router.get('/public/:destination', getAllPublicTransportForDestination)
router.get('/private', getAllPrivateTransportation)

module.exports = router;
