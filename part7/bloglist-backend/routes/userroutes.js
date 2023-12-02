const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/usercontrollers');

router.get('/', userControllers.getUsers);
router.post('/', userControllers.createUser);
router.get('/:userId', userControllers.getUserById);
router.post('/login', userControllers.login);
module.exports = router;
