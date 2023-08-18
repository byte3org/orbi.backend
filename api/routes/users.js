const express = require('express');
const router = express.Router();

const { getUserByName } = require('../controllers/user');

router.get('/:name', getUserByName)

module.exports = router;
