const express = require('express');
const testController = require('../controllers/testcontroller');

const router = express.Router();

router.post('/reset', testController.resetDb);

module.exports = router;
