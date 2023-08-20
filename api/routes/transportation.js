const express = require('express');
const router = express.Router();

router.get('/public/:destination', getAllPublicTransportForDestination)
router.get('/private', getAllPrivateTransportation)

module.exports = router;
